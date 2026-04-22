import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { InAction } from "@/components/sections/InAction";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      {/* Sprint 3 — Hero → Proof Bar → Logo Marquee (top-of-page rhythm) */}
      <Hero />
      <ProofBar />
      <LogoMarquee />

      {/* Sections from earlier sprints — rebuilt in Sprints 4-5 */}
      <ServicesGrid />
      <FeaturedCaseStudy />
      <Testimonials />
      <InAction />
      <Stats />
      <CallToAction />
    </>
  );
}
