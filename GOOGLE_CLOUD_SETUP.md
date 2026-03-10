# Google Cloud Console Setup Guide

This guide walks you through setting up Google Service Account authentication for your meeting booking system.

## Prerequisites

- A Google Cloud Platform account
- A Google account with a calendar
- A Google Sheet for logging bookings

---

## Part 1: Create a Google Cloud Project

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account

### Step 2: Create a New Project (or select an existing one)

1. Click on the project dropdown at the top of the page
2. Click **"New Project"**
3. Enter a project name (e.g., "Ecomsavy Booking System")
4. Click **"Create"**
5. Wait for the project to be created and make sure it's selected

---

## Part 2: Enable Required APIs

You need to enable two APIs: Google Calendar API and Google Sheets API.

### Step 1: Enable Google Calendar API

1. In the Google Cloud Console, go to **"APIs & Services"** > **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"Enable"**
4. Wait for it to be enabled

### Step 2: Enable Google Sheets API

1. Still in the Library, search for **"Google Sheets API"**
2. Click on it and press **"Enable"**
3. Wait for it to be enabled

---

## Part 3: Create a Service Account

### Step 1: Navigate to Service Accounts

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** at the top
3. Select **"Service Account"**

### Step 2: Configure Service Account Details

1. **Service account name**: Enter a descriptive name (e.g., "booking-system-sa")
2. **Service account ID**: This will be auto-generated (e.g., "booking-system-sa")
3. **Description**: Optional (e.g., "Service account for calendar and sheets access")
4. Click **"Create and Continue"**

### Step 3: Grant Permissions (Optional - Skip This)

1. You can skip the "Grant this service account access to project" step
2. Click **"Continue"**

### Step 4: Grant Users Access (Optional - Skip This)

1. You can skip the "Grant users access to this service account" step
2. Click **"Done"**

---

## Part 4: Generate Service Account Key

### Step 1: Open Service Account

1. On the **"Credentials"** page, scroll down to the **"Service Accounts"** section
2. Click on the service account you just created

### Step 2: Create JSON Key

1. Go to the **"Keys"** tab
2. Click **"Add Key"** > **"Create new key"**
3. Choose **"JSON"** as the key type
4. Click **"Create"**

### Step 3: Download and Save the Key

1. A JSON file will be downloaded automatically (e.g., `project-name-xxxxx.json`)
2. **IMPORTANT**: Keep this file secure - it provides full access to your service account
3. Open the file in a text editor
4. Copy the **entire contents** (it should look like a JSON object starting with `{`)

### Step 4: Note the Service Account Email

The JSON file contains a `client_email` field that looks like:
```
your-service-account@project-name.iam.gserviceaccount.com
```

**Save this email address** - you'll need it in the next steps!

---

## Part 5: Share Your Google Calendar

The service account needs access to your calendar to create events.

### Step 1: Open Google Calendar

