import Image from "next/image"
import { Linkedin, Facebook, Instagram } from "lucide-react"
import { FadeUp, SlideUp } from './AnimatedSection'

export function Founder() {
  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24" id="founder">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Heading */}
        <FadeUp className="text-center mb-12 md:mb-16">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Meet Our Founder
          </h2>
          <div className="w-full h-px bg-[#d1d1d1]" />
        </FadeUp>
        
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {/* Profile Image */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#e8e8e8]">
              <Image
                src="/images/founder.jpg"
                alt="Syed Maaz Ali - Founder and CEO of Ecomsavy"
                fill
                className="object-cover object-top rounded-full"
                priority
              />
            </div>
          </div>
          
          {/* Info Card */}
          <div className="bg-[#22a852] rounded-2xl p-8 md:p-10 max-w-md">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-4">
              SYED MAAZ ALI
            </h3>
            
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
              Syed Maaz Ali, CEO of Ecomsavy, brings 5+ years of e-commerce expertise, driving growth for top local and international brands through strategic sales and marketing, leading the company with clear vision and direction
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/syedmaazali_official/#"
                target="_blank"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/people/Syed-Maaz-Ali/61576235527531/"
                target="_blank"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/syedmaazali_official/#"
                target="_blank"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
