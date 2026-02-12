# Quick Start Checklist

Follow these steps in order to get your scheduling system running.

## Part 1: Install Dependencies (5 minutes)

```bash
npm install @supabase/supabase-js googleapis resend
```

## Part 2: Supabase Setup (10 minutes)

### 2.1 Create Supabase Project
- [ ] Go to https://supabase.com and create account
- [ ] Create new project (wait for provisioning ~2 minutes)
- [ ] Note down project URL

### 2.2 Run Database Schema
- [ ] Open Supabase dashboard > SQL Editor
- [ ] Copy entire content from `SUPABASE_SCHEMA.sql`
- [ ] Paste and click "Run"
- [ ] Verify success (should see "Success. No rows returned")

### 2.3 Generate Time Slots
- [ ] In SQL Editor, copy content from `scripts/generate-slots.sql`
- [ ] Paste and click "Run"
- [ ] Verify slots created (should see success message)

### 2.4 Get API Keys
- [ ] Go to Project Settings > API
- [ ] Copy Project URL → Save for later
- [ ] Copy `anon` public key → Save for later
- [ ] Copy `service_role` key → Save for later (keep secret!)
https://supabase.com/dashboard/project/nbobdunummbsqdxglnvd/    (url)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ib2JkdW51bW1ic3FkeGdsbnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTgwNzIsImV4cCI6MjA4NTg3NDA3Mn0.jBkBj41GmE11lg1BdP04zpXhYEQO9ew4QFkQmcClKE8    (anon public key)

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ib2JkdW51bW1ic3FkeGdsbnZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDI5ODA3MiwiZXhwIjoyMDg1ODc0MDcyfQ._zJDQxWwrTIfPBReNApUYVxIzBB34Hy6SI5-NdZXT1A (service role)


---

## Part 3: Google Calendar Setup (15 minutes)

### 3.1 Create Google Cloud Project
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project (top menu)
- [ ] Name it "Ecomsavy Scheduler"

### 3.2 Enable Google Calendar API
- [ ] In left menu: APIs & Services > Library
- [ ] Search "Google Calendar API"
- [ ] Click the result, then click "Enable"

### 3.3 Create OAuth Credentials
- [ ] Go to APIs & Services > Credentials
- [ ] Click "Create Credentials" > "OAuth client ID"
- [ ] Application type: "Web application"
- [ ] Name: "Ecomsavy Scheduler"
- [ ] Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
- [ ] Click "Create"
- [ ] Copy Client ID → Save for later
- [ ] Copy Client Secret → Save for later
517183738499-5fd4tvlae7gpa1g7cavk5eg2foo10brf.apps.googleusercontent.com    (client id)
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 (client secret)

### 3.4 Get Refresh Token (Use OAuth Playground)
- [ ] Go to https://developers.google.com/oauthplayground/
- [ ] Click ⚙️ (settings, top right)
- [ ] ✅ Check "Use your own OAuth credentials"
- [ ] Paste your Client ID and Client Secret
- [ ] Close settings

**In Step 1:**
- [ ] Find "Google Calendar API v3"
- [ ] Check both boxes:
  - ✅ `https://www.googleapis.com/auth/calendar`
  - ✅ `https://www.googleapis.com/auth/calendar.events`
- [ ] Click "Authorize APIs"
- [ ] Select your Google account
- [ ] Click "Allow" (may show warning - click "Advanced" then "Go to...")

**In Step 2:**
- [ ] Click "Exchange authorization code for tokens"
- [ ] Copy "Refresh token" → Save for later
1//04gOr_z5JnvvQCgYIARAAGAQSNwF-L9Ir2h5C8R31zg_MaNyQ6RgZdvdTJ7MILjHj90v2snPFZz8L2n53vhfASy9Dnv7VIbt0ULU (refresh token)

### 3.5 Get Calendar ID
- [ ] Open Google Calendar (calendar.google.com)
- [ ] Settings (gear icon) > Settings
- [ ] Select calendar from left (usually your email)
- [ ] Scroll to "Integrate calendar" section
- [ ] Copy "Calendar ID" (usually your email) → Save for later
craftslogic1@gmail.com  (calender ID)

---

## Part 4: Resend Email Setup (5 minutes)

### 4.1 Create Account
- [ ] Go to https://resend.com
- [ ] Sign up (free tier: 100 emails/day)
- [ ] Verify your email

