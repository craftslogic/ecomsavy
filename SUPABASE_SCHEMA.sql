-- Supabase Database Schema for Lead Qualification & Meeting Scheduling System
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. LEADS TABLE
-- ============================================
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index for quick lookups
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- 2. QUALIFICATION RESPONSES TABLE
-- ============================================
CREATE TABLE qualification_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Question answers
    business_timeline VARCHAR(50) NOT NULL CHECK (business_timeline IN ('now', 'later', 'never')),
    investment_ready BOOLEAN NOT NULL,
    category_interest VARCHAR(50) NOT NULL CHECK (category_interest IN ('skin_care', 'beard_oil', 'toys', 'home_kitchen')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    -- Ensure one qualification per lead
    UNIQUE(lead_id)
);

CREATE INDEX idx_qualification_lead_id ON qualification_responses(lead_id);

-- ============================================
-- 3. AVAILABLE TIME SLOTS TABLE
-- ============================================
CREATE TABLE available_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Slot timing
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    
    -- Status management
    is_booked BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    -- Prevent duplicate slots
    UNIQUE(slot_date, start_time)
);

-- Indexes for efficient queries
CREATE INDEX idx_available_slots_date ON available_slots(slot_date);
CREATE INDEX idx_available_slots_booked ON available_slots(is_booked, is_active);

-- ============================================
-- 4. BOOKED MEETINGS TABLE
-- ============================================
CREATE TABLE booked_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    slot_id UUID NOT NULL REFERENCES available_slots(id) ON DELETE RESTRICT,
    
    -- Meeting details
    meeting_date DATE NOT NULL,
    meeting_start_time TIME NOT NULL,
    meeting_end_time TIME NOT NULL,
    
    -- Google Calendar integration
    google_calendar_event_id VARCHAR(255),
    google_meet_link TEXT,
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    -- Prevent double booking
    UNIQUE(slot_id)
);

-- Indexes
CREATE INDEX idx_booked_meetings_lead_id ON booked_meetings(lead_id);
CREATE INDEX idx_booked_meetings_slot_id ON booked_meetings(slot_id);
CREATE INDEX idx_booked_meetings_date ON booked_meetings(meeting_date DESC);
CREATE INDEX idx_booked_meetings_status ON booked_meetings(status);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_available_slots_updated_at BEFORE UPDATE ON available_slots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booked_meetings_updated_at BEFORE UPDATE ON booked_meetings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Atomic Slot Booking
-- ============================================
-- This function ensures no race conditions when booking a slot
CREATE OR REPLACE FUNCTION book_meeting_slot(
    p_lead_id UUID,
    p_slot_id UUID,
    p_google_event_id VARCHAR,
    p_google_meet_link TEXT
) RETURNS JSON AS $$
DECLARE
    v_slot RECORD;
    v_booking_id UUID;
    v_result JSON;
BEGIN
    -- Lock the slot row for update
    SELECT * INTO v_slot 
    FROM available_slots 
    WHERE id = p_slot_id 
    FOR UPDATE;
    
    -- Check if slot exists and is available
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Slot not found'
        );
    END IF;
    
    IF v_slot.is_booked THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Slot is already booked'
        );
    END IF;
    
    IF NOT v_slot.is_active THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Slot is not active'
        );
    END IF;
    
    -- Mark slot as booked
    UPDATE available_slots 
    SET is_booked = TRUE 
    WHERE id = p_slot_id;
    
    -- Create booking record
    INSERT INTO booked_meetings (
        lead_id,
        slot_id,
        meeting_date,
        meeting_start_time,
        meeting_end_time,
        google_calendar_event_id,
        google_meet_link,
        status
    ) VALUES (
        p_lead_id,
        p_slot_id,
        v_slot.slot_date,
        v_slot.start_time,
        v_slot.end_time,
        p_google_event_id,
        p_google_meet_link,
        'confirmed'
    ) RETURNING id INTO v_booking_id;
    
    -- Return success response
    RETURN json_build_object(
        'success', true,
        'booking_id', v_booking_id,
        'meeting_date', v_slot.slot_date,
        'meeting_start_time', v_slot.start_time,
        'meeting_end_time', v_slot.end_time
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- ============================================
-- Enable RLS on tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualification_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE booked_meetings ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access to available slots
CREATE POLICY "Anyone can view available slots"
    ON available_slots FOR SELECT
    USING (is_active = TRUE);

-- Policy: Service role can do everything
CREATE POLICY "Service role has full access to leads"
    ON leads FOR ALL
    USING (true);

CREATE POLICY "Service role has full access to qualifications"
    ON qualification_responses FOR ALL
    USING (true);

CREATE POLICY "Service role has full access to slots"
    ON available_slots FOR ALL
    USING (true);

CREATE POLICY "Service role has full access to bookings"
    ON booked_meetings FOR ALL
    USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Insert some available slots for the next 7 days
DO $$
DECLARE
    v_date DATE;
    v_day INT;
BEGIN
    FOR v_day IN 1..7 LOOP
        v_date := CURRENT_DATE + v_day;
        
        -- Only add slots for weekdays
        IF EXTRACT(DOW FROM v_date) BETWEEN 1 AND 5 THEN
            -- Morning slots (10:00 AM - 1:00 PM)
            INSERT INTO available_slots (slot_date, start_time, end_time) VALUES
                (v_date, '10:00:00', '10:30:00'),
                (v_date, '10:30:00', '11:00:00'),
                (v_date, '11:00:00', '11:30:00'),
                (v_date, '11:30:00', '12:00:00'),
                (v_date, '12:00:00', '12:30:00'),
                (v_date, '12:30:00', '13:00:00');
            
            -- Afternoon slots (2:00 PM - 4:30 PM) - Break from 1 PM to 2 PM
            INSERT INTO available_slots (slot_date, start_time, end_time) VALUES
                (v_date, '14:00:00', '14:30:00'),
                (v_date, '14:30:00', '15:00:00'),
                (v_date, '15:00:00', '15:30:00'),
                (v_date, '15:30:00', '16:00:00'),
                (v_date, '16:00:00', '16:30:00');
        END IF;
    END LOOP;
END $$;

-- ============================================
-- VIEWS FOR EASIER QUERYING
-- ============================================

-- View: Complete lead information with qualification and booking
CREATE OR REPLACE VIEW v_leads_complete AS
SELECT 
    l.id as lead_id,
    l.full_name,
    l.email,
    l.phone,
    l.created_at as lead_created_at,
    
    -- Qualification data
    qr.business_timeline,
    qr.investment_ready,
    qr.category_interest,
    
    -- Booking data
    bm.id as booking_id,
    bm.meeting_date,
    bm.meeting_start_time,
    bm.meeting_end_time,
    bm.google_meet_link,
    bm.status as meeting_status,
    bm.created_at as booking_created_at
    
FROM leads l
LEFT JOIN qualification_responses qr ON l.id = qr.lead_id
LEFT JOIN booked_meetings bm ON l.id = bm.lead_id;

-- View: Available slots (not booked, active, future dates only)
CREATE OR REPLACE VIEW v_available_slots AS
SELECT 
    id,
    slot_date,
    start_time,
    end_time,
    created_at
FROM available_slots
WHERE is_booked = FALSE 
  AND is_active = TRUE 
  AND slot_date >= CURRENT_DATE
ORDER BY slot_date, start_time;
