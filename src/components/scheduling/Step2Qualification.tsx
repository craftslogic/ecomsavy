'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { qualificationSchema, type QualificationFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Step2QualificationProps {
  onNext: (data: QualificationFormData) => void;
  onBack: () => void;
  initialData?: QualificationFormData;
}

export function Step2Qualification({ onNext, onBack, initialData }: Step2QualificationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<QualificationFormData>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: initialData,
  });

  const selectedValues = watch();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Tell Us More</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us understand your business goals
        </p>
        <div className="mt-4 text-sm text-gray-500">Step 2 of 3</div>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        {/* Question 1: Business Timeline */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
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
        </div>

        {/* Question 3: Category Interest */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="block text-lg font-semibold mb-4">
            What category are you interested in?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'skincare', label: 'SkinCare' },
              { value: 'perfume', label: 'Perfume' },
              { value: 'gadgets', label: 'Gadgets ( Chinese Products )' },
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

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 py-3 text-base font-semibold"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 text-base font-semibold"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Scheduling'}
          </Button>
        </div>
      </form>
    </div>
  );
}
