import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  businessTimeline: string;
  investmentReady: boolean;
  categoryInterest: string;
  meetingDate: string;
  meetingTime: string;
  meetLink: string;
  timestamp: string;
}

/**
 * Append booking data to Google Sheets
 */
export async function logBookingToSheet(data: BookingData): Promise<boolean> {
  try {
    const auth = await getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error('❌ GOOGLE_SHEET_ID is not configured');
      throw new Error('Google Sheet ID is not configured');
    }

    // Prepare the row data
    const values = [
      [
        data.timestamp,
        data.name,
        data.email,
        data.phone,
        data.businessTimeline,
        data.investmentReady ? 'Yes' : 'No',
        data.categoryInterest,
        data.meetingDate,
        data.meetingTime,
        data.meetLink,
      ],
    ];

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:J', // Adjust sheet name and range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('✅ Booking logged to Google Sheets:', response.data.updates?.updatedRows);
    return true;
  } catch (error: any) {
    console.error('Error logging to Google Sheets:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
    });
    
    // Don't throw error - we don't want sheet logging to break the booking process
    // Just log the error and return false
    return false;
  }
}

/**
 * Initialize the Google Sheet with headers (run once)
 */
export async function initializeSheet(): Promise<boolean> {
  try {
    const auth = await getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      throw new Error('Google Sheet ID is not configured');
    }

    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Business Timeline',
      'Investment Ready',
      'Category Interest',
      'Meeting Date',
      'Meeting Time',
      'Google Meet Link',
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:J1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });

    console.log('✅ Google Sheet initialized with headers');
    return true;
  } catch (error) {
    console.error('Error initializing Google Sheet:', error);
    throw new Error(
      `Failed to initialize sheet: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
