"use client";

import { FadeUp, SlideUp } from "@/components/AnimatedSection";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { SchedulingFormWrapper } from "@/components/scheduling/SchedulingFormWrapper";
import { videoConfig } from "@/config/videos";
import { Check } from "lucide-react";

export default function ScheduleAMeetPage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      {/* SECTION 1 - HERO */}
      <section className="relative w-full bg-white/60 backdrop-blur-sm pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Become a Brand Owner in 40 Days — Even Without a Product
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We help beginners launch their own beard oil, skincare, toys, home
              and kitchen gadgets brands — with packaging, store, design, and
              ads — all done-for-you.
            </p>
          </FadeUp>

          <SlideUp delay={0.2} className="mt-12">
            <div className="max-w-3xl mx-auto">
              <YouTubeEmbed
                videoId={videoConfig.hero.videoId}
                title={videoConfig.hero.title}
                posterImage={videoConfig.hero.posterImage}
                aspectRatio="video"
              />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* SECTION 2 - WHAT WE'LL DO FOR YOU */}
      <section className="relative w-full bg-gray-50 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What We'll Do For You – In Just 40 Days
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              We don't just help you design a logo or give you a course — we
              build your entire brand from scratch, ready to sell.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              Here's what's included:
            </h3>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Custom Brand Name & Logo",
              "Product Bottles with Printing",
              "Product Photography + 1 Launch Ad Video",
              "Facebook Ad Manager + Pixel Integration",
              "Full 1-on-1 Guidance Till You Launch",
              "Premium Packaging & Label Design",
              "Shopify Store (Fully Built for You)",
              "Social Media Account Setup",
              "COD Courier + Payment Setup",
            ].map((item, index) => (
              <SlideUp key={index} delay={0.1 * index}>
                <div className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-800 font-medium">{item}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - SUCCESS STORY */}
      <section className="relative w-full bg-black text-white py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Success Story
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Starting with the same proven system, we have grown into
              Pakistan's leading online skincare brand, consistently achieving
              500+ orders daily and generating millions in revenue.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            {[
              { value: "500+", label: "Daily Orders" },
              { value: "5 Crore+", label: "Monthly Revenue" },
              { value: "150k+", label: "Happy Customers" },
              { value: "2-3 Years", label: "To Success" },
            ].map((stat, index) => (
              <SlideUp key={index} delay={0.1 * index}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <blockquote className="text-xl md:text-2xl italic text-gray-300 mb-8">
                "The same proven system that built Ecomsavy can build your
                brand. We know what works because we've done it ourselves."
              </blockquote>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  From Startup to Market Leader
                </h3>
                <p className="text-lg text-gray-300">
                  The exact blueprint we used for Ecomsavy is now available for
                  your brand.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 4 - PACKAGES */}
      <section className="relative w-full bg-white py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Brand Launch Package
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Select the package that fits your budget and goals:
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Starter Package */}
            <SlideUp delay={0.1}>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Starter Package
                </h3>
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Service Charges:
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Rs. 150,000
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Product Cost:
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    Rs. 70,000
                  </div>
                  <div className="text-gray-600">100 serums @ Rs. 700 each</div>
                </div>
                <p className="text-gray-700 mt-4">
                  Perfect for testing the market with lower investment
                </p>
              </div>
            </SlideUp>

            {/* Growth Package */}
            <SlideUp delay={0.2}>
              <div className="bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8 hover:shadow-xl transition-shadow relative">
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Growth Package
                </h3>
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Service Charges:
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                    Rs. 0
                  </div>
                  <div className="text-sm text-gray-600 mb-2">MOQ:</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    1,000 pieces
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  No service charges - pay only for products
                  <br />
                  Best value for serious entrepreneurs
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* SECTION 5 - GET STARTED (FORM) */}
      <section
        id="get-started"
        className="relative w-full bg-gray-50 py-16 md:py-24 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get Started - Book Your Free Strategy Call
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Launching 20-30 brands every month
            </p>
          </FadeUp>

          <SlideUp delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <SchedulingFormWrapper />
              <p className="text-center text-sm text-gray-500 mt-6">
                No spam, ever. Your information is 100% secure.
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* SECTION 6 - PRICING TABLE */}
      <section className="relative w-full bg-white py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transparent Pricing – No Hidden Charges
            </h2>
          </FadeUp>

          <SlideUp delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left p-4 md:p-6 font-semibold">
                      What's Included
                    </th>
                    <th className="text-center p-4 md:p-6 font-semibold">
                      Starter Package
                    </th>
                    <th className="text-center p-4 md:p-6 font-semibold">
                      Growth Package
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 md:p-6 font-medium">Service Charges</td>
                    <td className="p-4 md:p-6 text-center">Rs. 150,000</td>
                    <td className="p-4 md:p-6 text-center font-bold text-green-600">
                      Rs. 0
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 md:p-6 font-medium">MOQ (Serum)</td>
                    <td className="p-4 md:p-6 text-center">100 pieces</td>
                    <td className="p-4 md:p-6 text-center">1,000 pieces</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 md:p-6 font-medium">
                      Product Cost (Serum)
                    </td>
                    <td className="p-4 md:p-6 text-center">Rs. 700 each</td>
                    <td className="p-4 md:p-6 text-center">Variable pricing</td>
                  </tr>
                  {[
                    "Logo, Branding, Packaging Design",
                    "Label + Box Printing",
                    "Shopify Store (Professional Setup)",
                    "Website Content + Product Shoot",
                    "One Video Ad (Launch Focused)",
                    "Social Media Handles Setup",
                    "Facebook BM, Ad Account, Pixel",
                    "Courier + COD Integration",
                    "1-on-1 Brand Strategy Support",
                  ].map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 md:p-6 font-medium">{feature}</td>
                      <td className="p-4 md:p-6 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="p-4 md:p-6 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* SECTION 7 - FINAL CTA */}
      <section className="relative w-full bg-linear-to-br from-gray-900 to-black text-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              You're not just launching a product — you're stepping into a new
              identity: Brand Owner.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              We've helped dozens of people start profitable ecommerce brands —
              without any marketing background, design skills, or warehouse.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Your vision + our team = fully launched business in 40-60 days.
            </p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400 mb-8">
              Limited to 20 clients per month only.
            </p>
          </FadeUp>

          <SlideUp delay={0.2}>
            <a
              href="#get-started"
              className="inline-block bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Fill the Form to Book Your Free Call
            </a>
          </SlideUp>
        </div>
      </section>
    </main>
  );
}
