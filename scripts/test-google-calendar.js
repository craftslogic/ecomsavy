// Test Google Calendar API configuration
// Run with: node scripts/test-google-calendar.js

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function testGoogleCalendar() {
  console.log('🧪 Testing Google Calendar API Configuration...\n');

  // Check environment variables
  console.log('📋 Checking Environment Variables:');
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  console.log('  GOOGLE_CLIENT_ID:', clientId ? `✓ Set (${clientId.substring(0, 20)}...)` : '✗ Missing');
  console.log('  GOOGLE_CLIENT_SECRET:', clientSecret ? `✓ Set (${clientSecret.substring(0, 15)}...)` : '✗ Missing');
  console.log('  GOOGLE_REFRESH_TOKEN:', refreshToken ? `✓ Set (${refreshToken.substring(0, 20)}...)` : '✗ Missing');
  console.log('  GOOGLE_CALENDAR_ID:', calendarId || '✗ Missing (will use "primary")');
  console.log('');

  if (!clientId || !clientSecret || !refreshToken) {
    console.error('❌ Missing required environment variables!\n');
    console.log('Please set the following in .env.local:');
    console.log('  GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com');
    console.log('  GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx');
    console.log('  GOOGLE_REFRESH_TOKEN=1//xxxxx');
    console.log('  GOOGLE_CALENDAR_ID=your-email@gmail.com\n');
    return;
  }

  try {
    // Create OAuth2 client
    console.log('🔑 Creating OAuth2 client...');
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'http://localhost:3000/api/auth/google/callback'
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    console.log('  ✓ OAuth2 client created\n');

    // Test 1: Get access token
    console.log('🔐 Testing token refresh...');
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      console.log('  ✓ Successfully refreshed access token');
      console.log(`  ✓ Token expires in: ${Math.floor((credentials.expiry_date - Date.now()) / 1000 / 60)} minutes\n`);
    } catch (error) {
      console.error('  ❌ Failed to refresh token:', error.message);
      console.log('\n💡 Your refresh token is invalid or expired.');
      console.log('You need to generate a new refresh token:\n');
      console.log('1. Go to: https://developers.google.com/oauthplayground/');
      console.log('2. Click ⚙️ (settings) and enable "Use your own OAuth credentials"');
      console.log('3. Enter your Client ID and Client Secret');
      console.log('4. In Step 1, select these scopes:');
      console.log('   - https://www.googleapis.com/auth/calendar');
      console.log('   - https://www.googleapis.com/auth/calendar.events');
      console.log('5. Click "Authorize APIs" and sign in');
      console.log('6. In Step 2, click "Exchange authorization code for tokens"');
      console.log('7. Copy the "Refresh token" and update your .env.local\n');
      return;
    }

    // Test 2: List calendars
    console.log('📅 Testing calendar access...');
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    try {
      const { data } = await calendar.calendarList.list();
      console.log('  ✓ Successfully accessed calendar list');
      console.log(`  ✓ Found ${data.items.length} calendars\n`);
      
      console.log('📋 Available Calendars:');
      data.items.slice(0, 5).forEach((cal, i) => {
        const isPrimary = cal.primary ? ' (PRIMARY)' : '';
        console.log(`  ${i + 1}. ${cal.summary}${isPrimary}`);
        console.log(`     ID: ${cal.id}`);
      });
      console.log('');
    } catch (error) {
      console.error('  ❌ Failed to list calendars:', error.message);
      console.log('\n💡 Make sure Google Calendar API is enabled:');
      console.log('1. Go to: https://console.cloud.google.com');
      console.log('2. Select your project');
      console.log('3. Go to: APIs & Services > Library');
      console.log('4. Search for "Google Calendar API"');
      console.log('5. Click "Enable"\n');
      return;
    }

    // Test 3: Try to list events
    console.log('📆 Testing event access...');
    try {
      const response = await calendar.events.list({
        calendarId: calendarId || 'primary',
        maxResults: 5,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: new Date().toISOString(),
      });

      console.log('  ✓ Successfully accessed events');
      console.log(`  ✓ Found ${response.data.items?.length || 0} upcoming events\n`);
    } catch (error) {
      if (error.code === 404) {
        console.error(`  ❌ Calendar not found: ${calendarId}`);
        console.log('\n💡 Update GOOGLE_CALENDAR_ID in .env.local to one of the IDs listed above\n');
      } else {
        console.error('  ❌ Failed to list events:', error.message);
      }
      return;
    }

    // Test 4: Try to create a test event (with Meet link)
    console.log('🧪 Testing event creation with Google Meet...');
    const testEvent = {
      summary: 'TEST - Ecomsavy API Test (DELETE ME)',
      description: 'This is a test event created by the scheduling system test script. You can delete it.',
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
        calendarId: calendarId || 'primary',
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
        console.log('  - Meet is not enabled for your account\n');
      }

      // Clean up - delete the test event
      console.log('🧹 Cleaning up test event...');
      await calendar.events.delete({
        calendarId: calendarId || 'primary',
        eventId: response.data.id,
      });
      console.log('  ✓ Test event deleted\n');

      console.log('✅ All tests passed! Google Calendar API is working correctly.\n');
      console.log('You can now:');
      console.log('  1. Restart your dev server: npm run dev');
      console.log('  2. Test the booking flow: http://localhost:3000/schedule-a-meet\n');

    } catch (error) {
      console.error('  ❌ Failed to create test event:', error.message);
      console.error('\nError details:', {
        code: error.code,
        status: error.status,
        message: error.message,
      });
      
      console.log('\n💡 Common solutions:\n');
      
      if (error.message === 'unauthorized_client' || error.code === 401) {
        console.log('Your OAuth credentials are invalid. Follow these steps:\n');
        console.log('1. Go to Google Cloud Console: https://console.cloud.google.com');
        console.log('2. Select your project');
        console.log('3. Go to: APIs & Services > Credentials');
        console.log('4. Find your OAuth 2.0 Client ID');
        console.log('5. Make sure these redirect URIs are added:');
        console.log('   - http://localhost:3000/api/auth/google/callback');
        console.log('   - https://developers.google.com/oauthplayground\n');
        console.log('6. Generate a NEW refresh token using OAuth Playground:');
        console.log('   https://developers.google.com/oauthplayground/');
        console.log('   - Use your own OAuth credentials');
        console.log('   - Select BOTH Calendar API scopes:');
        console.log('     • https://www.googleapis.com/auth/calendar');
        console.log('     • https://www.googleapis.com/auth/calendar.events');
        console.log('   - Authorize and get new refresh token');
        console.log('   - Update GOOGLE_REFRESH_TOKEN in .env.local\n');
      } else if (error.code === 403) {
        console.log('Permission denied. Make sure:');
        console.log('1. Google Calendar API is enabled in Google Cloud Console');
        console.log('2. Your OAuth consent screen is properly configured');
        console.log('3. You have calendar access permissions\n');
      }
      
      return;
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testGoogleCalendar();
