'use client';

import { useState } from 'react';
import { Step1LeadCapture } from '@/components/scheduling/Step1LeadCapture';
import { Step2QualificationAndCalendar } from '@/components/scheduling/Step2QualificationAndCalendar';
import { Step4Confirmation } from '@/components/scheduling/Step4Confirmation';
import type {
  LeadCaptureFormData,
  QualificationFormData,
  QualificationWithContactFormData,
  SchedulingFunnelData,
} from '@/types/scheduling';
import { toast } from 'sonner';

export default function ScheduleAMeetPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [funnelData, setFunnelData] = useState<SchedulingFunnelData>({
    lead: null,
    qualification: null,
    slot: null,
  });
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Handle lead capture
  const handleLeadCapture = async (data: LeadCaptureFormData) => {
    try {
      setIsProcessing(true);

      // Save lead data to state
      setFunnelData((prev) => ({ ...prev, lead: data }));

      // Create lead in database
      const response = await fetch('/api/scheduling/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create lead');
      }

      // Save lead ID for later use
      setFunnelData((prev) => ({ ...prev, leadId: result.data.id }));

      // Move to next step
      setCurrentStep(2);
      toast.success('Information saved!');
    } catch (error) {
      console.error('Error in lead capture:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save information');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2: Handle qualification and slot selection combined
  const handleQualificationAndSlotSelection = async (
    data: QualificationWithContactFormData & {
      slot_id: string;
      slot_date: string;
      start_time: string;
      end_time: string;
    }
  ) => {
    try {
      setIsProcessing(true);

      // Extract contact info, qualification, and slot data
      const {
        slot_id,
        slot_date,
        start_time,
        end_time,
        full_name,
        email,
        phone,
        ...qualificationData
      } = data;

      const contactData = { full_name, email, phone };

      // Update or create lead in database
      const leadResponse = await fetch('/api/scheduling/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const leadResult = await leadResponse.json();

      if (!leadResponse.ok) {
        throw new Error(leadResult.error || 'Failed to save contact information');
      }

      const leadId = leadResult.data.id;

      // Save all data to state
      setFunnelData((prev) => ({
        ...prev,
        lead: contactData,
        leadId: leadId,
        qualification: qualificationData,
        slot: { slot_id, slot_date, start_time, end_time },
      }));

      // Save qualification to database
      const qualificationResponse = await fetch('/api/scheduling/qualification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          business_timeline: qualificationData.business_timeline,
          investment_ready: qualificationData.investment_ready === 'yes',
          category_interest: qualificationData.category_interest,
        }),
      });

      const qualificationResult = await qualificationResponse.json();

      if (!qualificationResponse.ok) {
        throw new Error(qualificationResult.error || 'Failed to save qualification');
      }

      // Book the meeting
      const bookingResponse = await fetch('/api/scheduling/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          slot_id: slot_id,
        }),
      });

      const bookingResult = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(bookingResult.error || 'Failed to book meeting');
      }

      // Save booking confirmation
      setBookingConfirmation({
        ...bookingResult.data,
        lead_name: full_name,
        lead_email: email,
      });

      // Move to confirmation step
      setCurrentStep(3);
      toast.success('Meeting booked successfully!');
    } catch (error) {
      console.error('Error in booking process:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to complete booking. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset the funnel
  const handleReset = () => {
    setCurrentStep(1);
    setFunnelData({
      lead: null,
      qualification: null,
      slot: null,
    });
    setBookingConfirmation(null);
  };

  return (
    <div className="min-h-screen bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm py-12 px-4">
      <div className="container mx-auto">
        {/* Progress Indicator */}
        {currentStep < 3 && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    } transition-all`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step
                          ? 'bg-blue-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } transition-all`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
              <span>Your Details</span>
              <span>Qualification & Schedule</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <Step1LeadCapture onNext={handleLeadCapture} initialData={funnelData.lead || undefined} />
          )}

          {currentStep === 2 && (
            <Step2QualificationAndCalendar
              onNext={handleQualificationAndSlotSelection}
              onBack={() => setCurrentStep(1)}
              initialData={
                funnelData.lead && funnelData.qualification
                  ? {
                      ...funnelData.lead,
                      ...funnelData.qualification,
                    }
                  : funnelData.lead || undefined
              }
            />
          )}

          {currentStep === 3 && bookingConfirmation && (
            <Step4Confirmation bookingData={bookingConfirmation} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}