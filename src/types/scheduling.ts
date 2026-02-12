// Type definitions for the scheduling system

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface QualificationResponse {
  id: string;
  lead_id: string;
  business_timeline: 'now' | 'later' | 'never';
  investment_ready: boolean;
  seen_elyscents: boolean;
  category_interest: 'perfume' | 'beard_oil' | 'pain_relief_oils';
  created_at: string;
}

export interface AvailableSlot {
  id: string;
  slot_date: string; // YYYY-MM-DD format
  start_time: string; // HH:MM:SS format
  end_time: string; // HH:MM:SS format
  is_booked: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookedMeeting {
  id: string;
  lead_id: string;
  slot_id: string;
  meeting_date: string;
  meeting_start_time: string;
  meeting_end_time: string;
  google_calendar_event_id: string | null;
  google_meet_link: string | null;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  created_at: string;
  updated_at: string;
}

// Form data types for each step
export interface LeadCaptureFormData {
  full_name: string;
  email: string;
  phone: string;
}

export interface QualificationFormData {
  business_timeline: 'now' | 'later' | 'never';
  investment_ready: 'yes' | 'no';
  seen_elyscents: 'yes' | 'no';
  category_interest: 'perfume' | 'beard_oil' | 'pain_relief_oils';
}

export interface SlotSelectionFormData {
  slot_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
}

// Combined data for the entire funnel
export interface SchedulingFunnelData {
  lead: LeadCaptureFormData | null;
  qualification: QualificationFormData | null;
  slot: SlotSelectionFormData | null;
  leadId?: string; // Set after lead is created in DB
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingConfirmationData {
  booking_id: string;
  lead_id: string;
  meeting_date: string;
  meeting_start_time: string;
  meeting_end_time: string;
  google_meet_link: string;
  status: string;
}

// Grouped slots for calendar display
export interface GroupedSlots {
  [date: string]: AvailableSlot[];
}
