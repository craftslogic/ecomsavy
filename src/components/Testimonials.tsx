'use client';

import Image from 'next/image';
import { FadeUp } from './AnimatedSection';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  testimonial: string;
  videoThumbnail?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Hamza',
    company: 'From Tabbanis',
    rating: 5,
    testimonial: 'We went from 10 orders a week to 100+ in under 2 months. Honestly, I didn\'t expect results this fast.',
    videoThumbnail: '/images/image.png',
  },
  {
    id: '2',
    name: 'Jahangir',
    company: 'From Seven Edge',
    rating: 5,
    testimonial: 'Since joining Ecomsavy, we\'ve added two fresh categories and now profit on Daraz.',
    videoThumbnail: '/images/image.png',
  },
  {
    id: '3',
    name: 'Abdul Hannan',
    company: 'From Hype Pillow',
    rating: 5,
    testimonial: 'We crossed 1M in sales way faster than I thought. If I had found them earlier, I\'d be way ahead by now.',
    videoThumbnail: '/images/image.png',
  },
  {
    id: '4',
    name: 'Rehan',
    company: 'From Paper Cut',
    rating: 5,
    testimonial: 'I used to struggle with product visibility. Now, we\'re ranking on top keywords and getting daily sales.',
    videoThumbnail: '/images/image.png',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">
          ★
        </span>
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="w-full bg-white/60 backdrop-blur-sm py-16 md:py-24 px-4 sm:px-6 lg:px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <FadeUp className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Become Our Next Success Story!
          </h2>
        </FadeUp>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Video Placeholder */}
              <div className="relative w-full aspect-video bg-muted overflow-hidden">
                {testimonial.videoThumbnail && (
                  <Image
                    src={testimonial.videoThumbnail || "/placeholder.svg"}
                    alt={`${testimonial.name} testimonial`}
                    fill
                    className="object-cover"
                  />
                )}
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                  <button className="w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors">
                    <svg
                      className="w-6 h-6 text-black fill-current ml-0.5"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col grow p-5 sm:p-6">
                {/* Stars */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 grow">
                  {testimonial.testimonial}
                </p>

                {/* Name and Company */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
