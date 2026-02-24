import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createGoogleMeetEvent } from '@/lib/google-calendar';
import { sendClientConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';
import { z } from 'zod';
import { format, parseISO } from 'date-fns';

const bookingInputSchema = z.object({
  lead_id: z.string().uuid(),
  slot_id: z.string().uuid(),
});

/**
 * POST /api/scheduling/book
 * Book a meeting slot - creates calendar event, sends emails, and marks slot as booked
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = bookingInputSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { lead_id, slot_id } = validationResult.data;

    // Fetch lead details
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadError || !leadData) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    // Fetch qualification data
    const { data: qualificationData, error: qualificationError } = await supabaseAdmin
      .from('qualification_responses')
      .select('*')
      .eq('lead_id', lead_id)
      .single();

    if (qualificationError || !qualificationData) {
      return NextResponse.json(
        { success: false, error: 'Qualification data not found' },
        { status: 404 }
      );
    }

    // Fetch slot details and lock it
    const { data: slotData, error: slotError } = await supabaseAdmin
      .from('available_slots')
      .select('*')
      .eq('id', slot_id)
      .single();

    if (slotError || !slotData) {
      return NextResponse.json({ success: false, error: 'Slot not found' }, { status: 404 });
    }

    // Check if slot is still available
    if (slotData.is_booked) {
      return NextResponse.json(
        { success: false, error: 'This slot has already been booked. Please select another time.' },
        { status: 409 }
      );
    }

    if (!slotData.is_active) {
      return NextResponse.json(
        { success: false, error: 'This slot is no longer available.' },
        { status: 409 }
      );
    }

    // Create ISO datetime strings for Google Calendar
    const startDateTime = `${slotData.slot_date}T${slotData.start_time}`;
    const endDateTime = `${slotData.slot_date}T${slotData.end_time}`;

    // Create Google Calendar event with Meet link
    let googleEvent;
    try {
      googleEvent = await createGoogleMeetEvent({
        summary: `Ecomsavy Consultation - ${leadData.full_name}`,
        description: `Consultation meeting with ${leadData.full_name}\n\nEmail: ${leadData.email}\nPhone: ${leadData.phone}\n\nQualification:\n- Business Timeline: ${qualificationData.business_timeline}\n- Investment Ready: ${qualificationData.investment_ready ? 'Yes' : 'No'}\n- Category Interest: ${qualificationData.category_interest}`,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        attendeeEmail: leadData.email,
        attendeeName: leadData.full_name,
      });
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create calendar event. Please try again.',
        },
        { status: 500 }
      );
    }

    // Use the atomic booking function to prevent race conditions
    const { data: bookingResult, error: bookingError } = await supabaseAdmin.rpc(
      'book_meeting_slot',
      {
        p_lead_id: lead_id,
        p_slot_id: slot_id,
        p_google_event_id: googleEvent.event_id,
        p_google_meet_link: googleEvent.meet_link,
      }
    );

    if (bookingError || !bookingResult) {
      console.error('Error booking slot:', bookingError);
      // If booking failed, try to delete the calendar event
      try {
        const { cancelGoogleMeetEvent } = await import('@/lib/google-calendar');
        await cancelGoogleMeetEvent(googleEvent.event_id);
      } catch (cancelError) {
        console.error('Error canceling calendar event:', cancelError);
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to book meeting. The slot may have been taken. Please try another time.',
        },
        { status: 500 }
      );
    }

    // Check if booking was successful
    if (!bookingResult.success) {
      // If booking failed, try to delete the calendar event
      try {
        const { cancelGoogleMeetEvent } = await import('@/lib/google-calendar');
        await cancelGoogleMeetEvent(googleEvent.event_id);
      } catch (cancelError) {
        console.error('Error canceling calendar event:', cancelError);
      }

      return NextResponse.json(
        {
          success: false,
          error: bookingResult.error || 'Failed to book meeting',
        },
        { status: 409 }
      );
    }

    // Format dates for emails
    const meetingDate = format(parseISO(slotData.slot_date), 'EEEE, MMMM d, yyyy');
    const [startHour, startMinute] = slotData.start_time.split(':');
    const [endHour, endMinute] = slotData.end_time.split(':');
    const formatTime = (hour: string, minute: string) => {
      const h = parseInt(hour);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayHour = h % 12 || 12;
      return `${displayHour}:${minute} ${ampm}`;
    };
    const meetingTime = `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;

    // Send confirmation email to client
    try {
      await sendClientConfirmationEmail({
        to: leadData.email,
        clientName: leadData.full_name,
        meetingDate: meetingDate,
        meetingTime: meetingTime,
        meetLink: googleEvent.meet_link,
      });
    } catch (emailError) {
      console.error('Error sending client confirmation email:', emailError);
      // Don't fail the booking if email fails, just log it
    }

    // Send notification email to admin
    try {
      await sendAdminNotificationEmail({
        clientName: leadData.full_name,
        clientEmail: leadData.email,
        clientPhone: leadData.phone,
        meetingDate: meetingDate,
        meetingTime: meetingTime,
        meetLink: googleEvent.meet_link,
        qualificationAnswers: {
          businessTimeline: qualificationData.business_timeline,
          investmentReady: qualificationData.investment_ready,
          categoryInterest: qualificationData.category_interest,
        },
      });
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
      // Don't fail the booking if email fails, just log it
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        booking_id: bookingResult.booking_id,
        meeting_date: slotData.slot_date,
        meeting_start_time: slotData.start_time,
        meeting_end_time: slotData.end_time,
        google_meet_link: googleEvent.meet_link,
        google_calendar_html_link: googleEvent.html_link,
        status: 'confirmed',
      },
      message: 'Meeting booked successfully',
    });
  } catch (error) {
    console.error('Error in POST /api/scheduling/book:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
