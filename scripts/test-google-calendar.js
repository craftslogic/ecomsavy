// Test Google Service Account API configuration
// Run with: node scripts/test-google-calendar.js

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function testGoogleServiceAccount() {
  console.log('🧪 Testing Google Service Account Configuration...\n');

  // Check environment variables
  console.log('📋 Checking Environment Variables:');
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  console.log('  GOOGLE_SERVICE_ACCOUNT_KEY:', serviceAccountKey ? '✓ Set' : '✗ Missing');
  console.log('  GOOGLE_CALENDAR_ID:', calendarId ? `✓ Set (${calendarId})` : '✗ Missing');
  console.log('  GOOGLE_SHEET_ID:', sheetId ? `✓ Set (${sheetId})` : '✗ Missing');
  console.log('');

  if (!serviceAccountKey) {
    console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY is missing!\n');
    console.log('Please set it in .env.local:');
    console.log('  GOOGLE_SERVICE_ACCOUNT_KEY=\'{"type":"service_account",...}\'');
    console.log('\nSee the setup guide for instructions on creating a service account.\n');
    return;
  }

  if (!calendarId) {
    console.error('❌ GOOGLE_CALENDAR_ID is missing!\n');
    console.log('Please set it in .env.local:');
    console.log('  GOOGLE_CALENDAR_ID=your-email@gmail.com\n');
    return;
  }

  try {
    // Parse service account credentials
    console.log('🔑 Parsing service account credentials...');
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
      console.log('  ✓ Service account key parsed successfully');
      console.log(`  ✓ Service account email: ${credentials.client_email}\n`);
    } catch (error) {
      console.error('  ❌ Failed to parse service account key:', error.message);
      console.log('\n💡 Make sure GOOGLE_SERVICE_ACCOUNT_KEY contains valid JSON.\n');
      return;
    }

    // Create JWT auth client
    console.log('🔐 Creating Service Account auth client...');
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // Authorize the client
    try {
      await auth.authorize();
      console.log('  ✓ Service account authorized successfully\n');
    } catch (error) {
      console.error('  ❌ Failed to authorize service account:', error.message);
      console.log('\n💡 Check that your service account key is valid.\n');
      return;
    }

    // Test 1: Access the calendar
    console.log('📅 Testing Calendar API access...');
    const calendar = google.calendar({ version: 'v3', auth });
    
    try {
      const response = await calendar.events.list({
        calendarId: calendarId,
        maxResults: 5,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: new Date().toISOString(),
      });

      console.log('  ✓ Successfully accessed calendar');
      console.log(`  ✓ Found ${response.data.items?.length || 0} upcoming events\n`);
    } catch (error) {
      if (error.code === 404) {
        console.error(`  ❌ Calendar not found: ${calendarId}`);
        console.log('\n💡 Make sure GOOGLE_CALENDAR_ID is correct.\n');
        return;
      } else if (error.code === 403) {
        console.error('  ❌ Permission denied');
        console.log('\n💡 The service account does not have access to this calendar.');
        console.log('You need to share the calendar with the service account:');
        console.log(`  1. Open Google Calendar: https://calendar.google.com`);
        console.log(`  2. Find your calendar in the left sidebar`);
        console.log(`  3. Click the three dots > Settings and sharing`);
        console.log(`  4. Scroll to "Share with specific people"`);
        console.log(`  5. Click "Add people"`);
        console.log(`  6. Add: ${credentials.client_email}`);
        console.log(`  7. Give "Make changes to events" permission\n`);
        return;
      } else {
        console.error('  ❌ Failed to access calendar:', error.message);
        console.log('\n💡 Make sure Google Calendar API is enabled:');
        console.log('  1. Go to: https://console.cloud.google.com');
        console.log('  2. Select your project');
        console.log('  3. Go to: APIs & Services > Library');
        console.log('  4. Search for "Google Calendar API"');
        console.log('  5. Click "Enable"\n');
        return;
      }
    }

    // Test 2: Try to create a test event with Google Meet
    console.log('🧪 Testing event creation with Google Meet...');
    const testEvent = {
      summary: 'TEST - Service Account API Test (DELETE ME)',
      description: 'This is a test event created by the scheduling system. You can delete it.',
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
        timeZone: 'UTC',
      },
      conferenceData: {
        createRequest: {
          requestId: `test-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: calendarId,
        requestBody: testEvent,
        conferenceDataVersion: 1,
      });

      console.log('  ✓ Successfully created test event');
      console.log(`  ✓ Event ID: ${response.data.id}`);
      console.log(`  ✓ Google Meet link: ${response.data.hangoutLink || 'Not generated'}\n`);

      if (!response.data.hangoutLink) {
        console.log('⚠️  Warning: Google Meet link was not generated');
        console.log('This might happen if:');
        console.log('  - Your Google Workspace doesn\'t support Meet');
        console.log('  - Meet is not enabled for your account');
        console.log('  - The calendar owner needs to enable Meet integration\n');
      }

      // Clean up - delete the test event
      console.log('🧹 Cleaning up test event...');
      await calendar.events.delete({
        calendarId: calendarId,
        eventId: response.data.id,
      });
      console.log('  ✓ Test event deleted\n');

    } catch (error) {
      console.error('  ❌ Failed to create test event:', error.message);
      console.error('\nError details:', {
        code: error.code,
        status: error.status,
        message: error.message,
      });
      return;
    }

    // Test 3: Test Google Sheets access (if GOOGLE_SHEET_ID is set)
    if (sheetId) {
      console.log('📊 Testing Google Sheets API access...');
      const sheets = google.sheets({ version: 'v4', auth });

      try {
        // Try to read the sheet
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: 'Sheet1!A1:J1',
        });

        console.log('  ✓ Successfully accessed Google Sheet');
        console.log(`  ✓ Sheet has ${response.data.values?.[0]?.length || 0} columns\n`);

        // Try to append a test row
        console.log('🧪 Testing sheet write access...');
        const testRow = [
          [
            new Date().toISOString(),
            'TEST',
            'test@example.com',
            '000-000-0000',
            'Test Timeline',
            'Yes',
            'Test Category',
            'Test Date',
            'Test Time',
            'https://meet.google.com/test',
          ],
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A:J',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: testRow,
          },
        });

        console.log('  ✓ Successfully wrote test data to sheet\n');
        console.log('⚠️  Note: A test row was added to your sheet. You can delete it manually.\n');

      } catch (error) {
        if (error.code === 404) {
          console.error(`  ❌ Sheet not found: ${sheetId}`);
          console.log('\n💡 Make sure GOOGLE_SHEET_ID is correct.\n');
        } else if (error.code === 403) {
          console.error('  ❌ Permission denied');
          console.log('\n💡 The service account does not have access to this sheet.');
          console.log('You need to share the sheet with the service account:');
          console.log(`  1. Open the Google Sheet`);
          console.log(`  2. Click the "Share" button`);
          console.log(`  3. Add: ${credentials.client_email}`);
          console.log(`  4. Give "Editor" permission\n`);
        } else {
          console.error('  ❌ Failed to access sheet:', error.message);
          console.log('\n💡 Make sure Google Sheets API is enabled:');
          console.log('  1. Go to: https://console.cloud.google.com');
          console.log('  2. Select your project');
          console.log('  3. Go to: APIs & Services > Library');
          console.log('  4. Search for "Google Sheets API"');
          console.log('  5. Click "Enable"\n');
        }
        return;
      }
    } else {
      console.log('⚠️  GOOGLE_SHEET_ID not set - skipping Sheets test');
      console.log('   Set GOOGLE_SHEET_ID in .env.local to test Sheets integration\n');
    }

    console.log('✅ All tests passed! Google Service Account is working correctly.\n');
    console.log('Your system is ready to:');
    console.log('  ✓ Create calendar events with Google Meet links');
    if (sheetId) {
      console.log('  ✓ Log booking data to Google Sheets');
    }
    console.log('\nYou can now:');
    console.log('  1. Restart your dev server: npm run dev');
    console.log('  2. Test the booking flow: http://localhost:3000/schedule-a-meet\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testGoogleServiceAccount();
