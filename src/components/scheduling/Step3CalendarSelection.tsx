'use client';

import { useEffect, useState } from 'react';
import { format, parseISO, addDays, isSameDay, startOfDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import type { AvailableSlot, GroupedSlots } from '@/types/scheduling';
import { Calendar } from 'lucide-react';

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
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [groupedSlots, setGroupedSlots] = useState<GroupedSlots>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/scheduling/slots');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch slots');
      }

      setAvailableSlots(data.data);

      // Group slots by date
      const grouped = data.data.reduce((acc: GroupedSlots, slot: AvailableSlot) => {
        if (!acc[slot.slot_date]) {
          acc[slot.slot_date] = [];
        }
        acc[slot.slot_date].push(slot);
        return acc;
      }, {});

      setGroupedSlots(grouped);

      // Auto-select first available date
      const dates = Object.keys(grouped).sort();
      if (dates.length > 0 && !selectedDate) {
        setSelectedDate(dates[0]);
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError(err instanceof Error ? err.message : 'Failed to load available slots');
    } finally {
      setLoading(false);
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

  const availableDates = Object.keys(groupedSlots).sort();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
          <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchAvailableSlots}>Try Again</Button>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (availableDates.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
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

  const slotsForSelectedDate = selectedDate ? groupedSlots[selectedDate] : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Select a Time</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a date and time that works best for you
        </p>
        <div className="mt-4 text-sm text-gray-500">Step 3 of 3</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
          <div className="space-y-2">
            {availableDates.map((date) => {
              const dateObj = parseISO(date);
              const isSelected = selectedDate === date;
              const slotCount = groupedSlots[date].length;

              return (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{format(dateObj, 'EEEE, MMMM d')}</div>
                      <div className="text-sm text-gray-500">
                        {slotCount} slot{slotCount !== 1 ? 's' : ''} available
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate
              ? `Available Times for ${format(parseISO(selectedDate), 'MMM d')}`
              : 'Select a date first'}
          </h3>
          {selectedDate && slotsForSelectedDate.length > 0 ? (
            <div className="space-y-2">
              {slotsForSelectedDate.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    className={`w-full text-center p-4 rounded-lg border-2 transition-all font-semibold ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {formatTimeDisplay(slot.start_time)} - {formatTimeDisplay(slot.end_time)}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {selectedDate
                ? 'No slots available for this date'
                : 'Please select a date to view available times'}
            </div>
          )}
        </div>
      </div>

      {/* Selected Slot Summary */}
      {selectedSlot && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-green-800 dark:text-green-400">
                Selected Meeting Time:
              </div>
              <div className="text-green-700 dark:text-green-300">
                {format(parseISO(selectedSlot.slot_date), 'EEEE, MMMM d, yyyy')} at{' '}
                {formatTimeDisplay(selectedSlot.start_time)}
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
