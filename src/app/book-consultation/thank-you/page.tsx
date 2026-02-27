"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Step4Confirmation } from "@/components/scheduling/Step4Confirmation";
import { toast } from "sonner";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const storedBookingData = localStorage.getItem('bookingData');
    
    if (!storedBookingData) {
      // If no booking data, redirect back to schedule-a-meet
      toast.error('No booking found. Please complete the booking process.');
      router.push('/schedule-a-meet');
      return;
    }

    setBookingData(JSON.parse(storedBookingData));
    setIsLoading(false);
  }, [router]);

  const handleReset = () => {
    // Clear all localStorage data
    localStorage.removeItem('leadData');
    localStorage.removeItem('bookingData');
    
    // Redirect to schedule-a-meet page
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

  if (!bookingData) {
    return null;
  }

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pt-24 md:pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Step4Confirmation bookingData={bookingData} onReset={handleReset} />
      </div>
    </main>
  );
}
