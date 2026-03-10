import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';

/**
 * Google Calendar integration using Service Account authentication
 * No OAuth required - uses service account JSON credentials
 */

interface CreateMeetingParams {
  summary: string;
  description: string;
  startDateTime: string; // ISO 8601 format
  endDateTime: string; // ISO 8601 format
  attendeeEmail: string;
  attendeeName: string;
}

interface MeetingResponse {
  event_id: string;
  meet_link: string;
  html_link: string;
}

/**
 * Create a Google Calendar event with Google Meet
 */
export async function createGoogleMeetEvent(
  params: CreateMeetingParams
): Promise<MeetingResponse> {
  try {
    const auth = await getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    
    console.log('📅 Using calendar:', calendarId === 'primary' ? 'Service Account Primary Calendar' : calendarId);

    // Build event object
    const event: any = {
      summary: params.summary,
      description: `${params.description}\n\n---\nAttendee: ${params.attendeeName} (${params.attendeeEmail})`,
      start: {
        dateTime: params.startDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: params.endDateTime,
        timeZone: 'UTC',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: false,
    };

    // Try to add Google Meet conference data
    // Note: This works on service account's own calendar or Google Workspace calendars
    // For personal Gmail calendars, this may fail - we'll handle it gracefully
    event.conferenceData = {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    };

    let response;
    try {
      // First attempt: Try to create with Google Meet
      response = await calendar.events.insert({
        calendarId,
        requestBody: event,
        conferenceDataVersion: 1,
        sendUpdates: 'none',
      });

      if (response.data.id && response.data.hangoutLink) {
        console.log('✅ Calendar event created with Google Meet:', response.data.id);
        return {
          event_id: response.data.id,
          meet_link: response.data.hangoutLink,
          html_link: response.data.htmlLink || '',
        };
      }
    } catch (meetError: any) {
      // If Google Meet creation fails, try without it
      console.warn('⚠️  Google Meet creation failed, attempting without conference data...');
      console.warn('   Error:', meetError?.message);
      
      // Remove conference data and try again
      delete event.conferenceData;
      
      response = await calendar.events.insert({
        calendarId,
        requestBody: event,
        sendUpdates: 'none',
      });
    }

    // If we reach here without a Meet link, use a fallback
    if (!response.data.hangoutLink) {
      console.warn('⚠️  Event created without Google Meet link');
      console.warn('   To enable automatic Google Meet creation:');
      console.warn('   1. Set GOOGLE_CALENDAR_ID=primary in .env (use service account\'s calendar)');
      console.warn('   2. OR upgrade to Google Workspace with domain-wide delegation');
      console.warn('   3. OR set GOOGLE_MEET_LINK in .env to use a permanent meeting room');
      
      // Use a permanent Meet link if configured, otherwise throw error
      const fallbackMeetLink = process.env.GOOGLE_MEET_LINK;
      
      if (!fallbackMeetLink) {
        throw new Error(
          'Google Meet link could not be generated automatically. ' +
          'Service accounts cannot create Meet links on personal Gmail calendars. ' +
          'Solutions:\n' +
          '  1. Set GOOGLE_CALENDAR_ID=primary to use service account\'s own calendar\n' +
          '  2. Set GOOGLE_MEET_LINK=your-permanent-meet-link in .env\n' +
          '  3. Upgrade to Google Workspace and configure domain-wide delegation'
        );
      }
      
      console.log('   Using configured fallback Meet link');
      
      return {
        event_id: response.data.id!,
        meet_link: fallbackMeetLink,
        html_link: response.data.htmlLink || '',
      };
    }

    console.log('✅ Calendar event created:', response.data.id);

    return {
      event_id: response.data.id!,
      meet_link: response.data.hangoutLink,
      html_link: response.data.htmlLink || '',
    };
  } catch (error: any) {
    console.error('❌ Error creating Google Calendar event:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      errors: error?.errors,
    });
    
    let errorMessage = 'Unknown error';
    
    if (error?.code === 401) {
      errorMessage = 'Google authentication failed. Check your service account credentials.';
    } else if (error?.code === 403) {
      errorMessage = 'Permission denied. Make sure:\n' +
        '  1. Google Calendar API is enabled in Google Cloud Console\n' +
        '  2. The calendar is shared with the service account email';
    } else if (error?.code === 404) {
      errorMessage = 'Calendar not found. Verify GOOGLE_CALENDAR_ID is correct and shared with the service account.';
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    throw new Error(`Failed to create calendar event: ${errorMessage}`);
  }
}

/**
 * Cancel a Google Calendar event
 */
export async function cancelGoogleMeetEvent(eventId: string): Promise<boolean> {
  try {
    const auth = await getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('GOOGLE_CALENDAR_ID is not set');
    }

    await calendar.events.delete({
      calendarId,
      eventId: eventId,
      sendUpdates: 'all', // Notify attendees
    });

    console.log('✅ Calendar event canceled:', eventId);
    return true;
  } catch (error) {
    console.error('❌ Error canceling Google Calendar event:', error);
    throw new Error(
      `Failed to cancel event: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Update a Google Calendar event
 */
export async function updateGoogleMeetEvent(
  eventId: string,
  updates: Partial<CreateMeetingParams>
): Promise<MeetingResponse> {
  try {
    const auth = await getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('GOOGLE_CALENDAR_ID is not set');
    }

    const event: any = {};

    if (updates.summary) event.summary = updates.summary;
    if (updates.description) event.description = updates.description;
    if (updates.startDateTime) {
      event.start = {
        dateTime: updates.startDateTime,
        timeZone: 'UTC',
      };
    }
    if (updates.endDateTime) {
      event.end = {
        dateTime: updates.endDateTime,
        timeZone: 'UTC',
      };
    }

    const response = await calendar.events.patch({
      calendarId,
      eventId: eventId,
      requestBody: event,
      sendUpdates: 'all',
    });

    if (!response.data.id || !response.data.hangoutLink) {
      throw new Error('Failed to update event');
    }

    console.log('✅ Calendar event updated:', response.data.id);

    return {
      event_id: response.data.id,
      meet_link: response.data.hangoutLink,
      html_link: response.data.htmlLink || '',
    };
  } catch (error) {
    console.error('❌ Error updating Google Calendar event:', error);
    throw new Error(
      `Failed to update event: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get event details from Google Calendar
 */
export async function getGoogleMeetEvent(eventId: string) {
  try {
    const auth = await getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('GOOGLE_CALENDAR_ID is not set');
    }

    const response = await calendar.events.get({
      calendarId,
      eventId: eventId,
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error getting Google Calendar event:', error);
    throw new Error(
      `Failed to get event: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
