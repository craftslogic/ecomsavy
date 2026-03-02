'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { qualificationWithContactSchema, type QualificationWithContactFormData } from '@/lib/validation';
import { format, addDays, startOfDay, isBefore } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import type { AvailableSlot } from '@/types/scheduling';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Step2QualificationAndCalendarProps {
  onNext: (data: QualificationWithContactFormData & {
    slot_id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
  }) => void;
  onBack: () => void;
  initialData?: Partial<QualificationWithContactFormData>;
}

export function Step2QualificationAndCalendar({
  onNext,
  onBack,
  initialData,
}: Step2QualificationAndCalendarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<QualificationWithContactFormData>({
    resolver: zodResolver(qualificationWithContactSchema),
    defaultValues: initialData,
  });

  const selectedValues = watch();

  // Calendar state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlotsForDate, setAvailableSlotsForDate] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loadingDates, setLoadingDates] = useState(true);

  // Fetch all available dates on mount
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

      // Extract unique dates from available (not booked) slots
      const dates = new Set<string>(
        data.data
          .filter((slot: AvailableSlot) => !slot.is_booked)
          .map((slot: AvailableSlot) => slot.slot_date as string)
      );
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
    if (!slot.is_booked) {
      setSelectedSlot(slot);
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const dayAfterTomorrow = startOfDay(addDays(today, 2));
    const formattedDate = format(date, 'yyyy-MM-dd');

    return isBefore(date, dayAfterTomorrow) || !availableDates.has(formattedDate);
  };

  const onSubmit = (data: QualificationWithContactFormData) => {
    if (!selectedSlot) {
      setError('Please select a meeting time');
      return;
    }

    setIsSubmitting(true);
    onNext({
      ...data,
      slot_id: selectedSlot.id,
      slot_date: selectedSlot.slot_date,
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information - Editable Fields */}
        <div className=" p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">
            Your Contact Information <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('full_name')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your name"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-500">{errors.full_name.message}</p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Question 1: Business Timeline */}
        <div className=" p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="block text-lg font-semibold mb-4">
            How soon are you willing to open your Ecommerce business?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'now', label: 'Now' },
              { value: 'later', label: 'Later' },
              { value: 'never', label: 'Never' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedValues.business_timeline === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('business_timeline')}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-base">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.business_timeline && (
            <p className="mt-2 text-sm text-red-500">{errors.business_timeline.message}</p>
          )}
        </div>

        {/* Question 2: Investment Ready */}
        <div className=" p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="block text-lg font-semibold mb-4">
            Do you have investment ready to launch your brand?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedValues.investment_ready === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('investment_ready')}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-base">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.investment_ready && (
            <p className="mt-2 text-sm text-red-500">{errors.investment_ready.message}</p>
          )}
          {selectedValues.investment_ready === 'no' && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                Thanks for your interest. Ecomsavy brand launches require investment. We&apos;ll keep you posted when no-investment offers are available.
              </p>
            </div>
          )}
        </div>

        {/* Question 3: Category Interest */}
        <div className=" p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="block text-lg font-semibold mb-4">
            What category are you interested in?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'skin_care', label: 'Skin Care' },
              { value: 'beard_oil', label: 'Beard Oil' },
              { value: 'toys', label: 'Toys' },
              { value: 'home_kitchen', label: 'Home & Kitchen' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedValues.category_interest === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('category_interest')}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-base">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.category_interest && (
            <p className="mt-2 text-sm text-red-500">{errors.category_interest.message}</p>
          )}
        </div>

        {/* Calendar and Time Selection - Column Layout */}
        <div className=" p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6">
            Select Your Meeting Time <span className="text-red-500">*</span>
          </h3>

          {loadingDates ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Calendar Section */}
              <div>
                <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select a Date
                </h4>
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
              <div>
                <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {selectedDate
                    ? `Available Times - ${format(selectedDate, 'MMM d, yyyy')}`
                    : 'Select a date to see available times'}
                </h4>

                {!selectedDate ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Please select a date from the calendar above
                    </p>
                  </div>
                ) : loadingSlots ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  </div>
                ) : availableSlotsForDate.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-yellow-300 dark:border-yellow-600 rounded-lg">
                    <XCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No available slots for this date. Please select another date.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                    {availableSlotsForDate.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      const isBooked = slot.is_booked;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleSlotSelect(slot)}
                          disabled={isBooked}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isBooked
                              ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-semibold text-sm">
                              {formatTimeDisplay(slot.start_time)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimeDisplay(slot.end_time)}
                            </div>
                            {isBooked && (
                              <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">
                                Booked
                              </div>
                            )}
                            {isSelected && !isBooked && (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mt-1" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Slot Summary */}
        {selectedSlot && selectedDate && (
          <div className="p-4 bg-green-50 border-2 border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-green-800 dark:text-green-400">
                  Selected Meeting Time:
                </div>
                <div className="text-green-700 dark:text-green-300">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')} at{' '}
                  {formatTimeDisplay(selectedSlot.start_time)} - {formatTimeDisplay(selectedSlot.end_time)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
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
            type="submit"
            disabled={isSubmitting || !selectedSlot || selectedValues.investment_ready === 'no'}
            className="flex-1 py-3 text-base font-semibold"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Meeting'}
          </Button>
        </div>
      </form>
    </div>
  );
}
