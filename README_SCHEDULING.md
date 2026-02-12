# Meeting Scheduling System - Complete Implementation

## 🎉 System Overview

A production-ready, multi-step lead qualification and meeting scheduling system built with:
- **Frontend**: Next.js 16 (App Router) + React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Calendar**: Google Calendar API with Google Meet
- **Email**: Resend (free tier: 100 emails/day)

## 📋 What's Been Implemented

### ✅ Complete Features

1. **Step 1 - Lead Capture Form**
   - Full name, email, phone validation
   - Real-time form validation with Zod
   - Data stored in Supabase `leads` table

2. **Step 2 - Qualification Questions**
   - 4 qualification questions with radio buttons
   - Business timeline, investment status, brand awareness, category interest
   - Data stored in Supabase `qualification_responses` table

3. **Step 3 - Calendar Slot Selection**
   - Custom calendar UI (no iframes)
   - Fetches available slots from Supabase
   - Shows dates and times grouped by day
   - Prevents selection of booked slots

4. **Step 4 - Booking Confirmation**
   - Creates Google Calendar event with Meet link
   - Atomic slot booking (prevents double booking)
   - Sends confirmation email to client
   - Sends notification email to admin
   - Beautiful confirmation page with all details

### 🔒 Security Features

- Server-side validation on all API routes
- Environment variables for sensitive data
- Supabase Row Level Security (RLS) policies
- Atomic database transactions for bookings
- Input sanitization and validation

### 🎨 UI/UX Features

- Fully responsive (mobile-first design)
- Progress indicator showing current step
- Loading states for all operations
- Error handling and user-friendly error messages
- Dark mode support
- Accessible form controls

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── scheduling/
│   │       ├── slots/route.ts       # GET available slots
│   │       ├── lead/route.ts        # POST create lead
│   │       ├── qualification/route.ts  # POST save qualification
│   │       └── book/route.ts        # POST book meeting
│   └── schedule-a-meet/
│       └── page.tsx                 # Main scheduling page
├── components/
│   └── scheduling/
│       ├── Step1LeadCapture.tsx     # Lead form
│       ├── Step2Qualification.tsx   # Qualification form
│       ├── Step3CalendarSelection.tsx  # Calendar UI
│       └── Step4Confirmation.tsx    # Success page
├── lib/
│   ├── supabase.ts                  # Supabase client setup
│   ├── validation.ts                # Zod schemas
│   ├── google-calendar.ts           # Google Calendar API
│   └── email.ts                     # Email service (Resend)
└── types/
    └── scheduling.ts                # TypeScript types
```

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js googleapis resend
```

### Step 2: Set Up Supabase

1. Create account at https://supabase.com
2. Create a new project
3. Go to SQL Editor
4. Run the entire `SUPABASE_SCHEMA.sql` file
5. Verify tables are created: `leads`, `qualification_responses`, `available_slots`, `booked_meetings`
6. Get your API keys from Project Settings > API

### Step 3: Set Up Google Calendar API

Follow the detailed instructions in `SETUP_GUIDE.md` to:
1. Create Google Cloud project
2. Enable Google Calendar API
3. Create OAuth 2.0 credentials
4. Get refresh token
5. Get calendar ID

Quick OAuth Playground method:
- Visit: https://developers.google.com/oauthplayground/
- Select "Google Calendar API v3"
- Authorize and get refresh token

### Step 4: Set Up Resend (Email)

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Get API key from dashboard
3. (Optional) Add and verify your domain for production

### Step 5: Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyXxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyXxxxx...

# Google Calendar
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REFRESH_TOKEN=1//xxxxx
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Resend Email
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@yourdomain.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 6: Seed Available Time Slots

The SQL schema includes automatic seeding for the next 7 days (weekdays only).

To add more slots manually:

```sql
INSERT INTO available_slots (slot_date, start_time, end_time) VALUES
  ('2026-02-10', '09:00:00', '10:00:00'),
  ('2026-02-10', '10:00:00', '11:00:00'),
  ('2026-02-10', '14:00:00', '15:00:00'),
  ('2026-02-10', '15:00:00', '16:00:00');
```

Or create a script to generate slots for the next 30 days.

### Step 7: Run the Application

```bash
npm run dev
```

Visit: http://localhost:3000/schedule-a-meet

## 🧪 Testing the System

### Test Flow:
1. Navigate to `/schedule-a-meet`
2. Fill in Step 1 (lead capture)
3. Answer Step 2 (qualification questions)
4. Select a slot in Step 3 (calendar)
5. Verify Step 4 (confirmation page)

### Expected Results:
- ✅ Lead created in Supabase `leads` table
- ✅ Qualification saved in `qualification_responses` table
- ✅ Slot marked as booked in `available_slots` table
- ✅ Meeting created in `booked_meetings` table
- ✅ Google Calendar event created with Meet link
- ✅ Client receives confirmation email
- ✅ Admin receives notification email

