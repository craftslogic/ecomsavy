"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeUp, SlideUp } from './AnimatedSection'

const testimonials = [
  {
    id: 1,
    quote:
      "Working with Ecomsavy felt like having a true partner who cared about our growth as much as we do.",
    author: "Ahmed Khan",
    position: "top-left",
  },
  {
    id: 2,
    quote:
      "Our ROI has been beyond anything we imagined before working with the team Ecomsavy",
    author: "Fatima Tariq",
    position: "top-right",
  },
  {
    id: 3,
    quote:
      "In terms of sales, I reached 7x return on ad spend and my customer database has increased substantially, I couldn't be happier with the team",
    author: "Ayesha Malik",
    position: "bottom-left",
  },
  {
    id: 4,
    quote:
      "Communication is important to us. Maaz and the team have always gone above and beyond to ensure our needs are met",
    author: "Bilal Qureshi",
    position: "bottom-right",
  },
]

function SpeechBubble({
  quote,
  author,
  className,
}: {
  quote: string
  author: string
  className?: string
}) {
  return (
    <div className={`relative max-w-xs ${className}`}>
      <div className="bg-[#00b4d8] text-white p-4 rounded-2xl text-sm font-medium leading-relaxed">
        {quote} – {author}
      </div>
      <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#00b4d8]" />
    </div>
  )
}

export function Clients() {
  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24" id="clients">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#22a852] font-semibold mb-3">The Priority</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Our Clients Come
            <br />
            First, Always
          </h2>
          <p className="text-[#666666] text-base">
            We take pride in the moment our clients become our friends.
          </p>
        </FadeUp>

        {/* Testimonials Grid with CTA */}
        <div className="relative min-h-100 md:min-h-112.5 mb-16">
          {/* Top Left Testimonial */}
          <div className="absolute left-0 top-0 md:left-4 md:top-4">
            <SpeechBubble
              quote={testimonials[0].quote}
              author={testimonials[0].author}
            />
          </div>

          {/* Top Right Testimonial */}
          <div className="absolute right-0 top-0 md:right-4 md:top-8 hidden md:block">
            <SpeechBubble
              quote={testimonials[1].quote}
              author={testimonials[1].author}
            />
          </div>

          {/* Center CTA Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button
              size="lg"
              className="bg-[#22a852] hover:bg-[#1e9648] text-white px-8 py-6 rounded-full text-base font-medium"
            >
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Bottom Left Testimonial */}
          <div className="absolute left-0 bottom-0 md:left-16 md:bottom-4">
            <SpeechBubble
              quote={testimonials[2].quote}
              author={testimonials[2].author}
            />
          </div>

          {/* Bottom Right Testimonial */}
          <div className="absolute right-0 bottom-0 md:right-8 md:bottom-8 hidden md:block">
            <SpeechBubble
              quote={testimonials[3].quote}
              author={testimonials[3].author}
            />
          </div>

          {/* Mobile: Show remaining testimonials stacked */}
          <div className="md:hidden pt-48 space-y-6">
            <SpeechBubble
              quote={testimonials[1].quote}
              author={testimonials[1].author}
            />
            <SpeechBubble
              quote={testimonials[3].quote}
              author={testimonials[3].author}
            />
          </div>
        </div>

        {/* Dark Card - Competitors Section */}
        <SlideUp delay={0.3}>
          <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white italic mb-4 leading-tight">
              Your Competitors Follow
              <br />
              What We Create.
            </h3>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              At Ecomsavy, we don't just deliver results—we've helped shape the
              strategies of other agencies by sharing the proven systems behind
              our client success.
            </p>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-[#22a852] hover:bg-[#1e9648] text-white px-6 py-3 rounded-lg font-medium"
                aria-label="View our success stories"
              >
                See The Success
              </Button>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  )
}
