# Supabase Setup Quick Guide

Follow these steps to set up your scheduling system in Supabase.

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard at https://supabase.com/dashboard
2. Click on your project
3. In the left sidebar, click on **SQL Editor**

## Step 2: Create Database Schema

1. In the SQL Editor, click **New Query**
2. Open the file `SUPABASE_SCHEMA.sql` from your project
3. Copy the **ENTIRE** contents of that file
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)

This will create:
- ✅ All 4 tables (leads, qualification_responses, available_slots, booked_meetings)
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Function for atomic slot booking
- ✅ Sample data for the next 7 days

## Step 3: Generate Time Slots (30-Day Schedule)

1. In the SQL Editor, click **New Query** again
2. Open the file `scripts/generate-slots.sql` from your project
3. Copy the **ENTIRE** contents
4. Paste it into the SQL Editor
5. Click **Run**

This will generate:
- ✅ Time slots for the next 30 weekdays
- ✅ 10:00 AM - 4:30 PM schedule
- ✅ 30-minute slots
- ✅ 1:00 PM - 2:00 PM lunch break excluded

## Step 4: Get Your Supabase Credentials

1. In the left sidebar, click on **Project Settings** (gear icon)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL** - Copy this
   - **Project API keys** - Copy the **anon/public** key AND the **service_role** key

## Step 5: Configure Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Google Calendar (Optional - for Google Meet integration)
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_CALENDAR_ID=your_calendar_id
```

3. Replace the placeholder values with your actual Supabase credentials

## Step 6: Verify Setup

1. In Supabase SQL Editor, run this query to check your data:

```sql
-- Check available slots
SELECT 
    slot_date,
    COUNT(*) as slots_count
FROM available_slots
WHERE slot_date >= CURRENT_DATE AND is_active = TRUE
GROUP BY slot_date
ORDER BY slot_date;
```

You should see dates with 11 slots each (6 morning + 5 afternoon).

## Step 7: Test Your Application

1. Start your development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000/schedule-a-meet`
3. Fill out the form and test booking a slot

## Admin Queries (Optional)

You can use the queries in `scripts/admin-queries.sql` to:
- View all bookings
- Check upcoming meetings
- See conversion funnel stats
- Cancel bookings
- Deactivate/reactivate time slots

## Database Schema Overview

Your database now has:

### Tables:
1. **leads** - Contact information
2. **qualification_responses** - Answers to qualifying questions
3. **available_slots** - Available time slots for booking
4. **booked_meetings** - Confirmed bookings with Google Meet links

### Questions Asked:
1. How soon are you willing to open your Ecommerce business? (Now/Later/Never)
2. Do you have investment ready to launch your brand? (Yes/No)
3. What category are you interested in? (SkinCare/Perfume/Gadgets)

### Time Slots:
- **Weekdays only** (Monday - Friday)
- **10:00 AM - 1:00 PM** (6 slots of 30 mins each)
- **2:00 PM - 4:30 PM** (5 slots of 30 mins each)
- **1:00 PM - 2:00 PM** = Lunch Break (no slots)
- **Total: 11 slots per day**

## Troubleshooting

### Issue: No slots showing up
**Solution:** Run the `generate-slots.sql` script again

### Issue: "Failed to fetch slots" error
**Solution:** Check your `.env.local` file has correct Supabase credentials

### Issue: RLS policy errors
**Solution:** Make sure you're using the **service_role** key in your backend API routes

### Issue: Need to regenerate slots for future dates
**Solution:** 
1. Open `scripts/generate-slots.sql`
2. Change the date range if needed
3. Run it in SQL Editor

## Next Steps

1. ✅ Configure Google Calendar integration (optional - see `FIX_GOOGLE_CALENDAR.md`)
2. ✅ Customize email notifications (see `src/lib/email.ts`)
3. ✅ Add more time slots or modify schedule as needed
4. ✅ Deploy your application

---

**Need help?** Check these files:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README_SCHEDULING.md` - Scheduling system documentation
- `admin-queries.sql` - Useful database queries
