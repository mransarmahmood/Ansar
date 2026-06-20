import { Head } from '@inertiajs/react';
import SiteHeader from '../Components/SiteHeader';
import SiteFooter from '../Components/SiteFooter';
import HeroSlider from '../Components/HeroSlider';
import PillarCard from '../Components/PillarCard';
import UpcomingSessions from '../Components/UpcomingSessions';
import BlogSection from '../Components/BlogSection';
import QuickContact from '../Components/QuickContact';

const PILLARS = [
  {
    tone: 'navy', icon: 'fa-shield-alt', label: 'Pillar 01', title: 'Consulting & Audits',
    description: 'Strategic HSE advisory, ISO implementation, audits, and incident investigation — delivered by a Lead Auditor with 20 years on the front line.',
    items: [
      { to: '/consulting', icon: 'fa-shield-alt', label: 'HSE Consulting & Advisory' },
      { to: '/audits', icon: 'fa-clipboard-check', label: 'Audits & Gap Analysis' },
      { to: '/management-systems', icon: 'fa-sitemap', label: 'ISO 45001 / 14001 Implementation' },
      { to: '/incident-investigation', icon: 'fa-search', label: 'Incident Investigation & RCA' },
    ],
    cta: 'Explore Consulting', ctaTo: '/consulting',
  },
  {
    tone: 'gold', icon: 'fa-graduation-cap', label: 'Pillar 02', title: 'Training & Coaching',
    description: 'Certification coaching with a 97%+ first-attempt pass rate. IOSH, ISO Lead Auditor, ASP/CSP, CRSP, OTHM/NVQ — online, in-person, and corporate cohorts.',
    items: [
      { to: '/training', icon: 'fa-chalkboard-teacher', label: 'HSE Training Programs' },
      { to: '/certification-coaching', icon: 'fa-award', label: 'Certification Coaching' },
      { to: '/course-calendar', icon: 'fa-calendar-alt', label: 'Course Calendar' },
      { to: '/corporate-solutions', icon: 'fa-building', label: 'Corporate Programs' },
    ],
    cta: 'Explore Training', ctaTo: '/training',
  },
  {
    tone: 'blue', icon: 'fa-microchip', label: 'Pillar 03', title: 'Digital & AI Solutions',
    description: 'Custom AI agents, Power BI dashboards, SharePoint portals, and safety apps — bridging safety management with the modern enterprise.',
    items: [
      { to: '/ai-solutions', icon: 'fa-robot', label: 'AI Solutions for HSE' },
      { to: '/digital-solutions', icon: 'fa-laptop-code', label: 'Digital Transformation' },
      { to: '/powerbi-dashboards', icon: 'fa-chart-bar', label: 'Power BI Dashboards' },
      { to: '/safety-apps', icon: 'fa-mobile-alt', label: 'Custom Safety Apps' },
    ],
    cta: 'Explore Digital & AI', ctaTo: '/ai-solutions',
  },
];

export default function Home() {
  return (
    <>
      <Head title="Ansar Mahmood — Global HSE Consultant, Trainer & AI Solutions Specialist" />
      <SiteHeader />
      <main>
        <HeroSlider />

        <section className="section section-white" id="pillars" aria-labelledby="pillars-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">Three Pillars · One Trusted Advisor</span>
              <h2 id="pillars-heading">Everything your HSE function needs — <em className="em">under one roof.</em></h2>
              <p>Most consultants do one thing. Ansar combines three deeply-developed disciplines so your safety strategy, team capability, and digital tooling stay aligned.</p>
            </div>
            <div className="pillar-grid">
              {PILLARS.map((p) => <PillarCard key={p.title} {...p} />)}
            </div>
          </div>
        </section>

        <UpcomingSessions limit={6} />
        <BlogSection limit={3} />
        <QuickContact />
      </main>
      <SiteFooter />
    </>
  );
}
