'use client'
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
      role="banner"
    >
      {/* Floating pill-style navigation */}
      <nav 
        className="flex items-center justify-between px-6 md:px-8 py-3 md:py-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Ecomsavy home">
          <Image 
            src="/images/logo.png" 
            alt="Ecomsavy logo" 
            width={140} 
            height={140}
            priority
          />
        </Link>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="#home" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
            About Us
          </Link>
          <Link href="#services" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
            Services
          </Link>
          <Link href="#projects" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <button 
          className="px-4 md:px-6 xl:px-8 py-2 md:py-3 bg-green-600 text-white text-sm md:text-base font-semibold rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 shrink-0"
          aria-label="Contact us to work together"
        >
          <span className="hidden sm:inline">Let's Work Together</span>
          <span className="sm:hidden">Contact</span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>
    </header>
  )
}