1. Go to [Google Calendar](https://calendar.google.com)
2. Sign in with the account that owns the calendar you want to use

### Step 2: Find Your Calendar

1. In the left sidebar, find your calendar under **"My calendars"**
2. If you want to use your primary calendar, it's usually labeled with your email

### Step 3: Share with Service Account

1. Hover over your calendar name
2. Click the three dots (⋮) that appear
3. Select **"Settings and sharing"**
4. Scroll down to **"Share with specific people or groups"**
5. Click **"Add people and groups"**
6. Enter the **service account email** you noted earlier:
   ```
   your-service-account@project-name.iam.gserviceaccount.com
   ```
7. Set the permission to **"Make changes to events"**
8. Click **"Send"**

### Step 4: Get Your Calendar ID

1. Still in calendar settings, scroll down to **"Integrate calendar"**
2. Find the **"Calendar ID"** - it's usually your email address
3. Copy this ID - you'll need it for the `GOOGLE_CALENDAR_ID` environment variable

---

## Part 6: Create and Share a Google Sheet

### Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click the **"+"** button to create a new sheet
3. Name it something like "Ecomsavy Bookings"

### Step 2: Set Up Headers (Optional but Recommended)

In the first row, add these column headers:
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Business Timeline | Investment Ready | Category Interest | Meeting Date | Meeting Time | Google Meet Link |

### Step 3: Share with Service Account

1. Click the **"Share"** button in the top right
2. In the "Add people and groups" field, enter the **service account email**:
   ```
   your-service-account@project-name.iam.gserviceaccount.com
   ```
3. Set the permission to **"Editor"**
4. **Uncheck** "Notify people" (the service account doesn't need notification)
5. Click **"Share"** or **"Done"**

### Step 4: Get Your Sheet ID

1. Look at the URL of your Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/[THIS-IS-THE-SHEET-ID]/edit
   ```
2. Copy the long string between `/d/` and `/edit` - this is your Sheet ID
3. You'll need this for the `GOOGLE_SHEET_ID` environment variable

---

## Part 7: Configure Environment Variables

### Step 1: Create or Update .env.local

In your project root, create or update the `.env.local` file:

```env
# Google Service Account Key (Full JSON - wrap in single quotes)
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@project-name.iam.gserviceaccount.com",...}'

# Google Calendar ID (usually your email)
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Google Sheet ID (from the URL)
GOOGLE_SHEET_ID=1abc...xyz
```

### Step 2: Format the Service Account Key Correctly

**IMPORTANT**: The JSON key must be on a single line, wrapped in single quotes.

To format it correctly:
1. Open the downloaded JSON file in a text editor
2. Remove all line breaks (make it one long line)
3. Wrap the entire JSON in single quotes `'...'`
4. Make sure the `\n` characters in the private key are preserved

**Example**:
```env
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"myproject",...,"private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",...}'
```

---

## Part 8: Test Your Configuration

### Step 1: Install Dependencies (if needed)

```bash
npm install
```

### Step 2: Run the Test Script

```bash
node scripts/test-google-calendar.js
```

### Step 3: Verify Test Results

The script should:
- ✅ Parse your service account credentials
- ✅ Authorize the service account
- ✅ Access your calendar
- ✅ Create a test event with a Google Meet link
- ✅ Delete the test event
- ✅ Access your Google Sheet (if configured)
- ✅ Write test data to the sheet

If any step fails, the script will provide helpful error messages and troubleshooting steps.

---

## Troubleshooting

### Problem: "Permission denied" (403 error)

**Cause**: The service account doesn't have access to the calendar or sheet.

**Solution**:
- Make sure you shared the calendar with the service account email
- Make sure you shared the Google Sheet with the service account email
- Double-check the permissions are set to "Make changes to events" (calendar) or "Editor" (sheets)

### Problem: "Calendar not found" (404 error)

**Cause**: The `GOOGLE_CALENDAR_ID` doesn't match your actual calendar ID.

**Solution**:
- Go to Google Calendar Settings
- Find the Calendar ID under "Integrate calendar"
- Update your `.env.local` with the correct ID (usually your email)

### Problem: "Failed to parse service account key"

**Cause**: The JSON is malformed or not properly escaped.

**Solution**:
- Make sure the entire JSON is wrapped in single quotes
- Ensure `\n` characters in the private key are preserved
- Don't add any extra line breaks
- Verify the JSON is valid using a JSON validator

### Problem: "Google Meet link not generated"

**Possible Causes**:
- Your Google account doesn't have Google Meet enabled
- You're not using a Google Workspace account (free Gmail may have limited Meet access)
- The calendar owner needs to enable video conferencing

**Solution**:
- Enable Google Meet in your Google Calendar settings
- Or use a Google Workspace account

### Problem: "Sheet not found" (404 error)

**Cause**: The `GOOGLE_SHEET_ID` is incorrect.

**Solution**:
- Check the Sheet ID from the URL
- Make sure you're copying the ID between `/d/` and `/edit`
- Verify the sheet exists and is shared with the service account

---

## Security Best Practices

1. **Never commit the service account JSON key to version control**
   - Add `.env.local` to your `.gitignore`
   - Keep the key file secure

2. **Limit service account permissions**
   - Only share the specific calendar and sheet needed
   - Don't give the service account unnecessary access

3. **Rotate keys periodically**
   - Delete old keys in Google Cloud Console
   - Create new keys every few months

4. **Monitor API usage**
   - Check the Google Cloud Console for API usage
   - Set up billing alerts if using paid services

---

## Summary Checklist

- [ ] Created a Google Cloud project
- [ ] Enabled Google Calendar API
- [ ] Enabled Google Sheets API
- [ ] Created a service account
- [ ] Downloaded the service account JSON key
- [ ] Shared Google Calendar with the service account
- [ ] Created a Google Sheet
- [ ] Shared Google Sheet with the service account
- [ ] Added environment variables to `.env.local`
- [ ] Ran the test script successfully
- [ ] Secured the service account key file

---

## Next Steps

Once everything is configured and tested:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the booking flow:
   ```
   http://localhost:3000/schedule-a-meet
   ```

3. Verify that bookings:
   - Create calendar events ✓
   - Generate Google Meet links ✓
   - Log to Google Sheets ✓

4. Deploy to production with the same environment variables

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the error messages in the terminal
2. Review the test script output
3. Verify all environment variables are set correctly
4. Ensure all Google Cloud APIs are enabled
5. Confirm calendar and sheet are shared with the service account

For more details, see [ENV_SETUP.md](./ENV_SETUP.md).
