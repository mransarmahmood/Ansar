/**
 * Ansar Mahmood — Exam Catalogue
 * ---------------------------------------------------------------
 * Public-facing exam prep programmes Ansar delivers.
 * Each entry powers a catalogue card (/exams) and a dedicated
 * detail page (/exams/[slug]).
 *
 * The "enroll" CTA deep-links into the existing PHP exam portal
 * (exam-login.php / exam-register.php) which already has a MySQL
 * backend (ansar_cms database).
 */

export type ExamCategory =
  | "international"
  | "practitioner"
  | "supervisor"
  | "manager"
  | "specialist";

export interface Exam {
  slug: string;
  ref: string;            // e.g. "EX-2026-0001"
  name: string;           // "Certified Safety Professional (CSP)"
  short: string;          // marketing headline
  awardingBody: string;   // BCSP, BCRSP, IOSH, NEBOSH, PMI, Scrum Alliance
  category: ExamCategory;
  tagline: string;        // 1-line positioning
  description: string;    // 2-3 sentence summary
  icon: string;           // lucide icon name
  colorScheme: "brand" | "gold" | "mint";
  durationMinutes: number;
  questionCount: number;
  passMarkPct: number;
  maxAttempts: number;
  recertificationMonths: number | null;
  iso17024: boolean;

  who:        string[];   // "Who it's for" bullets
  outcomes:   string[];   // "What you'll be able to do"
  syllabus:   { title: string; topics: string[] }[];
  prerequisites: string[];
  examFormat: string[];   // e.g. ["Online proctored", "120 MCQ", "4-hour window"]

  prepPrice:  string;     // "$850" or "from $850"
  prepDurationWeeks: number;
}

/* ───────────────────────────────────────────────────────────── */

