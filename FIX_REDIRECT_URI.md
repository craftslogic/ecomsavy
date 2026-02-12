# Fix: redirect_uri_mismatch Error

## Problem
When clicking "Authorize APIs" in OAuth Playground, you see:
```
Error 400: redirect_uri_mismatch
```

## Cause
The OAuth Playground redirect URI is not added to your Google Cloud OAuth Client.

## Solution: Add OAuth Playground Redirect URI

### Step 1: Open Google Cloud Console
1. Go to: **https://console.cloud.google.com**
2. Make sure you're signed in with the correct account
3. Select your project (the one with your OAuth credentials)

### Step 2: Navigate to Credentials
1. In the left sidebar, click: **APIs & Services**
2. Click: **Credentials**
3. You should see a list of your OAuth 2.0 Client IDs

### Step 3: Edit Your OAuth Client
1. Find your OAuth 2.0 Client ID in the list
   - It should show your Client ID: `517183738499-5fd4tvl...`
2. Click the **✏️ (pencil/edit icon)** on the right side
3. This opens the "Edit OAuth client" page

### Step 4: Add Authorized Redirect URIs
Scroll down to **"Authorized redirect URIs"** section

Click **"+ ADD URI"** and add these TWO redirect URIs:

**URI 1 (OAuth Playground):**
```
https://developers.google.com/oauthplayground
```

**URI 2 (Your App - for future use):**
```
http://localhost:3000/api/auth/google/callback
```

**IMPORTANT**: 
- Make sure there are NO extra spaces
- NO trailing slashes
- Exact URLs as shown above

### Step 5: Save Changes
1. Scroll to the bottom
2. Click the blue **"SAVE"** button
3. Wait for the confirmation message

### Step 6: Try OAuth Playground Again
1. Go back to: **https://developers.google.com/oauthplayground/**
2. **REFRESH the page** (or close and reopen)
3. Click ⚙️ and enter your credentials again:
   - OAuth Client ID: `517183738499-5fd4tvlae7gpa1g7cavk5eg2foo10brf.apps.googleusercontent.com`
   - OAuth Client secret: `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`
4. Select both Calendar API scopes:
   - ☑️ `https://www.googleapis.com/auth/calendar`
   - ☑️ `https://www.googleapis.com/auth/calendar.events`
5. Click **"Authorize APIs"**
6. This time it should work! ✅

---

## Visual Guide

### In Google Cloud Console Credentials Page:

```
OAuth 2.0 Client IDs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name                  Type           Created        Actions
My OAuth Client       Web app        Jan 15, 2026   ✏️ 🗑️
  517183738499-5fd...
```

Click the ✏️ to edit

### In Edit OAuth Client Page:

```
Authorized redirect URIs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
URIs you can use for your OAuth consent flow

  1. https://developers.google.com/oauthplayground     [×]
  2. http://localhost:3000/api/auth/google/callback   [×]

[+ ADD URI]

                                              [CANCEL]  [SAVE]
```

---

## After Fixing

Once you've added the redirect URIs and saved:

1. **Refresh OAuth Playground** (important!)
2. Configure your credentials in settings
3. Select both Calendar API scopes
4. Click "Authorize APIs"
5. Sign in and allow permissions
6. Get your new refresh token
7. Update `.env.local`:
   ```env
   GOOGLE_REFRESH_TOKEN=1//[new-token-here]
   ```
8. Test:
   ```bash
   node scripts/test-google-calendar.js
   ```

---

## Still Getting the Error?

### Double-check:
- [ ] You saved the changes in Google Cloud Console
- [ ] You refreshed the OAuth Playground page
- [ ] The redirect URI is **exactly**: `https://developers.google.com/oauthplayground`
- [ ] No extra spaces or trailing slashes
- [ ] You're using the correct Google Cloud project

### Common Mistakes:
❌ `https://developers.google.com/oauthplayground/` (trailing slash)
✅ `https://developers.google.com/oauthplayground`

❌ `http://developers.google.com/oauthplayground` (http instead of https)
✅ `https://developers.google.com/oauthplayground`

---

## Complete Redirect URIs List

Your OAuth client should have these redirect URIs:

```
1. https://developers.google.com/oauthplayground
   (for generating refresh tokens)

2. http://localhost:3000/api/auth/google/callback
   (for local development - if you add OAuth login later)

For production, also add:
3. https://yourdomain.com/api/auth/google/callback
   (when you deploy)
```

---

Once this is fixed, you'll be able to complete the OAuth flow and get your refresh token! 🎉
