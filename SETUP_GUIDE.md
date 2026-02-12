# Meeting Scheduling System Setup Guide

## 1. Install Required Dependencies

Run the following command to install all necessary packages:

```bash
npm install @supabase/supabase-js googleapis resend
```

## 2. Database Setup

### Step 2.1: Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Wait for the database to be provisioned

### Step 2.2: Run the SQL Schema
1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy the entire content from `SUPABASE_SCHEMA.sql`
4. Paste and execute it
5. Verify that all tables are created successfully

### Step 2.3: Get Your API Keys
1. In Supabase dashboard, go to Project Settings > API
2. Copy the following:
   - Project URL
   - `anon` public key
   - `service_role` secret key (keep this secure!)

## 3. Google Calendar API Setup

### Step 3.1: Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### Step 3.2: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: "Web application"
4. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
5. Save Client ID and Client Secret

### Step 3.3: Get Refresh Token
Run this OAuth flow once to get your refresh token:

```javascript
// You can use this quick script or the Google OAuth Playground
// https://developers.google.com/oauthplayground/

// Scopes needed:
// - https://www.googleapis.com/auth/calendar
// - https://www.googleapis.com/auth/calendar.events
```

Alternatively, use Google OAuth Playground:
1. Go to https://developers.google.com/oauthplayground/
2. Click settings (top right), check "Use your own OAuth credentials"
3. Enter your Client ID and Client Secret
4. In Step 1, select "Google Calendar API v3" and all scopes
5. Click "Authorize APIs"
6. In Step 2, click "Exchange authorization code for tokens"
7. Copy the "Refresh token"

### Step 3.4: Get Calendar ID
1. Open Google Calendar
2. Go to Settings > Settings for my calendars
3. Select the calendar you want to use
4. Scroll down to "Integrate calendar"
5. Copy the "Calendar ID"

## 4. Email Service Setup (Resend)

### Step 4.1: Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 4.2: Get API Key
1. Go to API Keys section
2. Create a new API key
3. Copy the API key

### Step 4.3: Add Domain (Optional for Production)
For production, add and verify your domain in Resend dashboard.
For testing, you can use their testing email addresses.

## 5. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Calendar
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@ecomsavy.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 6. Seed Available Time Slots

The SQL schema includes sample data generation. You can also manually add slots:

```sql
-- Add slots for a specific date
INSERT INTO available_slots (slot_date, start_time, end_time) VALUES
  ('2026-02-10', '09:00:00', '10:00:00'),
  ('2026-02-10', '10:00:00', '11:00:00'),
  ('2026-02-10', '14:00:00', '15:00:00'),
  ('2026-02-10', '15:00:00', '16:00:00');
```

## 7. Run the Application

```bash
npm run dev
```

Navigate to http://localhost:3000/schedule-a-meet

## 8. Testing the System

1. **Step 1 - Lead Capture**: Fill in your details
2. **Step 2 - Qualification**: Answer the questions
3. **Step 3 - Slot Selection**: Pick an available time slot
4. **Step 4 - Confirmation**: 
   - A Google Calendar event should be created with Meet link
   - You should receive a confirmation email
   - Admin should receive a notification email

## 9. Troubleshooting

### Google Calendar Not Creating Events
- Check that Calendar API is enabled
- Verify refresh token is valid
- Ensure Calendar ID is correct

### Emails Not Sending
- Verify Resend API key
- Check spam folder
- Review Resend dashboard logs

### Database Errors
- Check Supabase connection
- Verify RLS policies are set correctly
- Review Supabase logs in dashboard

### Slot Already Booked Error
- This is normal - it means the atomic booking function is working
- The slot was taken by another user
- User should select a different slot

## 10. Production Deployment

Before deploying to production:

1. Update `NEXT_PUBLIC_APP_URL` to your production URL
2. Add production URL to Google OAuth redirect URIs
3. Verify domain with Resend for production emails
4. Review and adjust Supabase RLS policies
5. Consider adding rate limiting to API routes
6. Set up monitoring and logging
7. Test the entire flow in production environment

## Support

For issues or questions:
- Check Supabase logs
- Review browser console for errors
- Verify all environment variables are set correctly
