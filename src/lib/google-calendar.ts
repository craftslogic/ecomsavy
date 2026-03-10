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

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error(
        '❌ GOOGLE_CALENDAR_ID is not set. Please configure the calendar ID in environment variables.'
      );
    }

    const event = {
      summary: params.summary,
      description: params.description,
      start: {
        dateTime: params.startDateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: params.endDateTime,
        timeZone: 'UTC',
      },
      attendees: [
        {
          email: params.attendeeEmail,
          displayName: params.attendeeName,
          responseStatus: 'needsAction',
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: false,
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Send email notifications to attendees
    });

    if (!response.data.id || !response.data.hangoutLink) {
      throw new Error('Failed to create event or generate Meet link');
    }

    console.log('✅ Calendar event created:', response.data.id);

    return {
      event_id: response.data.id,
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
