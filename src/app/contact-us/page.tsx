import type { Metadata } from "next";
import ContactInfo from "@/components/contact/ContactInfo";
import Hero from "@/components/contact/Hero";

export const metadata: Metadata = {
  title: "Contact Us | Ecomsavy - Let's Grow Your Ecommerce Business",
  description: "Get in touch with Ecomsavy for expert ecommerce solutions, Daraz optimization, and digital marketing strategies. We're here to help grow your online business.",
  keywords: ["contact ecomsavy", "ecommerce consultation", "Daraz support", "digital marketing help"],
  openGraph: {
    title: "Contact Us | Ecomsavy",
    description: "Get in touch with Ecomsavy for expert ecommerce solutions and digital marketing strategies.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ContactInfo />
    </main>
  );
}
