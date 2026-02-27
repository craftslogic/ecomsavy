"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Step2QualificationAndCalendar } from "@/components/scheduling/Step2QualificationAndCalendar";
import { toast } from "sonner";
import type { QualificationWithContactFormData } from "@/types/scheduling";

export default function ThankYouPage() {
  const router = useRouter();
  const [leadData, setLeadData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve lead data from localStorage
    const storedLeadData = localStorage.getItem('leadData');
    
    if (!storedLeadData) {
      // If no lead data, redirect back to schedule-a-meet
      toast.error('Please fill in your information first');
      router.push('/schedule-a-meet');
      return;
    }

    setLeadData(JSON.parse(storedLeadData));
    setIsLoading(false);
  }, [router]);

  const handleQualificationAndSlotSelection = async (
    data: QualificationWithContactFormData & {
      slot_id: string;
      slot_date: string;
      start_time: string;
      end_time: string;
    }
  ) => {
    try {
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

      const leadId = leadData.leadId;

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

      // Store booking data in localStorage
      localStorage.setItem('bookingData', JSON.stringify({
        ...bookingResult.data,
        lead_name: full_name,
        lead_email: email,
      }));

      toast.success('Meeting booked successfully!');
      
      // Redirect to final confirmation page
      router.push('/book-consultation/thank-you');
    } catch (error) {
      console.error('Error in booking process:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to complete booking. Please try again.'
      );
    }
  };

  const handleBack = () => {
    router.push('/schedule-a-meet');
  };

  if (isLoading) {
    return (
      <main className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!leadData) {
    return null;
  }

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pt-24 md:pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Book Your 1-on-1 Brand Strategy Call
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Get personalized guidance from the Elevate51 team and discover how to launch your ecommerce brand in 30–60 days.
          </p>
        </div>

        <div className="bg-white border-2 border-green-600 rounded-xl shadow-lg p-6 md:p-8">
          <Step2QualificationAndCalendar
            onNext={handleQualificationAndSlotSelection}
            onBack={handleBack}
            initialData={leadData}
          />
        </div>
      </div>
    </main>
  );
}
