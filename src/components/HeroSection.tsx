'use client';

import { useEffect, useRef } from 'react';
import { FadeUp, SlideUp } from './AnimatedSection';

const brands = [
  { name: 'RAK', color: '#9E9E9E' },
  { name: 'Malika', color: '#E91E63' },
  { name: 'Radiance360', color: '#9E9E9E' },
  { name: 'Kordovan', color: '#000000' },
  { name: 'NAVZA', color: '#9E9E9E' },
];

export default function HeroSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    const scrollInterval = setInterval(() => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="relative w-full bg-background py-16 px-4 md:py-24 z-10" id="home">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Your Vision, Our Mission
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-foreground mb-12 leading-tight">
            How to Build a Wildly Profitable Ecommerce Store
          </h1>
        </FadeUp>

        {/* Video Player - Elevated above particles */}
        <SlideUp delay={0.2}>
          <div className="relative mb-16 rounded-2xl overflow-hidden bg-black aspect-video shadow-lg z-20">
            <video
              width="100%"
              height="100%"
              src="/videos/hero.mp4"
              title="How to Build a Profitable Ecommerce Store"
              controls
              className="w-full h-full"
              aria-label="Video: How to Build a Profitable Ecommerce Store"
            />
          </div>
        </SlideUp>

        {/* Brands Carousel */}
        <div className="mt-12">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by leading brands
          </p>
          
          {/* Scrolling Container */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div
              ref={scrollContainerRef}
              className="flex gap-8 md:gap-12 overflow-hidden px-4 scroll-smooth"
            >
              {/* Original set */}
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="shrink-0 h-16 flex items-center justify-center px-6 py-4 transition-opacity hover:opacity-75"
                >
                  <span className="text-lg font-semibold text-foreground/60">
                    {brand.name}
                  </span>
                </div>
              ))}
              
              {/* Duplicated set for seamless loop */}
              {brands.map((brand, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="shrink-0 h-16 flex items-center justify-center px-6 py-4 transition-opacity hover:opacity-75"
                >
                  <span className="text-lg font-semibold text-foreground/60">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
