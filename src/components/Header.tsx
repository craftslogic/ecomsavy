'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "/contact-us", label: "Contact" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Responsive: bottom floating on desktop, fixed top on mobile
  return (
    <>
      {/* Desktop: floating pill at bottom */}
      <nav
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 items-center justify-between px-6 md:px-8 py-3 md:py-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow w-full max-w-5xl z-50"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center shrink-0" aria-label="Ecomsavy home">
          <Image
            src="/images/logo.svg"
            alt="Ecomsavy logo"
            width={140}
            height={140}
            priority
          />
        </Link>
        <div className="flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact-us"
          className="px-4 md:px-6 xl:px-8 py-2 md:py-3 bg-green-600 text-white text-sm md:text-base font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 shrink-0"
          aria-label="Contact us to work together"
        >
          <span className="inline">Let's Work Together</span>
         
        </Link>
      </nav>

      {/* Mobile: fixed top, hamburger menu */}
      <nav
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow transition-all",
          menuOpen ? "z-60" : "z-50"
        )}
        aria-label="Mobile navigation"
      >
        <Link href="/" className="flex items-center shrink-0" aria-label="Ecomsavy home">
          <Image
            src="/images/logo.svg"
            alt="Ecomsavy logo"
            width={110}
            height={110}
            priority
          />
        </Link>
        <button
          className={cn(
            "inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all",
            menuOpen && "bg-gray-100"
          )}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            className="h-7 w-7 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay - only on mobile */}
      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-200"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow transition-transform duration-200"
            style={{ minHeight: "60vh" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col items-center gap-6 pt-24 pb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-semibold text-gray-900 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-4 py-2 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact-us"
                className="w-full max-w-xs px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center justify-center gap-2 mt-4"
                aria-label="Contact us to work together"
                onClick={() => setMenuOpen(false)}
              >
                Contact
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
