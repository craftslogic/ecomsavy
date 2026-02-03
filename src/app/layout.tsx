import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecomsavy | Build a Wildly Profitable Ecommerce Store",
  description: "Expert Daraz optimization and ecommerce growth strategies. We help businesses scale their online presence with proven systems and data-driven results.",
  keywords: ["ecommerce", "Daraz optimization", "online store", "ecommerce growth", "digital marketing"],
  authors: [{ name: "Ecomsavy" }],
  openGraph: {
    title: "Ecomsavy | Build a Wildly Profitable Ecommerce Store",
    description: "Expert Daraz optimization and ecommerce growth strategies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <Header />
        <Footer />
      </body>
    </html>
  );
}
