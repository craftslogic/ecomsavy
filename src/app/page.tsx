import HeroSection from '@/components/HeroSection';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import Mission from '@/components/Misson';
import BusinessSuccess from '@/components/BusinessSuccess';
import { Stats } from '@/components/Stats';
import ServiceShowcase from '@/components/ServiceShowcase';
import Testimonials from '@/components/Testimonials';
import { Founder } from '@/components/Founder';
import FAQ from '@/components/FAQ';
import { Clients } from '@/components/Clients';
import { SectionDivider } from '@/components/SectionDivider';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-white ">
      {/* Particle Network Background - behind everything */}
      <ParticleNetwork />

      <HeroSection />
      <SectionDivider variant="gradient" className="my-12" />
      
      <Mission />
      <SectionDivider variant="gradient" className="my-8" />
      
      <BusinessSuccess />
      
      <Stats />
      
      <ServiceShowcase />
      
      <Founder />
      <SectionDivider variant="gradient" className="" />
      
      <FAQ />
      <Clients />
    </main>
  );
}
