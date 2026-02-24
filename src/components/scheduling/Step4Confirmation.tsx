'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Check, Mail, Video } from 'lucide-react';
import { format, parseISO } from 'date-fns';

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

export function Step4Confirmation({ bookingData, onReset }: Step4ConfirmationProps) {
  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const meetingDate = parseISO(bookingData.meeting_date);
  const addToGoogleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ecomsavy Meeting&dates=${bookingData.meeting_date.replace(/-/g, '')}T${bookingData.meeting_start_time.replace(/:/g, '')}00/${bookingData.meeting_date.replace(/-/g, '')}T${bookingData.meeting_end_time.replace(/:/g, '')}00&details=Meeting with Ecomsavy team&location=${encodeURIComponent(bookingData.google_meet_link)}`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Meeting Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your meeting has been successfully scheduled
        </p>
      </div>

       {/* Reminder Message */}
      <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⏰</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Important Reminder
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-400">
              Please be available at the selected time - we'll message you 10 minutes before the call begins.
            </p>
          </div>
        </div>
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
              <div className="font-semibold text-gray-900 dark:text-gray-100">Date & Time</div>
              <div className="text-gray-600 dark:text-gray-400">
                {format(meetingDate, 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {formatTimeDisplay(bookingData.meeting_start_time)} -{' '}
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
                A confirmation email has been sent to{' '}
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

        <a href={addToGoogleCalendarUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
          <Button variant="outline" className="w-full py-3 text-base font-semibold">
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

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          What happens next?
        </h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
          <li>• You'll receive a confirmation email with all details</li>
          <li>• A calendar invite has been added to your email</li>
          <li>• You can join the meeting using the Google Meet link above</li>
          <li>• Our team will be ready to discuss your business goals</li>
        </ul>
      </div>

     

      {/* Support Contact */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Need to reschedule or have questions?{' '}
          <a href="/contact-us" className="text-blue-600 hover:text-blue-700 underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
