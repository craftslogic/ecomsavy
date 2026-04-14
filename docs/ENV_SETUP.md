# Environment Variables Guide

## Service Account Configuration (Updated)

The system now uses **Google Service Account** authentication instead of OAuth. You need to configure the following environment variables:

### Required Variables

```env
# Google Service Account Key (Full JSON)
# Get this from Google Cloud Console > IAM & Admin > Service Accounts
# Copy the entire content of the JSON key file
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"...","universe_domain":"googleapis.com"}'

# Google Calendar ID
# This is the email address of the calendar you want to use
# Usually your email: your-email@gmail.com
# or your-email@yourdomain.com for Google Workspace
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Google Sheet ID (for booking logs)
# Get this from the Google Sheet URL: 
# https://docs.google.com/spreadsheets/d/[THIS-IS-THE-SHEET-ID]/edit
GOOGLE_SHEET_ID=your-sheet-id-here
```

### Important Notes

1. **GOOGLE_SERVICE_ACCOUNT_KEY**: This should be a single-line JSON string. Make sure to:
   - Wrap it in single quotes
   - Keep all the escape characters (\\n for newlines in the private key)
   - Don't modify the JSON structure

2. **GOOGLE_CALENDAR_ID**: Must be shared with the service account email

3. **GOOGLE_SHEET_ID**: The sheet must be shared with the service account email

### Removed Variables (No Longer Needed)

These OAuth-related variables are **NO LONGER USED** and can be removed:
- ~~GOOGLE_CLIENT_ID~~
- ~~GOOGLE_CLIENT_SECRET~~
- ~~GOOGLE_REFRESH_TOKEN~~
- ~~NEXT_PUBLIC_APP_URL~~ (for OAuth callbacks)

### Example .env.local

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Configuration (Resend)
RESEND_API_KEY=re_your-api-key
ADMIN_EMAIL=admin@yourdomain.com

# Google Service Account Configuration
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
GOOGLE_CALENDAR_ID=your-email@gmail.com
GOOGLE_SHEET_ID=your-sheet-id

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing Your Configuration

After setting up the environment variables, run the test script:

```bash
node scripts/test-google-calendar.js
```

This will verify:
- ✓ Service account authentication
- ✓ Calendar access and event creation
- ✓ Google Meet link generation
- ✓ Google Sheets access and write permissions

## Troubleshooting

### "Permission denied" errors
- Make sure you've shared the calendar with the service account email
- Make sure you've shared the Google Sheet with the service account email
- Give "Make changes to events" (calendar) or "Editor" (sheets) permissions

### "API not enabled" errors
- Enable Google Calendar API in Google Cloud Console
- Enable Google Sheets API in Google Cloud Console

### "Failed to parse service account key" errors
- Ensure the JSON is properly formatted
- Make sure all escape characters are preserved
- Wrap the entire JSON in single quotes

### "Calendar not found" errors
- Verify the GOOGLE_CALENDAR_ID matches your calendar email
- Check that the calendar exists and is shared with the service account

See [GOOGLE_CLOUD_SETUP.md](./GOOGLE_CLOUD_SETUP.md) for detailed setup instructions.
