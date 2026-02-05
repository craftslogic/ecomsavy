'use client';

import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import { FadeUp, SlideUp } from '../AnimatedSection';

export default function ContactInfo() {
  const contactInfo = [
    {
      title: 'Address',
      content: 'A-02, Shadman Town, North Nazimabad, Karachi, Pakistan',
      icon: MapPin,
      href: 'https://maps.google.com/?q=A-02+Shadman+Town+North+Nazimabad+Karachi',
    },
    {
      title: 'Phone',
      content: '+92-335-3866461',
      icon: Phone,
      href: 'tel:+923353866461',
    },
    {
      title: 'Email',
      content: 'info@ecomsavy.com',
      icon: Mail,
      href: 'mailto:info@ecomsavy.com',
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/ecomsavy/',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Ecomsavy',
      color: 'bg-gray-900 hover:bg-black',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ecom-savy/',
      color: 'bg-blue-700 hover:bg-blue-800',
      icon: Linkedin,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Ecomsavy',
      color: 'bg-red-600 hover:bg-red-700',
      icon: Youtube,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ecomsavy/',
      color: 'bg-pink-600 hover:bg-pink-700',
      icon: Instagram,
    },
  ];

  return (
    <section className="w-full bg-gray-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8" id="contact-form">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In <span className="text-green-500">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to transform your ecommerce business? Reach out through any channel below.
          </p>
        </FadeUp>

        {/* Contact Cards */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <FadeUp key={info.title} delay={0.1 * index}>
                <a
                  href={info.href}
                  target={info.title === 'Address' ? '_blank' : undefined}
                  rel={info.title === 'Address' ? 'noopener noreferrer' : undefined}
                  className="group block rounded-2xl border border-gray-800 bg-gray-800/50 backdrop-blur-sm px-6 py-8 text-center transition-all duration-300 hover:border-green-500 hover:bg-gray-800 hover:shadow-lg hover:shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 text-green-500 mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {info.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                    {info.content}
                  </p>
                </a>
              </FadeUp>
            );
          })}
        </div>

        {/* Social Media Section */}
        <SlideUp delay={0.2}>
          <div className="mb-16 md:mb-20 flex flex-col items-center justify-center">
            <h3 className="mb-8 text-2xl md:text-3xl font-bold text-white">
              Follow Our <span className="text-green-500">Journey</span>
            </h3>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Social media links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} flex h-14 w-14 items-center justify-center rounded-xl text-white transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </nav>
          </div>
        </SlideUp>

        {/* Google Map */}
        <SlideUp delay={0.3}>
          <div className="overflow-hidden rounded-2xl border-2 border-gray-800 shadow-2xl">
            <h3 className="sr-only">Our Location Map</h3>
            <iframe
              className="h-96 w-full md:h-125 lg:h-150"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.287916260839!2d67.15039!3d24.81641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e6baf21db4b%3A0x123456789!2sA-02%2C%20Shadman%20Town%2C%20North%20Nazimabad%2C%20Karachi!5e0!3m2!1sen!2s!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ecomsavy office location on Google Maps"
            />
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
