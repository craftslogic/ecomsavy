# 🚀 Quick Fix - Google Meet Working in 2 Minutes

## The Problem
Service accounts cannot create Google Meet links on **personal Gmail calendars** (`ecomsavy0@gmail.com`).

## The Solution (Pick One)

### ⭐ RECOMMENDED: Use Service Account's Calendar

**1. Edit your `.env` file:**
```bash
# Change this line:
GOOGLE_CALENDAR_ID=ecomsavy0@gmail.com

# To this:
GOOGLE_CALENDAR_ID=primary
```

**2. Restart your server:**
```bash
npm run dev
```

**3. Test a booking - Google Meet will work! ✅**

**4. (Optional) View bookings in your personal calendar:**
- Go to: https://calendar.google.com
- Click "+" next to "Other calendars"
- Select "Subscribe to calendar"
- Enter: `ecomsavy-automation@ecomsavy-scheduler-487611.iam.gserviceaccount.com`
- Done! You'll see all bookings

---

### Alternative: Use a Permanent Meet Link

**1. Create a permanent Google Meet room:**
- Go to: https://meet.google.com
- Click "New meeting" → "Create a meeting for later"
- Copy the link (e.g., `https://meet.google.com/abc-defg-hij`)

**2. Add to your `.env` file:**
```bash
GOOGLE_MEET_LINK=https://meet.google.com/abc-defg-hij
```

**3. Keep calendar as is:**
```bash
GOOGLE_CALENDAR_ID=ecomsavy0@gmail.com
```

**⚠️ Note:** All bookings will use the same Meet link

---

## Test Your Fix

```bash
node scripts/test-google-calendar-setup.js
```

Should show: `✅ Google Meet creation works!`

---

## Need More Details?

See: [GOOGLE_MEET_FIX_DOCUMENTATION.md](./GOOGLE_MEET_FIX_DOCUMENTATION.md)
