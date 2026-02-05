"use client";

import { useEffect, useRef } from "react";
import { FadeUp, SlideUp } from "./AnimatedSection";
import Image from "next/image";

const brands = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

export default function HeroSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    let rafId: number;

    const scrollSpeed = 0.6; // 👈 smooth speed

    const animate = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      className="relative w-full bg-white/60 backdrop-blur-sm pt-24 md:pt-16 pb-16 md:pb-24 px-4"
      id="home"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Your Vision, Our Mission
          </p>
          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-foreground mb-12 leading-tight">
            How to Build a Wildly Profitable Ecommerce Store
          </h1>
        </FadeUp>

        {/* Video Player - Elevated above particles */}
        <SlideUp delay={0.2}>
          <div className="relative mb-16 rounded-2xl overflow-hidden bg-black aspect-video shadow-lg">
             <video
              width="100%"
              height="100%"
              src="/videos/hero.mp4"
              title="How to Build a Profitable Ecommerce Store"
              controls
              className="w-full h-full"
              aria-label="Video tutorial: How to Build a Profitable Ecommerce Store"
              preload="none"
              playsInline
            >
              <track kind="captions" srcLang="en" label="English" />
              Your browser does not support the video tag. Please use a modern browser to view this content.
            </video>
          </div>
        </SlideUp>

        {/* Brands Carousel */}
        <div className="mt-12">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by 30+ leading brands
          </p>

          {/* Scrolling Container */}
          <div className="relative overflow-hidden" role="region" aria-label="Partner brands showcase">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white/60 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white/60 to-transparent z-10 pointer-events-none" aria-hidden="true" />

            {/* THIS is the SCROLL CONTAINER */}
            <div
              ref={scrollContainerRef}
              className="overflow-hidden whitespace-nowrap"
            >
              {/* THIS is the MOVING CONTENT */}
              <div className="flex gap-8 md:gap-12 w-max px-4">
                {/* Original */}
                {brands.map((brand, index) => (
                  <div
                    key={`brand-${index}`}
                    className="shrink-0 h-16 flex items-center justify-center px-6 py-4"
                  >
                    <Image
                      src={`/images/brands/${brand}.jpg`}
                      alt={`Partner brand ${brand} logo`}
                      width={150}
                      height={60}
                      className="mx-auto h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                ))}

                {/* Duplicate for seamless loop */}
                {brands.map((brand, index) => (
                  <div
                    key={`dup-${index}`}
                    className="shrink-0 h-16 flex items-center justify-center px-6 py-4"
                    aria-hidden="true"
                  >
                     <Image
                      src={`/images/brands/${brand}.jpg`}
                      alt=""
                      width={150}
                      height={60}
                      className="mx-auto h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
