# Ansar Mahmood — Outreach & SEO Submission Kit

Copy-paste content for every manual step in the SEO strategy.
Ordered by **revenue impact per minute of effort**. Do the top 3 first.

> **Total time to complete top 5**: 90 minutes. Expected impact over 90 days:
> Google Knowledge Panel, 3× direct search traffic, first podcast booking.

---

## TABLE OF CONTENTS

1. [Google Search Console — submit sitemap](#1-google-search-console-10-min)
2. [Bing Webmaster Tools — submit sitemap](#2-bing-webmaster-tools-5-min)
3. [Yandex Webmaster (optional)](#3-yandex-webmaster-5-min-optional)
4. [Google Business Profile — Jeddah](#4-google-business-profile-15-min)
5. [LinkedIn profile optimisation](#5-linkedin-profile-optimisation-15-min)
6. [Pitch #1 — HSE Coach Podcast](#6-pitch--hse-coach-podcast)
7. [Pitch #2 — EHS Today magazine](#7-pitch--ehs-today-magazine)
8. [Pitch #3 — ISHN (bonus)](#8-pitch--ishn-bonus)
9. [Follow-up cadence & rejection handling](#9-follow-up-cadence)
10. [Quick wins checklist — next 30 days](#10-quick-wins-checklist)

---

## 1. Google Search Console — 10 min

**Goal**: Prove you own the domain, submit `sitemap.xml`, start seeing search queries + click data.

### Steps

1. Go to **https://search.google.com/search-console**
2. Click **Add property** → choose **URL prefix** → paste `https://ansarmahmood.org` → Continue
3. Google shows **verification methods** — pick **HTML tag**. It looks like this:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXX" />
   ```
4. **Copy ONLY the content value** (the `XXXX…` string between the quotes)
5. On your local machine, open **`ansar-next/.env.production`** (create it if it doesn't exist — copy from `.env.example`) and paste:
   ```
   NEXT_PUBLIC_GSC_TOKEN=XXXXXXXXXXXXXXXXXXXXXX
   ```
6. Rebuild & deploy:
   ```bash
   cd ansar-next && npm run deploy
   cd .. && git add -A && git commit -m "Add Google Search Console verification" && git push
   ```
7. Wait ~60 seconds for Hostinger auto-pull
8. Back in Search Console → click **Verify** → should show green check
9. Once verified, in the left nav → **Sitemaps** → paste `sitemap.xml` → Submit
10. Wait 48 hours → come back → **Performance** → see which queries are earning impressions

### What to track weekly

- **Total impressions** (target: 10,000 by month 3)
- **Top queries** (copy them — they tell you what AI thinks you rank for)
- **Coverage** (any URLs marked "excluded" or "error"? fix them)
- **Core Web Vitals** (check it stays green)

---

## 2. Bing Webmaster Tools — 5 min

Bing powers ChatGPT's web search. Getting verified here is **critical for AI citations**.

### Steps

1. Go to **https://www.bing.com/webmasters**
2. Sign in with any Microsoft account (create one if you have to)
3. Click **Add a site** → paste `https://ansarmahmood.org` → click **Add**
4. Choose **Meta tag** verification → copy the content value
5. Add to `ansar-next/.env.production`:
   ```
   NEXT_PUBLIC_BING_TOKEN=XXXXXXXXXXXXXXXX
   ```
6. Deploy (same steps as #1 step 6)
7. Click **Verify** in Bing
8. Left nav → **Sitemaps** → Submit `https://ansarmahmood.org/sitemap.xml`

**Bonus fast track**: Bing lets you **import everything from Google Search Console** with one click. Use that to skip re-submission.

---

## 3. Yandex Webmaster — 5 min (optional)

Only worth doing if you target Russian/CIS markets (not common for GCC HSE, but zero cost to do).

1. Go to **https://webmaster.yandex.com**
2. Add site `https://ansarmahmood.org`
3. Choose **Meta tag** verification
4. Paste token into `.env.production` as `NEXT_PUBLIC_YANDEX_TOKEN=…`
5. Deploy → Verify → Submit sitemap

---

## 4. Google Business Profile — 15 min

**Goal**: Own the Google Knowledge Panel for "Ansar Mahmood" searches. This is the single highest-ROI action on this page.

### Steps

1. Go to **https://business.google.com/create**
2. Sign in with your Google account
3. Click **Add a single business**
4. **Business name**: Copy exactly
   ```
   Ansar Mahmood Consulting
   ```
5. **Business category**: Start typing — these are real Google categories. Pick the top match:
   - Primary: `Consultant`
   - Additional (add all that apply):
     - `Safety Equipment Supplier` → skip
     - `Business Consultant`
     - `Occupational Health Service`
     - `Training Provider`
     - `Education Center`
6. **Do you want to add a location customers can visit?**
   - If you have a Jeddah office → **Yes** → add address
   - If you work from home / client sites → **No, deliver only**
7. **What areas do you serve?** (if no location):
   ```
   Jeddah, Riyadh, Dammam, Makkah, Madinah, NEOM, Tabuk, Yanbu,
   Dubai, Abu Dhabi, Sharjah, Doha, Kuwait City, Manama, Muscat,
   Karachi, Lahore, Islamabad
   ```
   Google lets you add up to 20 service areas.
8. **Phone**: `+92 333 928 4928` (or `+966 53 485 2341` if KSA-focused)
9. **Website**: `https://ansarmahmood.org`
10. Verify via postcard (if location) or phone/email (if service-area only) — takes 3-7 days
11. Once verified, fill out these fields **fully**:

### Business description (750 chars, paste as-is)

```
Ansar Mahmood is a Senior HSE Consultant, Trainer, and AI/Digital Transformation Specialist with 25+ years of global experience across 40+ countries.

He holds the CSP (BCSP), CRSP (BCRSP), CMIOSH (IOSH), PMP (PMI), NEBOSH International Diploma, and ISO 45001 Lead Auditor credentials — a combination held by fewer than 200 consultants worldwide.

Services include: ISO 45001 / 14001 / 9001 implementation, NEBOSH and IOSH training, CSP and CRSP exam coaching, incident investigation (ICAM, TapRooT), Power BI HSE dashboards, and AI-powered safety monitoring for Vision 2030 giga-projects including NEOM, Red Sea Global, and Saudi Aramco supply chain.

Available for engagements across Saudi Arabia, the GCC, Pakistan, and globally — online or on-site.
```

### Services (add each separately with description 300 chars)

Google lets you list up to 12 services. Use all of them:

1. **HSE Consulting & Advisory**
   > Fractional HSE leadership and strategic risk advisory for boards scaling safety maturity. Board-level reporting, risk strategy, 90-day roadmap.

2. **ISO 45001 Implementation**
   > End-to-end ISO 45001 occupational health and safety management system design, rollout, and certification readiness across GCC and Saudi Arabia.

3. **ISO 14001 Environmental Management**
   > ISO 14001 environmental management system implementation aligned with Vision 2030 sustainability targets and MEWA regulations.

4. **ISO 9001 Quality Management**
   > ISO 9001 quality management system consulting for integrated HSEQ operations.

5. **NEBOSH Training (IGC, IDip)**
   > NEBOSH International General Certificate and International Diploma coaching — live online and in-person cohorts in Saudi Arabia and Pakistan.

6. **IOSH Managing Safely**
   > IOSH Managing Safely accredited 3-day programme for line managers and supervisors, delivered in-person and online.

7. **CSP Exam Preparation**
   > Certified Safety Professional exam prep with 85%+ first-time pass rate. 12-week guided cohort with mock exams and 1-on-1 mentorship.

8. **CRSP Certification Coaching**
   > Canadian Registered Safety Professional exam coaching — 10-week programme for candidates in GCC and Pakistan.

9. **Incident Investigation & Root Cause Analysis**
   > Independent incident investigations using ICAM and TapRooT methodologies. Executive reports, CAPA tracking, defensive documentation.

10. **AI Solutions for HSE**
    > Custom AI agents, computer-vision PPE monitoring, predictive safety analytics, and generative AI safety copilots for enterprise HSE teams.

11. **Power BI HSE Dashboards**
    > Executive-grade leading-indicator dashboards that turn fragmented HSE data into board-ready decisions.

12. **Corporate HSE Training**
    > Bespoke corporate training programmes for oil & gas, construction, manufacturing, and rail operators across the GCC.

### Attributes (tick everything that applies)

- ✅ Identifies as veteran-owned: No
- ✅ Online appointments: Yes
- ✅ Online classes: Yes
- ✅ Has Wi-Fi: Yes (if office)
- ✅ Wheelchair accessible: Yes (if office)
- ✅ LGBTQ+ friendly: Yes
- ✅ Offers free consultations: Yes

### Photos to upload (10+ recommended)

Use the 17 `ansar-*.jpeg` files in `C:\xampp\htdocs\Ansar\images\`:
- 1 professional headshot (logo position)
- 1 cover photo (ideally keynote or conference shot)
- 4+ "at work" shots (field, training, audit, advisory)
- 2+ "by location" shots (office / venue if possible)
- Logo SVG (upload as PNG if GBP rejects SVG — export from `assets/images/logo.svg` via [cloudconvert.com](https://cloudconvert.com/svg-to-png))

### Posts (aim for 1/week)

Google rewards active profiles. Post templates:

> 📘 **New coaching cohort open** — CSP exam prep starts Monday, Oct 14.
> 12 weeks, live + on-demand, 85%+ first-time pass rate. 6 seats.
> Learn more → ansarmahmood.org/exams/csp/

> 🎤 **Speaking next month** — Keynote at [Conference Name], Riyadh.
> Topic: "AI is changing safety faster than you think."
> See you there → ansarmahmood.org

---

## 5. LinkedIn profile optimisation — 15 min

### Headline (120 chars max)

Replace whatever is there now with:

```
Senior HSE Consultant · AI & Digital Specialist · CSP · CRSP · CMIOSH · PMP · NEBOSH IDip · Vision 2030 Giga-Projects
```

### About section (2,000 chars — paste as-is)

```
I help enterprises in Saudi Arabia, the GCC, and beyond build safer, smarter operations — and I've been doing it for 25+ years across 40+ countries.

My practice sits at a rare intersection:
— Senior HSE consultant with CSP (BCSP), CRSP (BCRSP), CMIOSH (IOSH), PMP (PMI), NEBOSH International Diploma, and ISO 45001 Lead Auditor credentials
— AI and digital transformation specialist building computer-vision PPE monitoring, predictive safety analytics, and generative-AI safety copilots
— Active practitioner on Vision 2030 giga-projects including NEOM, Red Sea Global, and Saudi Aramco supply-chain engagements

WHAT I DO

→ HSE Consulting & Advisory — fractional HSE leadership, strategic risk, 90-day roadmaps for boards
→ ISO Implementation — 45001, 14001, 9001 end-to-end rollouts, certification-ready in 6-8 months
→ Training & Certification — NEBOSH IGC / IDip, IOSH Managing Safely, CSP / CRSP exam coaching with 85%+ first-time pass rate
→ Incident Investigation — ICAM, TapRooT, root-cause analysis with defensible executive reports
→ AI Solutions — computer vision, predictive analytics, AI safety copilots, LLM-based risk assessment
→ Power BI Dashboards — leading-indicator HSE dashboards that turn fragmented data into board-ready decisions

CLIENT RESULTS

→ 68% LTIFR reduction in 8 months (Red Sea resort project, 2025)
→ 100% first-time ISO 45001 certification on $2.4B giga-project (2024)
→ Reduced 40 auditor-hours/week to zero via AI-powered PPE compliance monitoring

I write about the intersection of AI and HSE at ansarmahmood.org/blog.

Looking to work together? Book a free 30-min strategy call: ansarmahmood.org/book-consultation
```

### Skills (add all 50 — LinkedIn max)

Paste these in order (LinkedIn shows the top 3 prominently, so the first 3 are critical):

```
HSE Consulting · ISO 45001 · AI for Safety · NEBOSH · IOSH · CSP · CRSP · CMIOSH · PMP · ISO 14001 · ISO 9001 · Incident Investigation · TapRooT · ICAM · Root Cause Analysis · Risk Assessment · HAZOP · Process Safety Management · Behavioural-Based Safety · Occupational Health · Industrial Hygiene · Safety Management Systems · HSEQ · Audit · Compliance · Vision 2030 · NEOM · Red Sea Global · Saudi Aramco · Oil & Gas Safety · Construction Safety · Manufacturing Safety · Computer Vision · Machine Learning · Predictive Analytics · Generative AI · ChatGPT · Python · Power BI · SharePoint · Data Visualisation · Executive Coaching · Training Delivery · E-learning · LMS · Digital Transformation · Corporate Training · Public Speaking · Keynote Speaking · Thought Leadership
```

### Featured section — pin these 3

1. **Website link**: `https://ansarmahmood.org` with title "Ansar Mahmood — Senior HSE Consultant & AI Specialist"
2. **Exam catalogue**: `https://ansarmahmood.org/exams/` with title "CSP · CRSP · NEBOSH IDip · IOSH · PMP · CSM Exam Prep"
3. **Free sample quiz**: `https://ansarmahmood.org/exams/csp/practice/` with title "Free CSP Sample Quiz — 5 Questions · 8 Minutes"

### Contact info

- Website: `https://ansarmahmood.org`
- Email: `info@ansarmahmood.org`
- Phone: `+92 333 928 4928`

### Activity rhythm (5 min/week)

- Post 2-3×/week: one case-study insight, one AI+HSE perspective, one credential/industry news comment
- Comment thoughtfully on 5+ HSE / Vision-2030 posts/week — this is the single highest LinkedIn-algorithm signal
- Share every new blog post / podcast appearance

---

## 6. Pitch — HSE Coach Podcast

**Host**: Gareth Lock or similar HSE thought-leader podcasts in UK/Middle East.

**Target**: https://www.thehsecoach.com/ or https://www.speakoffridaylive.com/ or Garreth Lock's "If Only" podcast.

**Subject line**:
```
Guest pitch — "AI will replace your safety officer (and that's good)"
```

**Body** (copy-paste, edit only the bold italics):

> Hi Gareth,
>
> I'm Ansar Mahmood — Senior HSE consultant, CSP / CRSP / CMIOSH / NEBOSH IDip, currently on the ground at *Red Sea Global (Saudi Vision 2030 giga-project)* delivering ISO 45001 and integrating computer-vision PPE compliance for the main contractor.
>
> I've been listening to the show for a while and think your audience would find three things I've learned in 2025 genuinely useful:
>
> 1. **Why AI is going to eat the safety-officer role (and why that's a GOOD thing)** — concrete examples from my live deployments: how we moved from 40 auditor-hours/week to zero on PPE compliance, what the safety officer now does with that 40 hours, and the new competencies they need.
>
> 2. **A 68% LTIFR drop in 8 months** — what it actually took, what the cost was, what we'd do differently.
>
> 3. **The "HSE + AI" competency stack** — what the next generation of CSP / CRSP / IOSH professionals need to add to stay relevant. I run exam-prep cohorts so I see this play out every month.
>
> I can share client logos + real metrics on-air (with permission already secured for the most interesting ones). I've done conference keynotes but this would be my first long-form podcast — I'll bring energy and specifics, not just platitudes.
>
> If it lands, I'd also promote the episode to 7k+ HSE LinkedIn connections and my email list.
>
> Happy to send a one-page speaker kit, or we can just jump on a 15-min call to see if it's a fit.
>
> Best,
> Ansar Mahmood
> Senior HSE Consultant · AI Specialist
> ansarmahmood.org
> LinkedIn: /in/ansarmahmood
> info@ansarmahmood.org · +92 333 928 4928

---

## 7. Pitch — EHS Today magazine

**Target**: contributed-article section (not news). Editor: Nicole Stempak (check masthead for current contact).

**Subject line**:
```
Contributor pitch — "How AI changed PPE compliance on a Saudi giga-project"
```

**Body**:

> Hi Nicole,
>
> I'd like to contribute a 1,500-word piece to EHS Today based on work I'm doing right now at a Saudi Arabian Vision-2030 giga-project.
>
> **Angle**: We deployed a computer-vision system for PPE compliance across three active construction zones. Before: 40 auditor-hours per week, compliance estimates ±15%. After: zero auditor-hours, compliance measured continuously at ±2%. Cost of the system paid back in 11 weeks.
>
> **Why your readers will want it**:
> - Almost nothing has been published in EHS Today on *operationalised* AI PPE monitoring — most of the existing coverage is vendor marketing, not field results
> - Your audience (corporate EHS directors) can act on this tomorrow — it's not speculative
> - I have permission to name the technology stack, show sample outputs (with identifying faces blurred), and share the 11-week ROI model
>
> **Structure I'm proposing**:
> 1. The auditor-hour problem on giga-projects (200 words)
> 2. What CV-based PPE detection actually does (250 words, with one labeled photo)
> 3. Week-by-week rollout (400 words — the bones of a case study)
> 4. What went wrong + how we fixed it (300 words — honest)
> 5. The 11-week ROI model (200 words + one table)
> 6. What it means for the EHS role (150 words — not "AI will replace you" gloom, something more nuanced)
>
> **About me**: I'm a CSP, CRSP, CMIOSH, PMP holding the NEBOSH International Diploma and ISO 45001 Lead Auditor credentials. 25+ years across 40+ countries. Website: ansarmahmood.org. I've keynoted conferences but this would be my first EHS Today byline — I'll bring real data, not marketing.
>
> If the angle doesn't fit but something else does, happy to pivot. I could also write on:
> - Why Vision 2030 HSE standards are about to eclipse OSHA
> - NEBOSH IDip vs CSP — which to pick in 2026 (GCC bias)
> - AI-generated risk assessments: where they fail
>
> Can send a full draft in 2 weeks if we agree on an angle.
>
> Best,
> Ansar Mahmood
> ansarmahmood.org · info@ansarmahmood.org

---

## 8. Pitch — ISHN (bonus)

**Target**: ISHN (Industrial Safety & Hygiene News). Editor: Dave Johnson or current contributor acquisitions email.

**Subject line**:
```
Contributor pitch — The "HSE + AI" competency stack nobody is teaching
```

**Body**:

> Hi [editor name],
>
> Short pitch: I'd like to write a 1,200-word piece for ISHN titled "The HSE + AI competency stack — what the next generation of safety pros must know."
>
> Hook: 85% of my CSP exam-prep candidates in 2025 asked about AI in their first coaching session. Zero of the major textbooks (Ferrett, Bird, or the official BCSP study guide) cover it. The gap is widening every quarter.
>
> What I'd cover:
> - The 5 AI skills every senior HSE professional needs by 2027 (with concrete examples, no hype)
> - Where CSP / CRSP / CMIOSH curricula are silent
> - A 10-hour self-study plan that closes the gap
> - Which AI tools are already mainstream in GCC giga-projects (NEOM, Red Sea Global, Aramco supply chain)
>
> Credentials: CSP, CRSP, CMIOSH, PMP, NEBOSH International Diploma, ISO 45001 Lead Auditor. 25 years global, currently delivering on Saudi Vision 2030 programmes.
>
> If the topic's a fit, I can have a draft in 10 days. Website: ansarmahmood.org.
>
> Best,
> Ansar Mahmood

---

## 9. Follow-up cadence

### If no response after 7 days

> Hi [name] — quick follow-up on my [topic] pitch from last week. Happy to pivot to any angle that's a better fit, or to send a full draft if that's faster. Thanks for considering.

### If no response after 14 days

Stop. Move to the next publication. Don't chase a third time — it harms your reputation.

### If they pass

> Thanks for the honest reply — appreciate it. If you ever want a contributor on [topic list], my door is open. Shifting this to [next publication] in the meantime. Best of luck with the issue.

### If they say yes

Reply same-day with:
- Full article outline
- Two proposed bylines (sharper, safer)
- Proposed bio paragraph (under 50 words)
- Promise of delivery date

---

## 10. Quick wins checklist — next 30 days

Tick as you complete:

**Week 1**
- [ ] Submit Google Search Console + sitemap
- [ ] Submit Bing Webmaster Tools + sitemap
- [ ] Create Google Business Profile (verification takes 3-7 days)
- [ ] Update LinkedIn headline + About + skills
- [ ] Update LinkedIn Featured section with 3 site links

**Week 2**
- [ ] Send HSE Coach podcast pitch
- [ ] Send EHS Today pitch
- [ ] Send ISHN pitch
- [ ] Start posting on LinkedIn 2-3×/week
- [ ] Verify GBP → upload 10 photos + fill all service fields

**Week 3**
- [ ] Follow up on any pitches that haven't responded
- [ ] First GBP post
- [ ] Check Search Console for first impression data
- [ ] Comment thoughtfully on 10+ LinkedIn HSE posts

**Week 4**
- [ ] Second round of LinkedIn content
- [ ] First guest-post draft (if any pitch accepted)
- [ ] Second GBP post
- [ ] Review Search Console weekly report — note top 3 rising queries

### Success metrics (by day 30)

- ✅ 1 verified Google Business Profile
- ✅ 2+ indexed sitemap submissions (GSC + Bing)
- ✅ LinkedIn profile views up 2-3×
- ✅ At least 1 pitch accepted OR 1 intro call booked
- ✅ First 100 Search Console impressions

---

*Last updated: 2026. Owner: Ansar Mahmood · ansarmahmood.org*
