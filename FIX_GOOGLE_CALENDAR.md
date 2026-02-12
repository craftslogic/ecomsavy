# Google Calendar OAuth - Step by Step Fix Guide

## Problem: "unauthorized_client" Error

Your refresh token is invalid or was generated without the correct permissions.

## Solution: Generate a New Refresh Token

### 📋 Prerequisites
You need:
- ✅ Google Cloud project created
- ✅ Google Calendar API enabled
- ✅ OAuth 2.0 Client ID created
- ✅ Your Client ID and Client Secret

---

## 🎯 Step-by-Step Instructions

### Step 1: Open OAuth Playground
1. Go to: https://developers.google.com/oauthplayground/
2. Keep this page open

### Step 2: Configure Your OAuth Credentials
1. Click the **⚙️ (Settings/gear icon)** in the top right corner
2. Check the box: **☑️ Use your own OAuth credentials**
3. Fill in:
   - **OAuth Client ID**: `517183738499-5fd4tvlae7gpa1g7cavk5eg2foo10brf.apps.googleusercontent.com`
   - **OAuth Client secret**: `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`
4. **Close** the settings panel

### Step 3: Select API Scopes
In the left panel under **"Step 1: Select & authorize APIs"**:

1. Find **"Google Calendar API v3"** (you can search for it)
2. Expand it if collapsed
3. Check **BOTH** of these boxes:
   ```
   ☑️ https://www.googleapis.com/auth/calendar
   ☑️ https://www.googleapis.com/auth/calendar.events
   ```

**IMPORTANT**: Make sure you select BOTH scopes!

4. Click the blue **"Authorize APIs"** button

### Step 4: Sign In & Authorize
1. **Choose your Google account** (craftslogic1@gmail.com or the one with your calendar)
2. You may see a warning: "Google hasn't verified this app"
   - Click **"Advanced"**
   - Click **"Go to [Your App Name] (unsafe)"**
3. Review permissions and click **"Allow"**
4. Click **"Allow"** again if asked about calendar access

### Step 5: Get Your Refresh Token
1. You'll be redirected back to OAuth Playground
2. In **"Step 2: Exchange authorization code for tokens"**
3. Click the blue button: **"Exchange authorization code for tokens"**
4. Wait a moment for the response
5. You'll see a JSON response with:
   - access_token
   - **refresh_token** ← This is what you need!
   - expires_in
   - scope

### Step 6: Copy the Refresh Token
1. Find the **"Refresh token"** field in the response
2. Copy the ENTIRE value (starts with `1//`)
3. It should look like: `1//04xxxxxxxxxxxxxxx...`

### Step 7: Update Your Environment File
1. Open `.env.local` in your project
2. Find the line: `GOOGLE_REFRESH_TOKEN=...`
3. Replace the old token with your NEW refresh token:
   ```env
   GOOGLE_REFRESH_TOKEN=1//04[your-new-token-here]
   ```
4. **Save the file**

### Step 8: Test It
1. Run the test script again:
   ```bash
   node scripts/test-google-calendar.js
   ```

2. You should see:
   ```
   ✓ Successfully refreshed access token
   ✓ Successfully accessed calendar list
   ✓ Successfully created test event
   ✓ Google Meet link: https://meet.google.com/xxx-xxxx-xxx
   ✅ All tests passed!
   ```

3. If successful, restart your dev server:
   ```bash
   npm run dev
   ```

4. Test the booking flow:
   - Go to: http://localhost:3000/schedule-a-meet
   - Complete all 3 steps
   - Book a meeting
   - Check your Google Calendar for the event!

---

## ⚠️ Common Issues

### Issue: "Google hasn't verified this app"
**Solution**: This is normal for development. Click "Advanced" → "Go to [App Name] (unsafe)"

### Issue: Token still doesn't work
**Solution**: 
1. Make sure you selected BOTH Calendar API scopes
2. Make sure you copied the ENTIRE refresh token
3. Try regenerating it again, following steps exactly

### Issue: "Access blocked: This app's request is invalid"
**Solution**: 
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Select your project
3. Go to: APIs & Services > OAuth consent screen
4. Make sure your email is added as a test user
5. Try the OAuth playground again

### Issue: No Google Meet link generated
**Solution**: 
- This happens with personal Google accounts sometimes
- The event will still be created, just without Meet link
- Consider using Google Workspace account for full Meet support

---

## 🎥 Visual Guide

### OAuth Playground Settings Panel:
```
⚙️ OAuth 2.0 configuration
───────────────────────────
☑️ Use your own OAuth credentials

OAuth Client ID
[517183738499-5fd4tvlae7gpa1g7cavk5eg2foo10brf.apps.googleusercontent.com]

OAuth Client secret
[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]

[Close]
```

### Scopes Selection:
```
Step 1: Select & authorize APIs
────────────────────────────────
Search: calendar

▼ Google Calendar API v3
  ☑️ https://www.googleapis.com/auth/calendar
  ☑️ https://www.googleapis.com/auth/calendar.events

[Authorize APIs]
```

### Token Exchange Response:
```json
{
  "access_token": "ya29.a0...",
  "expires_in": 3599,
  "refresh_token": "1//04gOr_z5Jnvv...",  ← Copy this!
  "scope": "https://www.googleapis.com/auth/calendar ...",
  "token_type": "Bearer"
}
```

---

## ✅ Success Checklist

After following all steps:
- [ ] OAuth credentials configured in playground
- [ ] Both Calendar API scopes selected
- [ ] Authorized and signed in
- [ ] New refresh token copied
- [ ] .env.local updated
- [ ] Test script passes
- [ ] Dev server restarted
- [ ] Booking flow works
- [ ] Event appears in Google Calendar
- [ ] Google Meet link generated

---

## 📞 Still Having Issues?

Run the diagnostic test to see detailed error:
```bash
node scripts/test-google-calendar.js
```

Check:
1. Google Calendar API is enabled in Cloud Console
2. OAuth consent screen is configured
3. Your email is added as a test user
4. Redirect URIs include: https://developers.google.com/oauthplayground

---

**Need the test to pass first before the booking will work!** 🎯
