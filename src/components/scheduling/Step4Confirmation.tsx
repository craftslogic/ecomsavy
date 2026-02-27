"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Check, Mail, Video, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";

interface Step4ConfirmationProps {
  bookingData: {
    meeting_date: string;
    meeting_start_time: string;
    meeting_end_time: string;
    google_meet_link: string;
    lead_name: string;
    lead_email: string;
  };
  onReset: () => void;
}

export function Step4Confirmation({
  bookingData,
  onReset,
}: Step4ConfirmationProps) {
  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const meetingDate = parseISO(bookingData.meeting_date);
  const addToGoogleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ecomsavy Meeting&dates=${bookingData.meeting_date.replace(/-/g, "")}T${bookingData.meeting_start_time.replace(/:/g, "")}00/${bookingData.meeting_date.replace(/-/g, "")}T${bookingData.meeting_end_time.replace(/:/g, "")}00&details=Meeting with Ecomsavy team&location=${encodeURIComponent(bookingData.google_meet_link)}`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          Your Strategy Call is Confirmed!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for booking your call with Ecomsavy. Our team will reach out
          to you on WhatsApp shortly before the meeting to confirm details.
        </p>
      </div>

      {/* Meeting Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg mb-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6">
          <h3 className="text-xl font-semibold mb-1">Meeting Details</h3>
          <p className="text-blue-100">Everything you need for your meeting</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Date & Time
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {format(meetingDate, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {formatTimeDisplay(bookingData.meeting_start_time)} -{" "}
                {formatTimeDisplay(bookingData.meeting_end_time)}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Meeting Link */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Google Meet Link
              </div>
              <a
                href={bookingData.google_meet_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline break-all text-sm"
              >
                {bookingData.google_meet_link}
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Email Confirmation */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Email Confirmation
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                A confirmation email has been sent to{" "}
                <span className="font-medium">{bookingData.lead_email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a
          href={bookingData.google_meet_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button className="w-full py-3 text-base font-semibold bg-green-600 hover:bg-green-700">
            <Video className="w-5 h-5 mr-2" />
            Join Meeting Now
          </Button>
        </a>

        <a
          href={addToGoogleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            variant="outline"
            className="w-full py-3 text-base font-semibold"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Add to Google Calendar
          </Button>
        </a>

        <Button
          onClick={onReset}
          variant="ghost"
          className="w-full py-3 text-base font-semibold"
        >
          Schedule Another Meeting
        </Button>
      </div>

      {/* Reminder Message */}
      <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⏰</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Important Reminder
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-400">
              Please be available at the selected time - we'll message you 10
              minutes before the call begins.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-green-50 border-2 border-green-600 rounded-lg">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Logo */}
          <div className="shrink-0">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
              <Image 
                src="/images/logo-white.png" 
                alt="Ecomsavy" 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Office Info */}
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Our Office Location
              </h3>
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Ecomsavy Headquarters
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Raza Arcade A02, Shadman Town, Karachi
            </p>
          </div>
        </div>
      </div>

    
    </div>
  );
}
