import { z } from 'zod';

// Lead Capture Form Schema
export const leadCaptureSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(50, 'Phone number is too long')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
});

// Qualification Form Schema
export const qualificationSchema = z.object({
  business_timeline: z.enum(['now', 'later', 'never'], {
    required_error: 'Please select when you plan to open your business',
  }),
  investment_ready: z.enum(['yes', 'no'], {
    required_error: 'Please specify if you have investment ready',
  }),
  seen_elyscents: z.enum(['yes', 'no'], {
    required_error: 'Please specify if you have seen Elyscents.pk',
  }),
  category_interest: z.enum(['perfume', 'beard_oil', 'pain_relief_oils'], {
    required_error: 'Please select a category',
  }),
});

// Slot Selection Schema
export const slotSelectionSchema = z.object({
  slot_id: z.string().uuid('Invalid slot selection'),
  slot_date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
});

// Export types
export type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;
export type QualificationFormData = z.infer<typeof qualificationSchema>;
export type SlotSelectionFormData = z.infer<typeof slotSelectionSchema>;
