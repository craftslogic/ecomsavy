/**
 * Test Google Calendar and Meet configuration
 * Run this to diagnose issues with calendar event and Meet link creation
 */

const { google } = require('googleapis');
require('dotenv').config({ path: '.env' });

async function testGoogleCalendarSetup() {
  console.log('\n🔍 Testing Google Calendar & Meet Configuration\n');
  console.log('='.repeat(80));
  
  try {
    // 1. Load and validate credentials
    console.log('\n1️⃣  Checking Service Account Credentials...');
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY not found in .env');
      return;
    }
    
    const credentials = JSON.parse(serviceAccountKey);
    console.log('✅ Service Account Email:', credentials.client_email);
    
    // 2. Authenticate
    console.log('\n2️⃣  Authenticating with Google...');
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    });
    
    await auth.authorize();
    console.log('✅ Authentication successful');
    
    const calendar = google.calendar({ version: 'v3', auth });
    
    // 3. Check calendar access
    console.log('\n3️⃣  Testing Calendar Access...');
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    console.log('   Target Calendar:', calendarId);
    
    try {
      const calendarInfo = await calendar.calendars.get({ calendarId });
      console.log('✅ Calendar accessible');
      console.log('   Calendar Name:', calendarInfo.data.summary);
      console.log('   Calendar Type:', calendarInfo.data.id === 'primary' ? 'Service Account Primary' : 'Shared Calendar');
    } catch (error) {
      console.error('❌ Cannot access calendar');
      console.error('   Make sure the calendar is shared with:', credentials.client_email);
      console.error('   With "Make changes to events" permission');
      return;
    }
    
    // 4. Test event creation WITH Google Meet
    console.log('\n4️⃣  Testing Event Creation with Google Meet...');
    const testEvent = {
      summary: '🧪 Test Event - Google Meet',
      description: 'This is a test event to verify Google Meet creation',
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
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
    
    let meetWorking = false;
    let testEventId = null;
    
    try {
      const response = await calendar.events.insert({
        calendarId,
        requestBody: testEvent,
        conferenceDataVersion: 1,
      });
      
      if (response.data.hangoutLink) {
        console.log('✅ Google Meet creation works!');
        console.log('   Event ID:', response.data.id);
        console.log('   Meet Link:', response.data.hangoutLink);
        meetWorking = true;
        testEventId = response.data.id;
      } else {
        console.log('⚠️  Event created but no Meet link generated');
        testEventId = response.data.id;
      }
    } catch (error) {
      console.error('❌ Google Meet creation failed');
      console.error('   Error:', error.message);
      console.log('\n   This is expected for personal Gmail calendars shared with service accounts.');
      console.log('   Google Meet requires either:');
      console.log('   - Using the service account\'s own calendar (set GOOGLE_CALENDAR_ID=primary)');
      console.log('   - OR using a Google Workspace calendar with proper setup');
    }
    
    // 5. Test event creation WITHOUT Google Meet
    if (!meetWorking) {
      console.log('\n5️⃣  Testing Event Creation without Google Meet...');
      const simpleEvent = {
        summary: '🧪 Test Event - No Meet',
        description: 'This is a test event without Google Meet',
        start: {
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
      };
      
      try {
        const response = await calendar.events.insert({
          calendarId,
          requestBody: simpleEvent,
        });
        
        console.log('✅ Basic event creation works');
        console.log('   Event ID:', response.data.id);
        if (testEventId) {
          testEventId = response.data.id;
        }
      } catch (error) {
        console.error('❌ Basic event creation failed:', error.message);
      }
    }
    
    // Cleanup test events
    if (testEventId) {
      console.log('\n6️⃣  Cleaning up test events...');
      try {
        await calendar.events.delete({ calendarId, eventId: testEventId });
        console.log('✅ Test event deleted');
      } catch (error) {
        console.log('⚠️  Could not delete test event:', testEventId);
        console.log('   Please delete it manually from your calendar');
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('\n📋 Test Summary:\n');
    
    if (meetWorking) {
      console.log('✅ Everything is working perfectly!');
      console.log('   You can create calendar events with Google Meet links.\n');
    } else {
      console.log('⚠️  Google Meet creation is not available with current setup.\n');
      console.log('Solutions:');
      console.log('1. Use service account\'s own calendar:');
      console.log('   - Set GOOGLE_CALENDAR_ID=primary in .env');
      console.log('   - Events will appear on service account\'s calendar');
      console.log('   - Google Meet will work automatically\n');
      console.log('2. OR upgrade to Google Workspace and configure domain-wide delegation');
      console.log('3. OR use OAuth instead of service account\n');
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  }
}

// Run the test
testGoogleCalendarSetup();
