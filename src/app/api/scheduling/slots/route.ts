import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { addDays, startOfDay } from 'date-fns';

/**
 * GET /api/scheduling/slots
 * Fetch all available (active, future) time slots - including booked ones
 * Supports date filtering via ?date=YYYY-MM-DD query parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    // Start building the query - remove is_booked filter to show all slots
    let query = supabase
      .from('available_slots')
      .select('*')
      .eq('is_active', true)
      .order('slot_date', { ascending: true })
      .order('start_time', { ascending: true });

    // If a specific date is provided, filter by that date
    if (dateParam) {
      query = query.eq('slot_date', dateParam);
    } else {
      // Otherwise, get all future slots (starting from day after tomorrow)
      const dayAfterTomorrow = addDays(startOfDay(new Date()), 2);
      const minDate = dayAfterTomorrow.toISOString().split('T')[0];
      query = query.gte('slot_date', minDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error fetching slots:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch available slots' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error('Error in GET /api/scheduling/slots:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
