import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { InAction } from "@/components/sections/InAction";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <FeaturedCaseStudy />
      <Testimonials />
      <InAction />
      <Stats />
      <CallToAction />
    </>
  );
}