### 4.2 Get API Key
- [ ] Click "API Keys" in dashboard
- [ ] Click "Create API Key"
- [ ] Name: "Ecomsavy Scheduler"
- [ ] Copy API key → Save for later
re_MzJ7NAym_9RsJXx2dwU46JT36La9yXe6x  (API key)

### 4.3 (Optional) Add Domain (ye wala kam krna he abi)
For production, add your domain:
- [ ] Go to "Domains" section
- [ ] Add domain
- [ ] Add DNS records as shown
- [ ] Verify domain


For now, you can use Resend's test emails.

---

## Part 5: Environment Configuration (5 minutes)

### 5.1 Create Environment File
```bash
cp .env.local.example .env.local
```

### 5.2 Fill in All Values
Open `.env.local` and paste your saved values:

```env
# Supabase (from Part 2.4)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Google Calendar (from Part 3)
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REFRESH_TOKEN=1//xxxxx
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Resend (from Part 4.2)
RESEND_API_KEY=re_xxxxx

# Admin Email (your email for receiving notifications)
ADMIN_EMAIL=admin@ecomsavy.com

# App URL (for local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- [ ] All environment variables filled in
- [ ] File saved

---

## Part 6: Run & Test (5 minutes)

### 6.1 Start Development Server
```bash
npm run dev
```

- [ ] Server started without errors
- [ ] No warnings about missing environment variables

### 6.2 Test the Funnel
- [ ] Open http://localhost:3000/schedule-a-meet
- [ ] See Step 1 form
- [ ] Fill in your details (use your real email)
- [ ] Click Continue → Should go to Step 2
- [ ] Answer qualification questions
- [ ] Click Continue → Should go to Step 3
- [ ] See available time slots
- [ ] Select a date and time
- [ ] Click "Confirm Meeting"
- [ ] See Step 4 confirmation page

### 6.3 Verify Everything Worked
- [ ] Check your email (client confirmation)
- [ ] Check admin email (admin notification)
- [ ] Open Google Calendar → See event with Meet link
- [ ] Click Meet link → Should open Google Meet

### 6.4 Verify Database
In Supabase dashboard > Table Editor:
- [ ] Check `leads` table → Should have your entry
- [ ] Check `qualification_responses` → Should have your answers
- [ ] Check `booked_meetings` → Should have your booking
- [ ] Check `available_slots` → Selected slot should be `is_booked = true`

---

## Part 7: Production Preparation (Optional)

When ready to deploy:

- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Add production URL to Google OAuth redirect URIs
- [ ] Verify domain with Resend
- [ ] Test complete flow in production
- [ ] Set up monitoring

---

## Troubleshooting

### ❌ "Failed to create calendar event"
**Solution:**
1. Check Google Calendar API is enabled
2. Verify refresh token in `.env.local`
3. Check console for specific error
4. Try getting a new refresh token

### ❌ "Failed to send email"
**Solution:**
1. Check Resend API key
2. Verify admin email is valid
3. Check Resend dashboard logs
4. Look in spam folder

### ❌ "Slot already booked"
**Solution:**
- This is normal! Someone else booked it first
- Select a different time slot
- This proves the atomic booking is working ✅

### ❌ "Failed to fetch slots"
**Solution:**
1. Check Supabase connection
2. Verify you ran `generate-slots.sql`
3. Check if slots exist: `SELECT * FROM available_slots`

### ❌ Server won't start
**Solution:**
1. Check all environment variables are set
2. Look for typos in `.env.local`
3. Restart the dev server
4. Check terminal for specific error

---

## Quick Commands Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

## Important Files

- `SUPABASE_SCHEMA.sql` - Database schema
- `scripts/generate-slots.sql` - Generate time slots
- `scripts/admin-queries.sql` - Useful database queries
- `.env.local` - Your configuration (never commit!)
- `SETUP_GUIDE.md` - Detailed setup guide
- `README_SCHEDULING.md` - Complete documentation

---

## Next Steps

1. **Test thoroughly** - Book a few meetings
2. **Customize** - Update email templates, add logo
3. **Generate more slots** - Run `generate-slots.sql` monthly
4. **Monitor** - Check Supabase and Resend dashboards regularly
5. **Deploy** - Follow Production Preparation checklist

---

## Support

If stuck:
1. ✅ Check this checklist again
2. 📖 Read `SETUP_GUIDE.md` for details
3. 🔍 Check browser console (F12)
4. 📋 Review Supabase logs
5. 📧 Check Resend dashboard

---

**Estimated Total Time: 45 minutes**

Good luck! 🚀
