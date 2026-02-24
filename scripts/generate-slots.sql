-- Generate available time slots for the next 30 days
-- Run this in Supabase SQL Editor to populate your calendar

DO $$
DECLARE
    v_date DATE;
    v_day INT;
    v_start_date DATE := CURRENT_DATE + 1; -- Start from tomorrow
    v_end_date DATE := CURRENT_DATE + 30;  -- Next 30 days
BEGIN
    -- Loop through each day
    FOR v_day IN 0..30 LOOP
        v_date := v_start_date + v_day;
        
        -- Only add slots for weekdays (Monday = 1, Friday = 5)
        IF EXTRACT(DOW FROM v_date) BETWEEN 1 AND 5 THEN
            
            -- Morning Slots (10:00 AM - 1:00 PM)
            INSERT INTO available_slots (slot_date, start_time, end_time)
            VALUES
                (v_date, '10:00:00', '10:30:00'),
                (v_date, '10:30:00', '11:00:00'),
                (v_date, '11:00:00', '11:30:00'),
                (v_date, '11:30:00', '12:00:00'),
                (v_date, '12:00:00', '12:30:00'),
                (v_date, '12:30:00', '13:00:00')
            ON CONFLICT (slot_date, start_time) DO NOTHING;
            
            -- Afternoon Slots (2:00 PM - 4:30 PM) - Break from 1:00 PM to 2:00 PM
            INSERT INTO available_slots (slot_date, start_time, end_time)
            VALUES
                (v_date, '14:00:00', '14:30:00'),
                (v_date, '14:30:00', '15:00:00'),
                (v_date, '15:00:00', '15:30:00'),
                (v_date, '15:30:00', '16:00:00'),
                (v_date, '16:00:00', '16:30:00')
            ON CONFLICT (slot_date, start_time) DO NOTHING;
            
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Successfully generated slots for the next 30 weekdays!';
END $$;

-- Verify slots were created
SELECT 
    slot_date,
    COUNT(*) as slots_count
FROM available_slots
WHERE slot_date >= CURRENT_DATE AND is_active = TRUE
GROUP BY slot_date
ORDER BY slot_date;

-- View all available slots
SELECT 
    slot_date,
    TO_CHAR(slot_date, 'Day') as day_name,
    start_time,
    end_time,
    is_booked,
    is_active
FROM available_slots
WHERE slot_date >= CURRENT_DATE
ORDER BY slot_date, start_time;
