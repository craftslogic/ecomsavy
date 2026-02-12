"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { SlideUp } from "./AnimatedSection";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className="w-full py-16 px-6 bg-[#f0f7f0] pb-32 md:pb-24"
      role="contentinfo"
    >
      {/* Dark Card - Competitors Section */}
      <SlideUp delay={0.3}>
        <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 mx-4 sm:mx-8 lg:mx-32 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white italic mb-4 leading-tight">
            Your Competitors Follow
            <br />
            What We Create.
          </h2>
          <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-3xl mb-6">
            At Ecomsavy, we don't just deliver results—we've helped shape the
            strategies of other agencies by sharing the proven systems behind
            our client success.
          </p>
          <div className="flex justify-end">
            <Link
              href="#testimonials"
              className="bg-[#22a852] hover:bg-[#1e9648] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
              aria-label="View our success stories and testimonials"
            >
              See The Success
            </Link>
          </div>
        </div>
      </SlideUp>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 mt-12">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-green-600 rounded-lg" aria-label="Ecomsavy home">
          <Image 
            src="/images/logo.svg" 
            alt="Ecomsavy - Your Ecommerce Growth Partner" 
            width={400} 
            height={400}
            className="w-auto h-auto max-w-full"
          />
        </Link>

        {/* Description */}
        <p className="text-center text-base leading-relaxed max-w-2xl text-[#1a2d4d] font-semibold">
          We are a service that helps you create and optimize your Daraz store
          for easy online selling and sustainable ecommerce growth.
        </p>

        {/* CTA Button */}
        <Link
          href="/schedule-a-meet"
          className="px-8 py-3 rounded-full font-semibold text-white bg-[#2d9d5c] hover:bg-[#22a852] transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-label="Contact us to work together on your ecommerce business"
        >
          Schedule a Meet
        </Link>

        {/* Social Media Icons */}
        <nav className="flex gap-4" aria-label="Social media links">
          <a
            href="https://www.facebook.com/ecomsavy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#3b5998] hover:bg-[#2d4373] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={20} className="text-white" aria-hidden="true" />
          </a>
          <a
            href="https://x.com/Ecomsavy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#1da1f2] hover:bg-[#1a91da] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Follow us on Twitter"
          >
            <Twitter size={20} className="text-white" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/company/ecom-savy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#0077b5] hover:bg-[#005885] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Follow us on LinkedIn"
          >
            <Linkedin size={20} className="text-white" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@Ecomsavy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#ff0000] hover:bg-[#cc0000] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube size={20} className="text-white" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/ecomsavy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#e1306c] hover:bg-[#c13584] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={20} className="text-white" aria-hidden="true" />
          </a>
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300" aria-hidden="true" />

        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-2 text-sm" aria-label="Legal information">
          <Link
            href="/legal/privacy-policy"
            className="text-[#d9534f] hover:text-[#c9302c] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-400" aria-hidden="true">|</span>
          <Link
            href="/legal/terms-of-service"
            className="text-[#d9534f] hover:text-[#c9302c] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
          >
            Terms Of Service
          </Link>
          <span className="text-gray-400" aria-hidden="true">|</span>
          <Link
            href="/legal/disclaimer"
            className="text-[#d9534f] hover:text-[#c9302c] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
          >
            Disclaimer
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © Copyright {currentYear} Ecomsavy – All Rights Reserved. Designed and Developed by <a href="https://muzzamilbukhari-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">Muzzamil Bukhari</a>
        </p>
      </div>
    </footer>
  );
}
