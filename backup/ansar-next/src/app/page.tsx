import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { InAction } from "@/components/sections/InAction";
import { Stats } from "@/components/sections/Stats";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <InAction />
      <Stats />
      <CallToAction />
    </>
  );
}
