"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadCaptureSchema, type LeadCaptureFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";

interface Step1LeadCaptureProps {
  onNext: (data: LeadCaptureFormData) => void;
  initialData?: LeadCaptureFormData;
}

export function Step1LeadCapture({
  onNext,
  initialData,
}: Step1LeadCaptureProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: initialData,
  });

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        {/* Full Name */}
        <div>
          <input
            id="full_name"
            type="text"
            {...register("full_name")}
            className={`w-full px-3 py-2.5 text-sm rounded-lg border ${
              errors.full_name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="Your full name"
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-3 py-2.5 text-sm rounded-lg border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="Your email address"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className={`w-full px-3 py-2.5 text-sm rounded-lg border ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-700`}
            placeholder="Your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all"
        >
          {isSubmitting ? "Processing..." : "🎯 Get My Free Strategy Call"}
        </Button>

      </form>
    </div>
  );
}