## 📊 Database Queries for Verification

```sql
-- Check leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- Check qualifications
SELECT l.full_name, l.email, qr.*
FROM leads l
JOIN qualification_responses qr ON l.id = qr.lead_id
ORDER BY l.created_at DESC;

-- Check bookings
SELECT l.full_name, l.email, bm.meeting_date, bm.meeting_start_time, bm.google_meet_link
FROM leads l
JOIN booked_meetings bm ON l.id = bm.lead_id
ORDER BY bm.created_at DESC;

-- Check available slots
SELECT * FROM v_available_slots;

-- View complete lead information
SELECT * FROM v_leads_complete ORDER BY lead_created_at DESC;
```

## 🔧 Customization

### Change Meeting Duration
Edit available slots in database (default is 1 hour).

### Modify Qualification Questions
Edit `Step2Qualification.tsx` and update the database schema accordingly.

### Customize Email Templates
Edit `src/lib/email.ts` to change email HTML/styling.

### Change Booking Policies
Modify the atomic booking function in `SUPABASE_SCHEMA.sql`.

## 🐛 Troubleshooting

### Issue: Google Calendar events not created
- **Solution**: 
  - Verify Google Calendar API is enabled
  - Check refresh token is valid
  - Ensure calendar ID is correct
  - Check console for error messages

### Issue: Emails not sending
- **Solution**:
  - Verify Resend API key
  - Check email addresses are valid
  - Review Resend dashboard logs
  - Check spam folder

### Issue: "Slot already booked" error
- **Solution**: 
  - This is expected behavior (race condition prevention)
  - User should select a different slot
  - Verify atomic booking function is working

### Issue: Database connection errors
- **Solution**:
  - Verify Supabase URL and keys
  - Check RLS policies
  - Review Supabase logs

## 📈 Production Deployment

### Pre-deployment Checklist:
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Add production URL to Google OAuth redirect URIs
- [ ] Verify domain with Resend
- [ ] Test all environment variables
- [ ] Review and adjust Supabase RLS policies
- [ ] Add rate limiting to API routes
- [ ] Set up monitoring and error tracking
- [ ] Test complete flow in production

### Recommended Enhancements:
1. Add rate limiting (e.g., using Upstash Redis)
2. Implement email verification
3. Add SMS notifications (Twilio)
4. Create admin dashboard for managing bookings
5. Add calendar sync for clients
6. Implement cancellation/rescheduling
7. Add analytics and conversion tracking

## 🎯 Key Features Highlights

### Race Condition Prevention
The `book_meeting_slot()` PostgreSQL function uses row-level locking to prevent double bookings:
```sql
SELECT * FROM available_slots WHERE id = p_slot_id FOR UPDATE;
```

### Email Notifications
- **Client Email**: Includes meet link, calendar buttons, preparation tips
- **Admin Email**: Includes client info, qualification answers, meeting details

### Error Handling
- User-friendly error messages
- Graceful degradation (booking succeeds even if email fails)
- Rollback on critical failures

### Responsive Design
- Mobile-first approach
- Touch-friendly UI elements
- Works on all screen sizes

## 📝 API Reference

### GET /api/scheduling/slots
Returns all available (not booked) slots for future dates.

### POST /api/scheduling/lead
Creates a new lead. Body: `{ full_name, email, phone }`

### POST /api/scheduling/qualification
Saves qualification responses. Body: `{ lead_id, business_timeline, investment_ready, seen_elyscents, category_interest }`

### POST /api/scheduling/book
Books a meeting. Body: `{ lead_id, slot_id }`
- Creates Google Calendar event
- Sends emails
- Marks slot as booked
- Returns booking confirmation

## 🎓 Learning Resources

- **Supabase Docs**: https://supabase.com/docs
- **Google Calendar API**: https://developers.google.com/calendar
- **Resend Docs**: https://resend.com/docs
- **Next.js App Router**: https://nextjs.org/docs

## 💡 Tips

1. **Testing Emails**: Use Resend's test mode or your own email
2. **Slot Management**: Create a separate admin page to manage slots
3. **Timezone Handling**: Currently uses UTC; consider adding timezone support
4. **Backup**: Regularly backup your Supabase database
5. **Monitoring**: Set up alerts for booking failures

## 🤝 Support

For issues:
1. Check console logs (browser and server)
2. Review Supabase logs
3. Check Resend dashboard
4. Verify Google Calendar API quota

## 📄 License

This is a custom implementation for Ecomsavy. All rights reserved.

---

**Built with ❤️ for Ecomsavy** - A complete, production-ready scheduling system without any paid third-party services.
