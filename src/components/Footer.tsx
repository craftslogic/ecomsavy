'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-6 bg-[#f0f7f0] pb-32 md:pb-24" role="contentinfo">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="text-4xl font-bold tracking-tight">
          <span className="text-[#2d9d5c]">ecom</span>
          <span className="text-[#1a2d4d]">savy</span>
          <span className="text-[#2d9d5c]">.</span>
        </div>

        {/* Description */}
        <p className="text-center text-base leading-relaxed max-w-2xl text-[#1a2d4d]">
          We are a service that helps you create and optimize your Daraz store for easy online selling.
        </p>

        {/* CTA Button */}
        <button
          className="px-8 py-3 rounded-full font-semibold text-white bg-[#2d9d5c] transition-transform hover:scale-105 active:scale-95"
          aria-label="Contact us to work together"
        >
          Let's Work Together
        </button>

        {/* Social Media Icons */}
        <nav className="flex gap-4" aria-label="Social media links">
          <a
            href="#"
            className="p-3 rounded-md bg-[#3b5998] transition-transform hover:scale-110"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="p-3 rounded-md bg-[#1da1f2] transition-transform hover:scale-110"
            aria-label="Follow us on Twitter"
          >
            <Twitter size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="p-3 rounded-md bg-[#0077b5] transition-transform hover:scale-110"
            aria-label="Follow us on LinkedIn"
          >
            <Linkedin size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="p-3 rounded-md bg-[#ff0000] transition-transform hover:scale-110"
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube size={20} className="text-white" />
          </a>
          <a
            href="#"
            className="p-3 rounded-md bg-[#e1306c] transition-transform hover:scale-110"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={20} className="text-white" />
          </a>
        </nav>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: '#d0d0d0' }}></div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <Link
            href="#"
            className="transition-colors hover:underline"
            style={{ color: '#d9534f' }}
          >
            Privacy Policy
          </Link>
          <span style={{ color: '#999' }}>|</span>
          <Link
            href="#"
            className="transition-colors hover:underline"
            style={{ color: '#d9534f' }}
          >
            Terms Of Service
          </Link>
          <span style={{ color: '#999' }}>|</span>
          <Link
            href="#"
            className="transition-colors hover:underline"
            style={{ color: '#d9534f' }}
          >
            Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm" style={{ color: '#999' }}>
          © Copyright 2025 Ecomsavy – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
