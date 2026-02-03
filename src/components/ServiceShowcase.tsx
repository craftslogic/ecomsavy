'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeUp, SlideUp } from './AnimatedSection';

interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
}

const services: Service[] = [
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    image: '/images/services/1.jpg',
    description: 'We run ads that work. From Meta and Google to TikTok, our campaigns are backed by real data — not guesswork. We test, optimize, and keep your returns in check so your budget goes where it matters.',
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    image: '/images/services/2.jpg',
    description: 'We create content your audience actually connects with — from product photos and reels to creatives for ads. The goal? Make you look good and help you sell better',
  },
  {
    id: 'daraz-account',
    title: 'Daraz Account Management',
    image: '/images/services/3.jpg',
    description: 'We don’t just manage your Daraz account — we grow it. From product uploads to ad campaigns and performance tracking, we work to increase your sales and improve store performance month over month.',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    image: '/images/services/4.jpg',
    description: 'Need a powerful online store? We build fast, clean, and mobile-friendly websites using Shopify, WordPress, or custom solutions — designed to drive traffic and turn visitors into paying customers.',
  },
  {
    id: '3pl-services',
    title: '3PL Services',
    image: '/images/services/5.jpg',
    description: 'Managing inventory and shipping can drain your time. Our warehousing service handles product storage, order fulfillment, and nationwide dispatch — all with accuracy and care.',
  },
];

export default function ServiceShowcase() {
  const [activeService, setActiveService] = useState<string>('daraz-account');

  const currentService = services.find((s) => s.id === activeService);

  return (
    <section className="min-h-screen bg-background py-12 md:py-20 px-4 sm:px-6 lg:px-8" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <FadeUp className="text-center mb-12 md:mb-16 flex justify-center items-center flex-col">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-[60%] text-center">
            Maximize Every Stage of Your E-Commerce Growth Journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto">
            No matter where your business stands — just starting out or already in motion — we offer
            services that are built around your growth. At Ecomsavy, we don't follow templates. We work with what makes sense for your business.
          </p>
        </FadeUp>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <nav className="flex flex-col gap-6 md:gap-8" aria-label="Services navigation">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`text-left pb-4 border-b-2 transition-all duration-300 font-medium text-lg md:text-xl ${
                    activeService === service.id
                      ? 'text-foreground border-b-teal-500'
                      : 'text-muted-foreground border-b-transparent hover:text-foreground'
                  }`}
                  aria-pressed={activeService === service.id}
                  aria-label={`View details for ${service.title}`}
                >
                  {service.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {currentService && (
              <div className="animate-fade-in">
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden bg-muted shadow-lg">
                  <Image
                    src={currentService.image || "/placeholder.svg"}
                    alt={currentService.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Description */}
                <div className="bg-foreground text-background p-6 md:p-8">
                  <p className="text-base md:text-lg leading-relaxed">
                    {currentService.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </section>
  );
}
