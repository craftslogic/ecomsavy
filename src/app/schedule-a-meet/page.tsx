'use client';

import { useState } from 'react';
import { Step1LeadCapture } from '@/components/scheduling/Step1LeadCapture';
import { Step2Qualification } from '@/components/scheduling/Step2Qualification';
import { Step3CalendarSelection } from '@/components/scheduling/Step3CalendarSelection';
import { Step4Confirmation } from '@/components/scheduling/Step4Confirmation';
import type {
  LeadCaptureFormData,
  QualificationFormData,
  SlotSelectionFormData,
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

  // Step 2: Handle qualification
  const handleQualification = async (data: QualificationFormData) => {
    try {
      setIsProcessing(true);

      // Save qualification data to state
      setFunnelData((prev) => ({ ...prev, qualification: data }));

      // Save qualification to database
      const response = await fetch('/api/scheduling/qualification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: funnelData.leadId,
          business_timeline: data.business_timeline,
          investment_ready: data.investment_ready === 'yes',
          seen_elyscents: data.seen_elyscents === 'yes',
          category_interest: data.category_interest,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save qualification');
      }

      // Move to next step
      setCurrentStep(3);
      toast.success('Qualification saved!');
    } catch (error) {
      console.error('Error in qualification:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save qualification');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 3: Handle slot selection and booking
  const handleSlotSelection = async (slotData: {
    slot_id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
  }) => {
    try {
      setIsProcessing(true);

      // Save slot data to state
      setFunnelData((prev) => ({
        ...prev,
        slot: slotData,
      }));

      // Book the meeting
      const response = await fetch('/api/scheduling/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: funnelData.leadId,
          slot_id: slotData.slot_id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book meeting');
      }

      // Save booking confirmation
      setBookingConfirmation({
        ...result.data,
        lead_name: funnelData.lead?.full_name,
        lead_email: funnelData.lead?.email,
      });

      // Move to confirmation step
      setCurrentStep(4);
      toast.success('Meeting booked successfully!');
    } catch (error) {
      console.error('Error booking meeting:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to book meeting. Please try a different time slot.'
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        {/* Progress Indicator */}
        {currentStep < 4 && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
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
                  {step < 3 && (
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
              <span>Qualification</span>
              <span>Schedule</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <Step1LeadCapture onNext={handleLeadCapture} initialData={funnelData.lead || undefined} />
          )}

          {currentStep === 2 && (
            <Step2Qualification
              onNext={handleQualification}
              onBack={() => setCurrentStep(1)}
              initialData={funnelData.qualification || undefined}
            />
          )}

          {currentStep === 3 && (
            <Step3CalendarSelection
              onNext={handleSlotSelection}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && bookingConfirmation && (
            <Step4Confirmation bookingData={bookingConfirmation} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}