export const exams: Exam[] = [
  {
    slug: "csp",
    ref: "EX-2026-0001",
    name: "Certified Safety Professional (CSP)",
    short: "The gold-standard credential for senior safety professionals",
    awardingBody: "BCSP",
    category: "international",
    tagline: "North America's most recognised safety credential — built for leaders.",
    description:
      "The Certified Safety Professional (CSP) credential from the Board of Certified Safety Professionals (BCSP) is the premier credential for safety professionals in North America. Ansar's prep programme has a pass-rate exceeding 85% across global cohorts.",
    icon: "ShieldCheck",
    colorScheme: "gold",
    durationMinutes: 330,
    questionCount: 200,
    passMarkPct: 49.5,
    maxAttempts: 4,
    recertificationMonths: 60,
    iso17024: true,

    who: [
      "Senior HSE managers and directors",
      "Safety engineers with 4+ years of BCSP-qualified experience",
      "Risk consultants seeking C-suite credibility",
      "ASP holders progressing to CSP",
    ],
    outcomes: [
      "Lead enterprise safety management systems",
      "Design and deliver risk-reduction programmes",
      "Interpret and apply OSHA, ANSI, ISO, and international standards",
      "Quantify and communicate safety ROI to executives",
    ],
    syllabus: [
      {
        title: "Advanced Sciences & Math",
        topics: ["Physics applied to safety", "Chemistry for HSE", "Biological hazards", "Statistical inference"],
      },
      {
        title: "Management Systems",
        topics: ["ISO 45001 integration", "OHSMS frameworks", "ANSI Z10", "Management of change"],
      },
      {
        title: "Risk Management",
        topics: ["Hazard ID methods", "Quantitative risk analysis", "Bowtie analysis", "HRO principles"],
      },
      {
        title: "Applied Safety",
        topics: ["Ergonomics", "Fire & emergency", "Industrial hygiene", "Construction safety"],
      },
      {
        title: "Law, Ethics, Economics",
        topics: ["Regulations", "Cost-benefit analysis", "Professional ethics", "Liability frameworks"],
      },
    ],
    prerequisites: [
      "Bachelor's degree or qualifying equivalent",
      "4+ years of safety experience at the professional level",
      "Current ASP, CHST, OHST, CET, or CIH credential (or qualified by BCSP)",
    ],
    examFormat: [
      "Computer-based, Pearson VUE centres or online",
      "200 multiple-choice questions",
      "5-hour 30-minute window",
      "Scaled score 600 to pass",
    ],

    prepPrice: "from $950",
    prepDurationWeeks: 12,
  },
  {
    slug: "crsp",
    ref: "EX-2026-0002",
    name: "Canadian Registered Safety Professional (CRSP)",
    short: "Canada's flagship HSE designation — global recognition, Canadian rigour",
    awardingBody: "BCRSP",
    category: "international",
    tagline: "The CRSP® is the premier Canadian safety credential, recognised across 40+ countries.",
    description:
      "The Board of Canadian Registered Safety Professionals (BCRSP) CRSP® credential demonstrates mastery of the Canadian OHS framework blended with international practice. Ansar's 10-week accelerator pairs exam coaching with real-world mentorship.",
    icon: "Award",
    colorScheme: "brand",
    durationMinutes: 180,
    questionCount: 180,
    passMarkPct: 62,
    maxAttempts: 4,
    recertificationMonths: 60,
    iso17024: true,

    who: [
      "Canadian and internationally-based safety professionals",
      "HSE managers working on Canadian oil, gas, and mining projects",
      "Expatriate professionals seeking Canadian recognition",
      "CHSC holders progressing to CRSP",
    ],
    outcomes: [
      "Apply Canadian OHS legislation across provinces",
      "Implement CSA standards and best-practice frameworks",
      "Lead internal audits and WCB claim management",
      "Produce defensible incident investigations",
    ],
    syllabus: [
      { title: "OHS Law in Canada", topics: ["Federal vs provincial jurisdiction", "Bill C-45", "Due diligence", "WHMIS 2015"] },
      { title: "Management Systems", topics: ["CSA Z1000", "Z1001 training", "Integrated HSEQ", "Continuous improvement"] },
      { title: "Hazard Control", topics: ["Hierarchy of controls", "Ergonomics", "Confined space", "Fall protection"] },
      { title: "Industrial Hygiene", topics: ["OELs and exposure limits", "Monitoring programmes", "Noise & vibration", "Chemical safety"] },
      { title: "Emergency & Incident", topics: ["ERP design", "TapRooT investigation", "WCB claims", "Return-to-work"] },
    ],
    prerequisites: [
      "Bachelor's degree or 3-year diploma in related discipline",
      "4 years of professional safety experience",
      "Current membership in BCRSP-accepted professional body",
    ],
    examFormat: [
      "Computer-based online proctored",
      "180 multiple-choice questions",
      "3-hour window",
      "Pass mark 62%",
    ],

    prepPrice: "from $850",
    prepDurationWeeks: 10,
  },
  {
    slug: "idip-nebosh",
    ref: "EX-2026-0003",
    name: "NEBOSH International Diploma (IDip)",
    short: "The most respected HSE qualification in the Commonwealth and Middle East",
    awardingBody: "NEBOSH",
    category: "manager",
    tagline: "Level 6 qualification comparable to a UK Bachelor's degree — a true career accelerator.",
    description:
      "The NEBOSH International Diploma in Occupational Health and Safety is the benchmark qualification for senior HSE professionals across the UK, Middle East, Africa, and Asia-Pacific. Ansar's programme blends live coaching, mock exams, and assignment support.",
    icon: "GraduationCap",
    colorScheme: "gold",
    durationMinutes: 240,
    questionCount: 0,
    passMarkPct: 50,
    maxAttempts: 4,
    recertificationMonths: null,
    iso17024: false,

    who: [
      "Mid-career HSE professionals pursuing senior roles",
      "Site HSE managers on international projects",
      "Consultants expanding their credential portfolio",
      "General Certificate holders ready to step up",
    ],
    outcomes: [
      "Develop and implement HSE management systems",
      "Lead complex risk assessments and safety cases",
      "Influence senior leadership with HSE strategy",
      "Meet IOSH Chartered membership requirements",
    ],
    syllabus: [
      { title: "Unit IA — Managing health & safety", topics: ["Principles of HSE", "Loss causation", "Behavioural safety", "Risk perception"] },
      { title: "Unit IB — Hazardous substances", topics: ["Chemical hazards", "Biological agents", "Dust and fibres", "Environmental exposure"] },
      { title: "Unit IC — Workplace & work equipment", topics: ["Machinery safety", "Electricity", "Fire", "Work at height", "Transport"] },
      { title: "Unit DNI — Assignment", topics: ["Workplace-based research project", "8,000-word report", "Oral defence"] },
    ],
    prerequisites: [
      "NEBOSH General Certificate or equivalent (recommended)",
      "Strong English literacy (IELTS 7.0+ recommended)",
      "2+ years of HSE experience",
    ],
    examFormat: [
      "3 written exam units (IA, IB, IC)",
      "Each unit: 4-hour open-book scenario-based paper",
      "Plus workplace assignment (Unit DNI)",
    ],

    prepPrice: "from $1,450",
    prepDurationWeeks: 16,
  },
  {
    slug: "iosh-ms",
    ref: "EX-2026-0004",
    name: "IOSH Managing Safely",
    short: "The world's most popular safety course for line managers",
    awardingBody: "IOSH",
    category: "supervisor",
    tagline: "A practical, high-impact programme trusted by 180,000+ managers worldwide.",
    description:
      "IOSH Managing Safely® is a 3-day programme designed for managers and supervisors in any sector. Ansar delivers it in-person and online, with engaging workshop-style sessions and real case studies.",
    icon: "ShieldCheck",
    colorScheme: "brand",
    durationMinutes: 45,
    questionCount: 30,
    passMarkPct: 60,
    maxAttempts: 2,
    recertificationMonths: 36,
    iso17024: false,

    who: [
      "First-line managers and team leaders",
      "Supervisors stepping into HSE-responsibility roles",
      "Project managers on industrial sites",
      "Anyone needing a recognised line-manager HSE credential",
    ],
    outcomes: [
      "Assess and control everyday workplace risks",
      "Investigate incidents and near-misses",
      "Understand legal duties as a manager",
      "Measure safety performance and drive improvement",
    ],
    syllabus: [
      { title: "Assessing Risks", topics: ["Hazard identification", "5-step risk assessment", "Risk matrices"] },
      { title: "Controlling Risks", topics: ["Hierarchy of control", "Safe systems of work", "Permit-to-work basics"] },
      { title: "Understanding Responsibilities", topics: ["Duty of care", "Civil and criminal liability", "Corporate manslaughter"] },
      { title: "Investigating Incidents", topics: ["Root cause analysis", "Reporting standards", "Lessons learned loops"] },
      { title: "Measuring Performance", topics: ["Leading vs lagging indicators", "KPIs that matter", "Audit basics"] },
    ],
    prerequisites: ["No formal prerequisites", "Open to any manager or supervisor"],
    examFormat: [
      "30-question multiple-choice assessment",
      "Practical risk-assessment project",
      "45-minute paper",
      "Open to online or in-person delivery",
    ],

    prepPrice: "from $395",
    prepDurationWeeks: 1,
  },
  {
    slug: "pmp",
    ref: "EX-2026-0005",
    name: "Project Management Professional (PMP)®",
    short: "The globally recognised standard for project managers in every industry",
    awardingBody: "PMI",
    category: "manager",
    tagline: "Demonstrate the competence to lead projects predictably and deliver outcomes.",
    description:
      "The PMP® from the Project Management Institute is the most important industry-recognised certification for project managers. Ansar's blended prep combines PMBOK mastery with agile/hybrid approaches and extensive mock testing.",
    icon: "BarChart3",
    colorScheme: "brand",
    durationMinutes: 230,
    questionCount: 180,
    passMarkPct: 61,
    maxAttempts: 3,
    recertificationMonths: 36,
    iso17024: true,

    who: [
      "Experienced project managers seeking senior roles",
      "HSE engineers leading safety-system rollouts",
      "Digital transformation leads",
      "Consultants running multi-stakeholder programmes",
    ],
    outcomes: [
      "Lead predictive, agile, and hybrid projects confidently",
      "Manage stakeholders across complex portfolios",
      "Apply servant-leadership and tailoring principles",
      "Pass the PMP exam first time",
    ],
    syllabus: [
      { title: "People (42%)", topics: ["Building teams", "Empowering stakeholders", "Negotiation", "Conflict resolution"] },
      { title: "Process (50%)", topics: ["Predictive planning", "Agile and hybrid delivery", "Integration management", "Change control"] },
      { title: "Business Environment (8%)", topics: ["Organisational strategy", "Compliance", "Value delivery", "Benefits realisation"] },
    ],
    prerequisites: [
      "Four-year degree + 36 months of project experience + 35 hours PM education",
      "OR secondary diploma + 60 months of project experience + 35 hours PM education",
    ],
    examFormat: [
      "180 multiple-choice questions",
      "230-minute window with two 10-minute breaks",
      "Computer-based online proctored or Pearson VUE centre",
    ],

    prepPrice: "from $1,195",
    prepDurationWeeks: 10,
  },
  {
    slug: "csm",
    ref: "EX-2026-0006",
    name: "Certified ScrumMaster® (CSM)",
    short: "The entry-level Scrum credential recognised globally",
    awardingBody: "Scrum Alliance",
    category: "practitioner",
    tagline: "Learn the Scrum framework from an Alliance-authorised instructor and become a certified ScrumMaster.",
    description:
      "The Certified ScrumMaster® from Scrum Alliance validates your ability to facilitate Scrum teams and serve as a servant-leader. Ansar's 2-day workshop is delivered by an Alliance-certified trainer with real-world agile transformation case studies.",
    icon: "Users",
    colorScheme: "mint",
    durationMinutes: 60,
    questionCount: 50,
    passMarkPct: 74,
    maxAttempts: 2,
    recertificationMonths: 24,
    iso17024: false,

    who: [
      "Developers moving into facilitation roles",
      "Project managers adopting agile",
      "HSE teams running agile safety sprints",
      "Team leads in digital transformation programmes",
    ],
    outcomes: [
      "Facilitate Scrum events effectively",
      "Coach teams through the five Scrum values",
      "Remove impediments and shield the team",
      "Apply Scrum in non-software contexts (HSE, operations, marketing)",
    ],
    syllabus: [
      { title: "Scrum Foundations", topics: ["Empirical process", "Scrum values", "Scrum Guide"] },
      { title: "Roles", topics: ["ScrumMaster", "Product Owner", "Developers"] },
      { title: "Events", topics: ["Sprint", "Daily Scrum", "Sprint Review", "Retrospective"] },
      { title: "Artefacts", topics: ["Product Backlog", "Sprint Backlog", "Increment"] },
      { title: "Scaling", topics: ["LeSS basics", "SAFe overview", "Nexus framework"] },
    ],
    prerequisites: ["No formal prerequisites", "Attending a 2-day CSM workshop with Alliance-certified trainer is mandatory"],
    examFormat: [
      "50 multiple-choice questions",
      "60-minute online assessment",
      "Pass mark 74% (37/50)",
      "Two attempts included in workshop fee",
    ],

    prepPrice: "from $795",
    prepDurationWeeks: 2,
  },
];

/* ── Helpers ─────────────────────────────────────────────────── */

export function getExam(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}

export function examSlugs(): string[] {
  return exams.map((e) => e.slug);
}

export function examsByCategory(category: ExamCategory): Exam[] {
  return exams.filter((e) => e.category === category);
}

export function examsByAwardingBody(body: string): Exam[] {
  return exams.filter((e) => e.awardingBody === body);
}

export const awardingBodies = Array.from(new Set(exams.map((e) => e.awardingBody))).sort();
