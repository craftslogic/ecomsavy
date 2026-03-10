import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ecomsavy.com'),
  title: {
    default: "Ecomsavy | Build a Wildly Profitable Ecommerce Store",
    template: "%s | Ecomsavy"
  },
  description: "Expert Daraz optimization and ecommerce growth strategies. We help businesses scale their online presence with proven systems and data-driven results.",
  keywords: [
    "ecommerce",
    "Daraz optimization",
    "online store",
    "ecommerce growth",
    "digital marketing",
    "Shopify store",
    "ecommerce consulting",
    "Pakistan ecommerce",
    "online business growth"
  ],
  authors: [{ name: "Ecomsavy", url: "https://ecomsavy.com" }],
  creator: "Ecomsavy",
  publisher: "Ecomsavy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecomsavy.com",
    siteName: "Ecomsavy",
    title: "Ecomsavy | Build a Wildly Profitable Ecommerce Store",
    description: "Expert Daraz optimization and ecommerce growth strategies. We help businesses scale their online presence with proven systems and data-driven results.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ecomsavy - Your Ecommerce Growth Partner"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Ecomsavy",
    creator: "@Ecomsavy",
    title: "Ecomsavy | Build a Wildly Profitable Ecommerce Store",
    description: "Expert Daraz optimization and ecommerce growth strategies",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ecomsavy.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1696692764191644');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1696692764191644&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.variable} font-sans antialiased relative min-h-screen`} style={{ background: 'linear-gradient(to bottom, #ffffff, #f9fafb)' }}>
        {/* GLOBAL BACKGROUND */}
        <ParticleNetwork />

        {/* HEADER always above content, but below z-50 overlays */}
        <Header />

        {/* PAGE CONTENT */}
        <div className="relative z-10">
          {children}
          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
