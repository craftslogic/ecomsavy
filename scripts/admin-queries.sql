-- Useful SQL queries for managing the scheduling system

-- ============================================
-- VIEW ALL BOOKINGS
-- ============================================
SELECT 
    l.full_name as client_name,
    l.email,
    l.phone,
    bm.meeting_date,
    bm.meeting_start_time,
    bm.meeting_end_time,
    bm.google_meet_link,
    bm.status,
    bm.created_at as booked_at,
    qr.business_timeline,
    qr.investment_ready,
    qr.category_interest
FROM booked_meetings bm
JOIN leads l ON bm.lead_id = l.id
LEFT JOIN qualification_responses qr ON l.id = qr.lead_id
ORDER BY bm.meeting_date DESC, bm.meeting_start_time DESC;

-- ============================================
-- VIEW UPCOMING MEETINGS (NEXT 7 DAYS)
-- ============================================
SELECT 
    l.full_name,
    l.email,
    bm.meeting_date,
    bm.meeting_start_time,
    bm.google_meet_link,
    bm.status
FROM booked_meetings bm
JOIN leads l ON bm.lead_id = l.id
WHERE bm.meeting_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 7
  AND bm.status = 'confirmed'
ORDER BY bm.meeting_date, bm.meeting_start_time;

-- ============================================
-- COUNT AVAILABLE SLOTS BY DATE
-- ============================================
SELECT 
    slot_date,
    TO_CHAR(slot_date, 'Day, Mon DD, YYYY') as formatted_date,
    COUNT(*) as available_slots
FROM available_slots
WHERE is_booked = FALSE 
  AND is_active = TRUE 
  AND slot_date >= CURRENT_DATE
GROUP BY slot_date
ORDER BY slot_date;

-- ============================================
-- FIND SLOTS WITH NO BOOKINGS (AVAILABLE)
-- ============================================
SELECT 
    slot_date,
    start_time,
    end_time,
    TO_CHAR(slot_date, 'Day') as day_name
FROM available_slots
WHERE is_booked = FALSE 
  AND is_active = TRUE 
  AND slot_date >= CURRENT_DATE
ORDER BY slot_date, start_time
LIMIT 20;

-- ============================================
-- CONVERSION FUNNEL ANALYSIS
-- ============================================
SELECT 
    'Total Leads' as stage,
    COUNT(*) as count
FROM leads

UNION ALL

SELECT 
    'Completed Qualification' as stage,
    COUNT(*) as count
FROM qualification_responses

UNION ALL

SELECT 
    'Booked Meeting' as stage,
    COUNT(*) as count
FROM booked_meetings;

-- ============================================
-- LEAD SOURCE ANALYSIS (if you add tracking)
-- ============================================
SELECT 
    qr.business_timeline,
    qr.investment_ready,
    qr.category_interest,
    COUNT(*) as count,
    COUNT(bm.id) as booked_meetings
FROM qualification_responses qr
LEFT JOIN booked_meetings bm ON qr.lead_id = bm.lead_id
GROUP BY qr.business_timeline, qr.investment_ready, qr.category_interest
ORDER BY count DESC;

-- ============================================
-- CANCEL A BOOKING (MANUAL)
-- ============================================
-- First, find the booking ID
SELECT id, meeting_date, meeting_start_time 
FROM booked_meetings 
WHERE status = 'confirmed' 
ORDER BY meeting_date DESC;

-- Then update the status and free the slot
-- Replace 'BOOKING_ID_HERE' with actual booking ID
/*
BEGIN;

UPDATE booked_meetings 
SET status = 'cancelled' 
WHERE id = 'BOOKING_ID_HERE';

UPDATE available_slots 
SET is_booked = FALSE 
WHERE id = (
    SELECT slot_id 
    FROM booked_meetings 
    WHERE id = 'BOOKING_ID_HERE'
);

COMMIT;
*/

-- ============================================
-- DEACTIVATE SPECIFIC DATE SLOTS
-- ============================================
-- Use this to block out dates (e.g., holidays)
/*
UPDATE available_slots 
SET is_active = FALSE 
WHERE slot_date = '2026-12-25';  -- Christmas, for example
*/

-- ============================================
-- REACTIVATE SLOTS
-- ============================================
/*
UPDATE available_slots 
SET is_active = TRUE 
WHERE slot_date = '2026-02-10';
*/

-- ============================================
-- DELETE OLD CANCELLED BOOKINGS (CLEANUP)
-- ============================================
-- Delete bookings older than 90 days with cancelled status
/*
DELETE FROM booked_meetings 
WHERE status = 'cancelled' 
  AND meeting_date < CURRENT_DATE - INTERVAL '90 days';
*/

-- ============================================
-- GET STATISTICS
-- ============================================
SELECT 
    'Total Leads' as metric,
    COUNT(*)::TEXT as value
FROM leads

UNION ALL

SELECT 
    'Qualification Completion Rate',
    ROUND(
        (COUNT(qr.id)::DECIMAL / COUNT(DISTINCT l.id) * 100), 2
    )::TEXT || '%'
FROM leads l
LEFT JOIN qualification_responses qr ON l.id = qr.lead_id

UNION ALL

SELECT 
    'Booking Conversion Rate',
    ROUND(
        (COUNT(bm.id)::DECIMAL / COUNT(DISTINCT l.id) * 100), 2
    )::TEXT || '%'
FROM leads l
LEFT JOIN booked_meetings bm ON l.id = bm.lead_id

UNION ALL

SELECT 
    'Total Bookings',
    COUNT(*)::TEXT
FROM booked_meetings

UNION ALL

SELECT 
    'Confirmed Meetings',
    COUNT(*)::TEXT
FROM booked_meetings
WHERE status = 'confirmed';

-- ============================================
-- VIEW COMPLETE LEAD JOURNEY
-- ============================================
-- Replace 'LEAD_EMAIL_HERE' with actual email
/*
SELECT 
    l.full_name,
    l.email,
    l.phone,
    l.created_at as lead_created,
    qr.business_timeline,
    qr.investment_ready,
    qr.category_interest,
    qr.created_at as qualification_completed,
    bm.meeting_date,
    bm.meeting_start_time,
    bm.google_meet_link,
    bm.status as meeting_status,
    bm.created_at as booking_created
FROM leads l
LEFT JOIN qualification_responses qr ON l.id = qr.lead_id
LEFT JOIN booked_meetings bm ON l.id = bm.lead_id
WHERE l.email = 'LEAD_EMAIL_HERE';
*/
