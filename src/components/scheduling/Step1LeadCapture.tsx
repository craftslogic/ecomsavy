'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadCaptureSchema, type LeadCaptureFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';

interface Step1LeadCaptureProps {
  onNext: (data: LeadCaptureFormData) => void;
  initialData?: LeadCaptureFormData;
}

export function Step1LeadCapture({ onNext, initialData }: Step1LeadCaptureProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: initialData,
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Let's Get Started</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us a bit about yourself
        </p>
        <div className="mt-4 text-sm text-gray-500">Step 1 of 3</div>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            type="text"
            {...register('full_name')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.full_name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-base font-semibold"
        >
          {isSubmitting ? 'Processing...' : 'Continue'}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Your information is secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
