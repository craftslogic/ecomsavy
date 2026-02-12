import { google } from 'googleapis';

// Validate environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('❌ GOOGLE_CLIENT_ID is not set in environment variables');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_SECRET is not set in environment variables');
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  console.error('❌ GOOGLE_REFRESH_TOKEN is not set in environment variables');
}

// Google Calendar configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_APP_URL + '/api/auth/google/callback'
);

// Set credentials with refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

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
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Send email notifications to attendees
    });

    if (!response.data.id || !response.data.hangoutLink) {
      throw new Error('Failed to create event or generate Meet link');
    }

    return {
      event_id: response.data.id,
      meet_link: response.data.hangoutLink,
      html_link: response.data.htmlLink || '',
    };
  } catch (error: any) {
    console.error('Error creating Google Calendar event:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      errors: error?.errors,
    });
    
    let errorMessage = 'Unknown error';
    
    if (error?.message === 'unauthorized_client') {
      errorMessage = 'Google OAuth credentials are invalid. Please regenerate your refresh token with correct scopes.';
    } else if (error?.code === 401) {
      errorMessage = 'Google authentication failed. Your refresh token may be expired or invalid.';
    } else if (error?.code === 403) {
      errorMessage = 'Permission denied. Make sure Google Calendar API is enabled in Google Cloud Console.';
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
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      sendUpdates: 'all', // Notify attendees
    });

    return true;
  } catch (error) {
    console.error('Error canceling Google Calendar event:', error);
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
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      requestBody: event,
      sendUpdates: 'all',
    });

    if (!response.data.id || !response.data.hangoutLink) {
      throw new Error('Failed to update event');
    }

    return {
      event_id: response.data.id,
      meet_link: response.data.hangoutLink,
      html_link: response.data.htmlLink || '',
    };
  } catch (error) {
    console.error('Error updating Google Calendar event:', error);
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
    const response = await calendar.events.get({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
    });

    return response.data;
  } catch (error) {
    console.error('Error getting Google Calendar event:', error);
    throw new Error(
      `Failed to get event: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
