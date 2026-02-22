'use client';

import { useEffect, useState } from 'react';
import { format, parseISO, addDays, startOfDay, isBefore } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import type { AvailableSlot } from '@/types/scheduling';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Step3CalendarSelectionProps {
  onNext: (slotData: {
    slot_id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
  }) => void;
  onBack: () => void;
}

export function Step3CalendarSelection({ onNext, onBack }: Step3CalendarSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlotsForDate, setAvailableSlotsForDate] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loadingDates, setLoadingDates] = useState(true);

  // Fetch all available dates on mount to show which dates have slots
  useEffect(() => {
    fetchAvailableDates();
  }, []);

  // Fetch slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchSlotsForDate(selectedDate);
    } else {
      setAvailableSlotsForDate([]);
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  const fetchAvailableDates = async () => {
    try {
      setLoadingDates(true);
      const response = await fetch('/api/scheduling/slots');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch available dates');
      }

      // Extract unique dates from slots
      const dates = new Set(data.data.map((slot: AvailableSlot) => slot.slot_date));
      setAvailableDates(dates);
    } catch (err) {
      console.error('Error fetching available dates:', err);
      setError(err instanceof Error ? err.message : 'Failed to load available dates');
    } finally {
      setLoadingDates(false);
    }
  };

  const fetchSlotsForDate = async (date: Date) => {
    try {
      setLoadingSlots(true);
      setError(null);

      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetch(`/api/scheduling/slots?date=${formattedDate}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch slots');
      }

      setAvailableSlotsForDate(data.data);
      setSelectedSlot(null);
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError(err instanceof Error ? err.message : 'Failed to load available slots');
      setAvailableSlotsForDate([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = async () => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    onNext({
      slot_id: selectedSlot.id,
      slot_date: selectedSlot.slot_date,
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
    });
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Disable dates: past dates, today, tomorrow, and dates without slots
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const dayAfterTomorrow = startOfDay(addDays(today, 2));
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Disable if:
    // 1. Date is before day after tomorrow
    // 2. Date doesn't have available slots
    return isBefore(date, dayAfterTomorrow) || !availableDates.has(formattedDate);
  };

  if (loadingDates) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
          <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error && !selectedDate) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
          <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchAvailableDates}>Try Again</Button>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (availableDates.size === 0 && !loadingDates) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
          <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
          <h3 className="text-xl font-semibold mb-2">No Available Slots</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We currently don't have any available meeting slots. Please check back later or contact us directly.
          </p>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a date and time that works best for you
        </p>
        <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select a Date
          </h3>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rdp-custom"
              classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button:
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors',
                day_selected:
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground font-semibold',
                day_outside: 'text-muted-foreground opacity-50',
                day_disabled: 'text-muted-foreground opacity-50 cursor-not-allowed',
                day_range_middle:
                  'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
              }}
              showOutsideDays
              fromDate={addDays(new Date(), 2)}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-300">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Bookings are available from the day after tomorrow onwards
            </p>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {selectedDate
              ? `Available Times - ${format(selectedDate, 'MMM d, yyyy')}`
              : 'Select a date first'}
          </h3>

          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Please select a date from the calendar to view available time slots
              </p>
            </div>
          ) : loadingSlots ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <Button onClick={() => selectedDate && fetchSlotsForDate(selectedDate)} size="sm">
                Retry
              </Button>
            </div>
          ) : availableSlotsForDate.length === 0 ? (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                No available slots for this date. Please select another date.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {availableSlotsForDate.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const isBooked = slot.is_booked;
                
                return (
                  <button
                    key={slot.id}
                    onClick={() => !isBooked && handleSlotSelect(slot)}
                    disabled={isBooked}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isBooked
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-semibold">
                            {formatTimeDisplay(slot.start_time)} - {formatTimeDisplay(slot.end_time)}
                          </div>
                          {isBooked && (
                            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                              Already Booked
                            </div>
                          )}
                        </div>
                      </div>
                      {isSelected && !isBooked && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                      {isBooked && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Slot Summary */}
      {selectedSlot && selectedDate && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-green-800 dark:text-green-400">
                  Selected Meeting Time:
                </div>
                <div className="text-green-700 dark:text-green-300">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')} at{' '}
                  {formatTimeDisplay(selectedSlot.start_time)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 py-3 text-base font-semibold"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!selectedSlot || isSubmitting}
          className="flex-1 py-3 text-base font-semibold"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Meeting'}
        </Button>
      </div>
    </div>
  );
}

