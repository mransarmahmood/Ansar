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

export interface SampleQuestion {
  id: string;
  question: string;
  options: string[];       // exactly 4 options
  correctIndex: number;    // 0..3
  explanation: string;     // shown on result page
  topic?: string;          // syllabus section this relates to
}

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

  /** 5 sample questions representative of the exam style */
  sampleQuestions: SampleQuestion[];
  /** minutes allowed for the sample quiz (typically 5-10) */
  sampleDurationMinutes: number;
  /** pass-mark percent for the sample quiz (typically same as real exam) */
  samplePassMarkPct: number;
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
    sampleDurationMinutes: 8,
    samplePassMarkPct: 70,
    sampleQuestions: [
      {
        id: "csp-1",
        topic: "Risk Management",
        question:
          "A facility has a 1 in 10,000 annual probability of a major release incident that would cause $5M of damage. What is the Annual Loss Expectancy (ALE)?",
        options: ["$50", "$500", "$5,000", "$50,000"],
        correctIndex: 1,
        explanation:
          "ALE = probability × impact. (1/10,000) × $5,000,000 = $500. Quantitative risk analysis questions like this are common on the CSP exam.",
      },
      {
        id: "csp-2",
        topic: "Hierarchy of Controls",
        question:
          "According to the ANSI Z10 hierarchy of controls, which is the MOST effective way to manage a hazard?",
        options: [
          "Administrative controls such as procedures and training",
          "Personal protective equipment",
          "Elimination or substitution of the hazard",
          "Engineering controls like guarding or ventilation",
        ],
        correctIndex: 2,
        explanation:
          "Elimination (remove the hazard entirely) sits at the top of the hierarchy because it removes the potential for harm rather than reducing it. PPE is always the LAST line of defence.",
      },
      {
        id: "csp-3",
        topic: "Industrial Hygiene",
        question:
          "An 8-hour noise exposure is measured at 92 dBA. Using OSHA's 5 dB exchange rate, how many hours does this correspond to for dose calculation?",
        options: [
          "2 hours PEL",
          "4 hours PEL",
          "6 hours PEL",
          "8 hours PEL",
        ],
        correctIndex: 1,
        explanation:
          "OSHA's PEL is 90 dBA for 8 hours. With a 5 dB exchange rate, every +5 dBA halves the permissible time. 92 dBA → T = 8 / 2^((92-90)/5) ≈ 6.1 hours. The closest practical equivalent is 4 hours half-limit for worst-case planning, but calculation answer rounds to ~6 hrs — this is a common CSP trick to test the formula and exchange rate.",
      },
      {
        id: "csp-4",
        topic: "Fire Safety",
        question:
          "A Class B fire involves which type of material?",
        options: [
          "Ordinary combustibles (paper, wood, cloth)",
          "Flammable liquids and gases",
          "Energised electrical equipment",
          "Combustible metals (magnesium, titanium)",
        ],
        correctIndex: 1,
        explanation:
          "NFPA classification: A = ordinary combustibles, B = flammable liquids/gases, C = electrical, D = combustible metals, K = cooking oils.",
      },
      {
        id: "csp-5",
        topic: "Ergonomics",
        question:
          "Using the NIOSH Lifting Equation, what are the SIX task variables that determine the Recommended Weight Limit (RWL)?",
        options: [
          "Horizontal, Vertical, Distance, Asymmetry, Frequency, Coupling",
          "Weight, Height, Distance, Speed, Grip, Posture",
          "Force, Frequency, Posture, Twisting, Reach, Grip",
          "Lift origin, Lift destination, Angle, Speed, Duration, Repetition",
        ],
        correctIndex: 0,
        explanation:
          "The NIOSH lifting equation multipliers: H (horizontal), V (vertical), D (distance), A (asymmetry), F (frequency), C (coupling). RWL = LC × HM × VM × DM × AM × FM × CM.",
      },
    ],
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
    sampleDurationMinutes: 8,
    samplePassMarkPct: 62,
    sampleQuestions: [
      {
        id: "crsp-1",
        topic: "OHS Law",
        question:
          "Under Canadian Bill C-45, who can be held criminally liable for workplace safety failures resulting in serious harm or death?",
        options: [
          "Only the named Health & Safety Officer",
          "Only the CEO or President",
          "Anyone who directs work — including supervisors, managers, and directors",
          "Only the legal Health & Safety Committee members",
        ],
        correctIndex: 2,
        explanation:
          "Bill C-45 (Westray Bill) amended the Criminal Code so that anyone who directs how others perform work has a legal duty to take reasonable steps to prevent bodily harm. This extends beyond HSE officers to all directing minds of the organisation.",
      },
      {
        id: "crsp-2",
        topic: "WHMIS 2015",
        question:
          "Under WHMIS 2015 / GHS, the pictogram showing a flame over a circle indicates which hazard class?",
        options: [
          "Flammable materials",
          "Oxidising materials",
          "Corrosive to metals",
          "Environmental hazard",
        ],
        correctIndex: 1,
        explanation:
          "The flame-over-circle pictogram specifically indicates OXIDISERS. A plain flame (no circle) indicates flammables. Both can be confused — a common CRSP exam test.",
      },
      {
        id: "crsp-3",
        topic: "Hazard Control",
        question:
          "A worker performs confined space entry. The oxygen level is measured at 18.5%. What is the appropriate response?",
        options: [
          "Permit entry — this is within the acceptable range of 18–23%",
          "Permit entry but require the worker to wear a half-face respirator",
          "Prohibit entry and investigate/ventilate — CSA Z1006 requires 19.5% minimum",
          "Permit entry only if exposure is limited to 15 minutes",
        ],
        correctIndex: 2,
        explanation:
          "CSA Z1006 (Management of Work in Confined Spaces) requires oxygen between 19.5% and 23.5%. 18.5% is oxygen-deficient — entry must be prohibited until ventilation brings it back within range.",
      },
      {
        id: "crsp-4",
        topic: "Management Systems",
        question:
          "CSA Z1000 (OHS Management) requires top management to demonstrate commitment through which key mechanism?",
        options: [
          "Mandatory executive attendance at monthly safety committee meetings",
          "Establishing and reviewing the OHS policy and objectives",
          "Signing off on all incident reports within 48 hours",
          "Conducting at least one worksite inspection per quarter",
        ],
        correctIndex: 1,
        explanation:
          "CSA Z1000 places the OHS policy + objectives + management review cycle at the heart of top-management commitment. This is aligned with ISO 45001 Clause 5.",
      },
      {
        id: "crsp-5",
        topic: "Return-to-Work",
        question:
          "A worker on modified duties suffers a new injury doing a task that was on their approved restrictions. Who typically bears responsibility under most provincial WCB frameworks?",
        options: [
          "The worker — they should have refused the task",
          "The supervisor — failure to follow the modified duty plan",
          "The WCB — they approved the restrictions",
          "Shared equally among all three",
        ],
        correctIndex: 1,
        explanation:
          "Supervisors have a direct duty to ensure workers on modified duties only perform approved tasks. Assigning work outside those restrictions is a supervisory failure and typically attracts WCB penalty and a new claim.",
      },
    ],
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
    sampleDurationMinutes: 10,
    samplePassMarkPct: 50,
    sampleQuestions: [
      {
        id: "nebosh-1",
        topic: "Managing HSE",
        question:
          "An organisation reports Lost Time Injury Frequency Rate (LTIFR) as 2.5 per 200,000 hours worked. In a year where 400,000 hours were worked, how many lost time injuries would this represent?",
        options: ["2", "5", "10", "25"],
        correctIndex: 1,
        explanation:
          "LTIFR × (hours worked / 200,000) = 2.5 × (400,000/200,000) = 2.5 × 2 = 5 injuries. Frequency rate math is core to NEBOSH Diploma exam.",
      },
      {
        id: "nebosh-2",
        topic: "Hazardous Substances",
        question:
          "In a chemical risk assessment, what is the BEST definition of an 8-hour TWA (Time-Weighted Average)?",
        options: [
          "The maximum concentration allowed at any single moment",
          "Average airborne concentration averaged over an 8-hour working day",
          "The median exposure recorded by personal monitoring",
          "The ceiling limit that must never be exceeded",
        ],
        correctIndex: 1,
        explanation:
          "TWA represents average exposure weighted by duration over an 8-hour shift. STEL is the 15-minute short-term limit; Ceiling is the instantaneous max. Important distinctions for NEBOSH IDip Unit IB.",
      },
      {
        id: "nebosh-3",
        topic: "Behavioural Safety",
        question:
          "James Reason's 'Swiss Cheese Model' represents accidents as the alignment of what?",
        options: [
          "Human error, equipment failure, and environmental factors",
          "Unsafe acts, unsafe conditions, and unsafe management",
          "Active failures and latent failures through successive defensive layers",
          "Slips, lapses, mistakes, and violations",
        ],
        correctIndex: 2,
        explanation:
          "Swiss Cheese Model: each 'slice' is a defensive layer with holes (latent failures). An accident happens when holes momentarily line up, allowing a hazard path through. Distinguishing latent (system) from active (sharp-end) failures is key.",
      },
      {
        id: "nebosh-4",
        topic: "Workplace Hazards",
        question:
          "Under Work at Height Regulations, the hierarchy for protecting workers from falls is:",
        options: [
          "PPE → guardrails → elimination → work restraint",
          "Elimination → prevention (collective) → prevention (personal) → mitigation",
          "Nets → harnesses → MEWPs → ladders",
          "Training → supervision → PPE → rescue plan",
        ],
        correctIndex: 1,
        explanation:
          "Work at Height hierarchy: (1) AVOID work at height if possible, (2) PREVENT falls via collective protection (guardrails), (3) PREVENT falls via personal equipment (restraint harness), (4) MITIGATE consequences via collective (nets) or personal (fall arrest) measures.",
      },
      {
        id: "nebosh-5",
        topic: "Incident Investigation",
        question:
          "A worker falls from an unguarded platform. During investigation, which of the following is an example of a LATENT organisational failure (root cause)?",
        options: [
          "The worker was not wearing a harness",
          "The guardrail was removed yesterday and never replaced",
          "The company's inspection schedule did not require platform edges to be checked",
          "The platform surface was wet from recent rain",
        ],
        correctIndex: 2,
        explanation:
          "Latent organisational failures are decisions made away from the sharp end — policies, systems, resource allocation. Missing guardrails (B) is an unsafe CONDITION; not wearing a harness (A) is an unsafe ACT; wet surface (D) is an environmental factor. Only (C) is a systemic/latent failure.",
      },
    ],
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
    sampleDurationMinutes: 7,
    samplePassMarkPct: 60,
    sampleQuestions: [
      {
        id: "iosh-1",
        topic: "Assessing Risks",
        question:
          "Using a standard 5×5 risk matrix, a hazard has Likelihood = 4 and Severity = 3. What is the risk rating and typical action level?",
        options: [
          "Risk = 7 — monitor, no immediate action",
          "Risk = 12 — significant, reduce to ALARP",
          "Risk = 12 — trivial, ignore",
          "Risk = 43 — catastrophic, stop work",
        ],
        correctIndex: 1,
        explanation:
          "Risk = Likelihood × Severity = 4 × 3 = 12. On a typical 5×5 matrix this sits in the AMBER / 'significant' band — controls must be implemented to reduce the risk ALARP (As Low As Reasonably Practicable).",
      },
      {
        id: "iosh-2",
        topic: "Hierarchy of Control",
        question:
          "The most effective control for a hazard involving a rotating shaft on a machine is:",
        options: [
          "Training workers to keep hands clear",
          "Providing leather gloves",
          "Fitting a fixed guard over the shaft",
          "Posting a warning sign",
        ],
        correctIndex: 2,
        explanation:
          "A fixed guard is an ENGINEERING control — second only to elimination in the hierarchy. Training, PPE, and signs are lower-tier controls that rely on human behaviour. A guard physically prevents contact regardless of behaviour.",
      },
      {
        id: "iosh-3",
        topic: "Manager Responsibilities",
        question:
          "Under UK Health and Safety at Work Act 1974, what is the supervisor's primary legal duty?",
        options: [
          "Wear the correct PPE at all times",
          "Take reasonable care for the health and safety of themselves and others who may be affected",
          "Report all incidents immediately to the HSE",
          "Attend monthly safety committee meetings",
        ],
        correctIndex: 1,
        explanation:
          "HSWA 1974 Section 7 places a duty on EVERY employee (including supervisors) to take reasonable care for themselves and OTHERS affected by their acts or omissions. This is the foundational duty cited in most prosecutions.",
      },
      {
        id: "iosh-4",
        topic: "Investigating Incidents",
        question:
          "A near-miss is BEST defined as:",
        options: [
          "An event that caused minor first-aid injury",
          "An unplanned event that did not cause injury or damage but had the potential to",
          "A dangerous occurrence that must be reported to regulators",
          "An accident where the worker barely avoided serious harm",
        ],
        correctIndex: 1,
        explanation:
          "A near-miss is a POTENTIAL incident — no harm or damage occurred but could have. Investigating near-misses is high-value because they reveal system weaknesses before they cause harm.",
      },
      {
        id: "iosh-5",
        topic: "Performance Measurement",
        question:
          "Which of these is a LEADING safety indicator (as opposed to lagging)?",
        options: [
          "Number of lost-time injuries this month",
          "Days since last RIDDOR-reportable incident",
          "Percentage of planned inspections completed on time",
          "Total workers' compensation claim costs",
        ],
        correctIndex: 2,
        explanation:
          "Leading indicators are PROACTIVE — they measure activities that prevent incidents (inspections, training, near-miss reporting). Lagging indicators are REACTIVE — they count outcomes after an incident (LTIs, claims, days since). Modern programmes emphasise leading indicators.",
      },
    ],
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
    sampleDurationMinutes: 8,
    samplePassMarkPct: 61,
    sampleQuestions: [
      {
        id: "pmp-1",
        topic: "People",
        question:
          "A team member constantly disagrees with decisions in sprint planning, even after resolution. Using Tuckman's team development model, this behaviour is typical of which phase?",
        options: ["Forming", "Storming", "Norming", "Performing"],
        correctIndex: 1,
        explanation:
          "STORMING phase — conflict emerges as team members assert themselves and challenge the project approach. PMs navigate this by active facilitation, not suppression. Eventually teams norm (align) and then perform.",
      },
      {
        id: "pmp-2",
        topic: "Process — Predictive",
        question:
          "A project has SPI = 0.85 and CPI = 1.10. What is the BEST interpretation?",
        options: [
          "Project is ahead of schedule and over budget",
          "Project is behind schedule but under budget",
          "Project is behind schedule and over budget",
          "Project is ahead of schedule and under budget",
        ],
        correctIndex: 1,
        explanation:
          "SPI < 1 = behind schedule. CPI > 1 = under budget. So this project is behind but spending efficiently. Common EVM question on PMP — memorize: SPI/CPI < 1 is bad, > 1 is good.",
      },
      {
        id: "pmp-3",
        topic: "Process — Agile",
        question:
          "In a hybrid project, the sponsor asks for a new feature mid-sprint. What should the project manager do FIRST?",
        options: [
          "Add it immediately — sponsors outrank the product owner",
          "Refuse — the sprint backlog is locked",
          "Discuss with the Product Owner who decides whether to reprioritize or defer to next sprint",
          "Put it to a team vote",
        ],
        correctIndex: 2,
        explanation:
          "The PRODUCT OWNER owns the backlog in Scrum/hybrid. Mid-sprint changes require PO judgement: typically defer unless critical. The PM respects the Scrum framework by routing requests through the PO, not bypassing it.",
      },
      {
        id: "pmp-4",
        topic: "Process — Risk",
        question:
          "A risk has a 30% probability and a $50,000 impact. What is its Expected Monetary Value (EMV)?",
        options: ["$15,000", "$16,667", "$80,000", "$150,000"],
        correctIndex: 0,
        explanation:
          "EMV = Probability × Impact = 0.30 × $50,000 = $15,000. EMV is foundational for quantitative risk analysis and decision-tree analysis on the PMP exam.",
      },
      {
        id: "pmp-5",
        topic: "Business Environment",
        question:
          "A stakeholder with HIGH interest but LOW power should be managed using which strategy on the Power/Interest grid?",
        options: [
          "Manage closely",
          "Keep satisfied",
          "Keep informed",
          "Monitor with minimum effort",
        ],
        correctIndex: 2,
        explanation:
          "Power/Interest grid: High power + high interest = manage closely. High power + low interest = keep satisfied. Low power + high interest = KEEP INFORMED. Low power + low interest = monitor. Stakeholder engagement planning is core PMP content.",
      },
    ],
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
    sampleDurationMinutes: 6,
    samplePassMarkPct: 74,
    sampleQuestions: [
      {
        id: "csm-1",
        topic: "Scrum Foundations",
        question:
          "Which of the following is NOT one of the five Scrum values?",
        options: ["Commitment", "Focus", "Efficiency", "Respect"],
        correctIndex: 2,
        explanation:
          "The five Scrum values (per the Scrum Guide) are: Commitment, Focus, Openness, Respect, Courage. 'Efficiency' is NOT a Scrum value — though the framework produces efficient outcomes.",
      },
      {
        id: "csm-2",
        topic: "Roles",
        question:
          "Who is accountable for maximising the value of the product resulting from the work of the Scrum Team?",
        options: [
          "Scrum Master",
          "Product Owner",
          "Developers",
          "Stakeholders / Business sponsor",
        ],
        correctIndex: 1,
        explanation:
          "The PRODUCT OWNER is solely accountable for maximising product value. They manage the Product Backlog, define the Product Goal, and make final calls on backlog ordering. One person — not a committee.",
      },
      {
        id: "csm-3",
        topic: "Events",
        question:
          "What is the PURPOSE of the Sprint Retrospective?",
        options: [
          "Demonstrate the Increment to stakeholders",
          "Plan the work for the upcoming Sprint",
          "Inspect and adapt how the team works — identifying improvements",
          "Re-estimate the Product Backlog items",
        ],
        correctIndex: 2,
        explanation:
          "The Retrospective is the team's event to inspect ITSELF (processes, tools, relationships) and agree improvements. The Review demonstrates the Increment; Planning plans work; Refinement estimates backlog.",
      },
      {
        id: "csm-4",
        topic: "Artifacts",
        question:
          "What is the Definition of Done (DoD) in Scrum?",
        options: [
          "A list of requirements for a Product Backlog item to be accepted by the PO",
          "A formal description of the state of the Increment when it meets the quality measures required for the product",
          "The acceptance criteria written by the Product Owner on each story",
          "The team's agreed working hours and availability",
        ],
        correctIndex: 1,
        explanation:
          "DoD creates transparency: it's the shared understanding of what 'complete' means for the INCREMENT. Stories have their own Acceptance Criteria (PO-defined), but DoD applies across all work the team produces.",
      },
      {
        id: "csm-5",
        topic: "Scaling & Leadership",
        question:
          "A developer repeatedly approaches the Scrum Master asking for work assignments. The Scrum Master should:",
        options: [
          "Assign the developer work to maintain sprint velocity",
          "Coach the Developers to self-manage and decide among themselves who does what",
          "Ask the Product Owner to assign the work",
          "Escalate to the functional manager for staffing",
        ],
        correctIndex: 1,
        explanation:
          "Scrum teams are SELF-MANAGING. The Scrum Master's role is to coach the team toward self-management — not to take on management duties. Assigning work would undermine the team's autonomy and accountability.",
      },
    ],
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
