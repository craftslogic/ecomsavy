"use client"

import React from "react"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeUp, SlideUp } from './AnimatedSection'
import Image from "next/image"

const faqData = [
  {
    question: "What makes Ecomsavy different from other agencies?",
    answer:
      "We specialize in Daraz — with a team focused solely on platform performance, trends, and optimizations others often overlook.",
  },
  {
    question: "How soon can I expect results after onboarding?",
    answer:
      "Results begin within the first 30–45 days, depending on your category and product readiness.",
  },
  {
    question: "Is Ecomsavy only for big brands?",
    answer:
      "Not at all. We work with startups, SMEs, and large-scale brands — our approach adapts to your business size.",
  },
  {
    question: "What if I've never sold online before?",
    answer:
      "No problem. We guide you through every step — from product setup to your first sale and beyond.",
  },
  {
    question: "How do I get started with Ecomsavy?",
    answer:
      "Just reach out via our contact form — our team will get in touch to discuss your business and next steps.",
  },
]

function FAQAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 md:py-5 text-left text-base font-semibold transition-all outline-none touch-manipulation [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden",
          className
        )}
        {...props}
      >
        {children}
        <Plus className="plus-icon size-5 md:size-6 shrink-0 text-foreground" />
        <Minus className="minus-icon size-5 md:size-6 shrink-0 text-foreground" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function FAQAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5 text-muted-foreground", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

function FAQIllustration() {
  return (
    <svg
      viewBox="0 0 400 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full max-w-md"
    >
      {/* Speech bubble with checkmark */}
      <ellipse cx="260" cy="60" rx="35" ry="30" fill="#1a1a1a" />
      <path d="M250 85 L260 100 L270 85" fill="#1a1a1a" />
      <path
        d="M245 58 L255 68 L275 48"
        stroke="#c8f542"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small speech bubble */}
      <ellipse cx="320" cy="80" rx="25" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M310 96 L318 108 L326 96" fill="white" stroke="#1a1a1a" strokeWidth="2" />

      {/* Left person - head */}
      <ellipse cx="180" cy="130" rx="35" ry="40" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Hair */}
      <path
        d="M150 110 Q150 80 180 75 Q210 80 210 110"
        fill="#1a1a1a"
      />
      {/* Face details */}
      <circle cx="168" cy="130" r="3" fill="#1a1a1a" />
      <circle cx="192" cy="130" r="3" fill="#1a1a1a" />
      <path d="M175 145 Q180 150 185 145" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      {/* Eyebrows */}
      <path d="M162 120 L172 118" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M188 118 L198 120" stroke="#1a1a1a" strokeWidth="2" />

      {/* Left person - body */}
      <path d="M155 170 L155 320 Q155 330 165 330 L195 330 Q205 330 205 320 L205 170" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Tie */}
      <path d="M180 170 L175 200 L180 270 L185 200 L180 170" fill="#c8f542" />
      {/* Arms */}
      <path d="M155 180 Q120 200 140 260" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <path d="M205 180 Q235 200 230 240" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      {/* Hands */}
      <ellipse cx="230" cy="250" rx="15" ry="12" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Thumbs up */}
      <path d="M225 240 L225 230" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />

      {/* Legs */}
      <path d="M165 330 L160 420" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M195 330 L200 420" stroke="#1a1a1a" strokeWidth="2" />
      {/* Pants */}
      <rect x="155" y="330" width="50" height="90" fill="#1a1a1a" rx="5" />
      {/* Shoes */}
      <ellipse cx="160" cy="425" rx="18" ry="8" fill="#1a1a1a" />
      <ellipse cx="200" cy="425" rx="18" ry="8" fill="#1a1a1a" />

      {/* Right person - head */}
      <ellipse cx="300" cy="140" rx="30" ry="35" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Curly hair */}
      <circle cx="280" cy="115" r="10" fill="#1a1a1a" />
      <circle cx="295" cy="105" r="12" fill="#1a1a1a" />
      <circle cx="315" cy="108" r="10" fill="#1a1a1a" />
      <circle cx="325" cy="120" r="8" fill="#1a1a1a" />
      {/* Face details */}
      <circle cx="290" cy="140" r="2" fill="#1a1a1a" />
      <circle cx="310" cy="140" r="2" fill="#1a1a1a" />
      <path d="M295 155 Q300 158 305 155" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />

      {/* Right person - body */}
      <path d="M270 175 L270 330 Q270 340 280 340 L320 340 Q330 340 330 330 L330 175" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Arms */}
      <path d="M270 185 Q250 200 245 250" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <path d="M330 185 Q360 220 350 320" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      {/* Hand shake connection */}
      <ellipse cx="238" cy="255" rx="12" ry="10" fill="white" stroke="#1a1a1a" strokeWidth="2" />

      {/* Briefcase */}
      <rect x="335" y="340" width="45" height="35" rx="5" fill="#c8f542" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="350" y="350" width="15" height="20" rx="2" fill="white" />
      <path d="M350 340 L350 335 Q350 330 355 330 L365 330 Q370 330 370 335 L370 340" stroke="#1a1a1a" strokeWidth="2" fill="none" />

      {/* Right person legs */}
      <rect x="275" y="340" width="50" height="80" fill="#1a1a1a" rx="5" />
      {/* Shoes */}
      <ellipse cx="285" cy="425" rx="18" ry="8" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="318" cy="425" rx="18" ry="8" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Shoe details */}
      <path d="M275 425 L295 425" stroke="#1a1a1a" strokeWidth="1" />
      <path d="M308 425 L328 425" stroke="#1a1a1a" strokeWidth="1" />
    </svg>
  )
}

export default function FAQ() {
  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left content */}
          <FadeUp className="w-full lg:max-w-[45%]">
            <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Direct Answers
              <br />
              to Significant Questions
            </h2>
            <p className="mt-4 text-sm md:text-base max-w-lg text-muted-foreground">
              Providing straightforward solutions to complex challenges, ensuring
              clarity and confidence in every decision you make.
            </p>

            <AccordionPrimitive.Root
              type="single"
              defaultValue="item-0"
              collapsible
              className="mt-8 md:mt-10"
            >
              {faqData.map((item, index) => (
                <AccordionPrimitive.Item
                  key={index}
                  value={`item-${index}`}
                  className="border-t border-border"
                >
                  <FAQAccordionTrigger className="cursor-pointer text-sm md:text-base">{item.question}</FAQAccordionTrigger>
                  <FAQAccordionContent className="text-sm md:text-base">{item.answer}</FAQAccordionContent>
                </AccordionPrimitive.Item>
              ))}
              <div className="border-t border-border" />
            </AccordionPrimitive.Root>
          </FadeUp>

          {/* Right illustration */}
          <SlideUp delay={0.2} className="hidden lg:flex items-center justify-center lg:max-w-[40%]">
            <Image src={'/images/Frame.svg'} alt="FAQ" width={300} height={600} className="w-full h-auto"/>
          </SlideUp>
        </div>
      </div>
    </section>
  )
}
