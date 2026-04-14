"use client";

import { FadeUp, SlideUp } from "@/components/AnimatedSection";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Step1LeadCapture } from "@/components/scheduling/Step1LeadCapture";
import { videoConfig } from "@/config/videos";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LeadCaptureFormData } from "@/types/scheduling";

export default function ScheduleAMeetPage() {
  const router = useRouter();

  const handleLeadCapture = async (data: LeadCaptureFormData) => {
    try {
      // Create lead in database
      const response = await fetch("/api/scheduling/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create lead");
      }

      // Store lead data in localStorage for next step
      localStorage.setItem(
        "leadData",
        JSON.stringify({
          ...data,
          leadId: result.data.id,
        }),
      );

      toast.success("Information saved!");

      // Redirect to thank-you page (Step 2)
      router.push("/thank-you");
    } catch (error) {
      console.error("Error in lead capture:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save information",
      );
    }
  };
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      {/* SECTION 1 - HERO */}
      <section className="relative w-full bg-white/60 backdrop-blur-sm pt-20 md:pt-24 pb-8 md:pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
              Become a Brand Owner in 40 Days — <br />
              <span className="text-green-600">Even Without a Product</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We help beginners launch their own beard oil, skincare, toys, home
              and kitchen gadgets brands — with packaging, store, design, and
              ads — all done-for-you.
            </p>
          </FadeUp>

          <SlideUp delay={0.2} className="mt-4">
            <div className="max-w-3xl mx-auto rounded-xl border-2 border-green-600 shadow-md overflow-hidden">
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
      <section className="relative w-full bg-white py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-2 border-green-600 rounded-xl shadow-lg p-6 md:p-7">
            <FadeUp className="text-center mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                What We'll Do For You – In Just 40 Days
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-3">
                We don't just help you design a logo or give you a course — we
                build your entire brand from scratch, ready to sell.
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Here's what's included:
              </h3>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
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
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-600 transition-colors">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <p className="text-base text-gray-800 font-medium">
                      {item}
                    </p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - SUCCESS STORY */}
      <div className="w-full bg-white py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-green-50 to-green-100 border-2 border-green-600 rounded-2xl p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Column */}
              <div className="text-center">
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">
                    Our Success Story:
                  </h2>
                </div>

                {/* Description */}
                <p className="text-base text-gray-700 mb-10 leading-relaxed">
                  Starting with the same proven system, this brand has grown into
                  Pakistan's leading online skincare brand, consistently
                  achieving 250+ orders daily and generating millions in
                  revenue.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {/* Stat 1 */}
                  <div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      250+
                    </p>
                    <p className="text-gray-600 text-sm">Daily Orders</p>
                  </div>

                  {/* Stat 2 */}
                  <div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      2 Crore+
                    </p>
                    <p className="text-gray-600 text-sm">Monthly Revenue</p>
                  </div>

                  {/* Stat 3 */}
                  <div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      100k+
                    </p>
                    <p className="text-gray-600 text-sm">Happy Customers</p>
                  </div>

                  {/* Stat 4 */}
                  <div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      2 Years
                    </p>
                    <p className="text-gray-600 text-sm">To Success</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="border-l-4 border-green-600 pl-4 mt-4">
                  <p className="text-base italic text-gray-700 leading-relaxed">
                    "The same proven system that built this brand can build your
                    brand. We know what works because we've done it ourselves."
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Chart Image */}
                <div className="bg-green-200 space-y-6 rounded-xl p-5 mb-5 shadow-lg">
                  <Image
                    src="/images/chart.jpeg"
                    alt="Ecomsavy Sales Growth Chart"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Bottom Text */}
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      From Startup to Market Leader
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The exact blueprint we used for this brand is now available
                      for your brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 - PACKAGES */}
      <section className="relative w-full bg-white py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-2 border-green-600 rounded-xl shadow-lg p-6 md:p-7">
            <FadeUp className="text-center mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                💼 Choose Your Brand Launch Package
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Select the package that fits your budget and goals:
              </p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-5 mx-auto mt-5">
              {/* Starter Package */}
              <SlideUp delay={0.1}>
                <div className="bg-black rounded-2xl text-center p-6 md:p-7 shadow-2xl transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
                    Starter Package
                  </h3>

                  <div className="space-y-4 mb-6 grow">
                    <div>
                      <p className="text-white text-base font-semibold mb-1">
                        Service Charges:{" "}
                        <span className="text-white font-bold text-xl">
                          Rs. 150,000
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-white text-base font-semibold mb-1">
                        Product Cost:{" "}
                        <span className="text-white font-bold text-xl">
                          Rs. 35,000
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-yellow-400 text-sm font-medium">
                        100 serums @ Rs. 350 each
                      </p>
                    </div>
                  </div>

                  <p className="text-white text-sm md:text-sm leading-relaxed">
                    Perfect for testing the market with lower investment
                  </p>
                </div>
              </SlideUp>

              {/* Growth Package */}
              <SlideUp delay={0.2}>
                <div className="bg-green-600 text-center rounded-2xl p-6 md:p-7 shadow-2xl transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
                    Growth Package
                  </h3>

                  <div className="space-y-4 mb-6 grow">
                    <div>
                      <p className="text-white text-base font-semibold mb-1">
                        Service Charges:{" "}
                        <span className="text-white font-bold text-xl">
                          Rs. 0
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-white text-base font-semibold mb-1">
                        MOQ:{" "}
                        <span className="text-white font-bold text-xl">
                          1,000 pieces
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-yellow-400 text-sm font-medium">
                        No service charges - pay only for products
                      </p>
                    </div>
                  </div>

                  <p className="text-white text-sm md:text-sm leading-relaxed">
                    Best value for serious entrepreneurs
                  </p>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - GET STARTED (FORM) */}
      <section
        id="get-started"
        className="relative w-full bg-white py-8 md:py-10 px-4"
      >
        <div className="max-w-3xl mx-auto bg-green-50 border-2 border-green-600 rounded-lg shadow-lg p-8">
          <FadeUp className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              🚀
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Get Started - Book Your Free Strategy Call
            </h2>
            <p className="text-base md:text-lg text-green-600 font-semibold mb-2">
              Launching 20-30 brands every month
            </p>
          </FadeUp>

          <SlideUp delay={0.2}>
            <div className=" p-5 md:p-6">
              <Step1LeadCapture onNext={handleLeadCapture} />
              <p className="text-center text-xs text-gray-500 mt-4">
                No spam, ever. Your information is 100% secure.
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* SECTION 6 - PRICING TABLE */}
      <section className="relative w-full bg-white py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-7">
            <FadeUp className="text-center mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Transparent Pricing – No Hidden Charges
              </h2>
            </FadeUp>

            <SlideUp delay={0.2}>
              <div className="overflow-x-auto bg-green-50 border-2 border-green-600 rounded-lg p-5">
                <table className="w-full border-collaps rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-green-200 text-black">
                      <th className="text-left p-2 md:p-3 font-semibold text-sm">
                        What's Included
                      </th>
                      <th className="text-center p-2 md:p-3 font-semibold text-sm">
                        Starter Package
                      </th>
                      <th className="text-center p-2 md:p-3 font-semibold text-sm text-green-600">
                        Growth Package
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 md:p-3 font-medium text-sm">
                        Service Charges
                      </td>
                      <td className="p-2 md:p-3 text-center text-sm">
                        Rs. 150,000
                      </td>
                      <td className="p-2 md:p-3 text-center font-bold text-sm text-green-600">
                        Rs. 0
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 md:p-3 font-medium text-sm">
                        MOQ (Serum)
                      </td>
                      <td className="p-2 md:p-3 text-center text-sm">
                        100 pieces
                      </td>
                      <td className="p-2 md:p-3 text-center text-sm">
                        1,000 pieces
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 md:p-3 font-medium text-sm">
                        Product Cost (Serum)
                      </td>
                      <td className="p-2 md:p-3 text-center text-sm">
                        Rs. 700 each
                      </td>
                      <td className="p-2 md:p-3 text-center text-sm">
                        Variable pricing
                      </td>
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
                        <td className="p-2 md:p-3 font-medium text-sm">
                          {feature}
                        </td>
                        <td className="p-2 md:p-3 text-center">
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        </td>
                        <td className="p-2 md:p-3 text-center">
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* SECTION 7 - FINAL CTA */}
      <section className="relative w-full bg-white  py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-2 border-green-600 rounded-xl shadow-lg p-6 md:p-7 text-center">
            <FadeUp>
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                You're not just launching a product — you're stepping into a new
                identity:
                <span className="text-yellow-400">
                  {" "}
                  Brand <br /> Owner.
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-3">
                We've helped dozens of people start profitable ecommerce brands
                — without any marketing background, design skills, or warehouse.
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-3">
                Your vision + our team = fully launched business in 40-60 days.
              </p>
              <p className="text-base md:text-lg font-bold text-green-600 mb-4">
                Limited to 20 clients per month only.
              </p>
            </FadeUp>

            <SlideUp delay={0.2}>
              <a
                href="#get-started"
                className="inline-block bg-green-600 text-white font-bold text-base px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Fill the Form to Book Your Free Call
              </a>
            </SlideUp>
          </div>
        </div>
      </section>
    </main>
  );
}
