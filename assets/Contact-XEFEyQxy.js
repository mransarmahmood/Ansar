import{a as e,o as t,t as n}from"./index-11SiVjkS.js";import{t as r}from"./PageHtml-DGqpv0TQ.js";var i=t(e(),1),a=n(),o=`

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-envelope" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span>
        <span class="breadcrumb__current">Contact</span>
      </nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Get in Touch</span>
        <h1>Let's Work Together</h1>
        <p>Whether you need a strategic HSE advisor, a  coach, a Power BI dashboard, or an AI-powered safety solution — Ansar Mahmood is ready to help. Reach out using any of the options below.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="grid grid-2" style="gap:64px;align-items:start;">

        <!-- Contact Form -->
        <div class="reveal reveal--left">
          <h2 style="margin-bottom:8px;">Send a Message</h2>
          <p style="margin-bottom:32px;">Complete the form and Ansar will respond personally within 24 hours.</p>

          <form id="contact-form" novalidate>
            <!-- Honeypot -->
            <div class="form-honeypot" aria-hidden="true">
              <input type="text" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="name">Full Name <span style="color:var(--danger)">*</span></label>
                <input type="text" id="name" name="name" class="form-control" placeholder="John Smith" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="email">Email Address <span style="color:var(--danger)">*</span></label>
                <input type="email" id="email" name="email" class="form-control" placeholder="john@company.com" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="phone">Phone / WhatsApp</label>
                <input type="tel" id="phone" name="phone" class="form-control" placeholder="+1 234 567 8900" />
              </div>
              <div class="form-group">
                <label class="form-label" for="company">Company / Organisation</label>
                <input type="text" id="company" name="company" class="form-control" placeholder="Acme Corporation" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="service">Service of Interest</label>
              <select id="service" name="service" class="form-control">
                <option value="">Select a service...</option>
                <optgroup label="Consulting">
                  <option>HSE Consulting &amp; Advisory</option>
                  <option>Audits &amp; Gap Analysis</option>
                  <option>Incident Investigation &amp; RCA</option>
                  <option>Management Systems (ISO)</option>
                  <option>Fractional HSE Leadership / Retainer</option>
                </optgroup>
                <optgroup label="Training">
                  <option>Corporate HSE Training</option>
                  <option> Coaching</option>
                  <option>IOSH / ISO Certification Coaching</option>
                  <option>ASP / CSP / CRSP Exam Prep</option>
                  <option>E-learning &amp; LMS Development</option>
                </optgroup>
                <optgroup label="Digital &amp; AI">
                  <option>AI Solutions &amp; AI Agents</option>
                  <option>Power BI HSE Dashboards</option>
                  <option>SharePoint Solutions</option>
                  <option>Safety Apps &amp; Software</option>
                  <option>Digital Transformation</option>
                </optgroup>
                <optgroup label="Corporate">
                  <option>Corporate Solutions / Retainer Partnership</option>
                  <option>ESG &amp; Sustainability Support</option>
                </optgroup>
                <option value="other">Other / General Enquiry</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="budget">Approximate Budget Range</label>
              <select id="budget" name="budget" class="form-control">
                <option value="">Prefer not to say</option>
                <option>Under $5,000</option>
                <option>$5,000 – $15,000</option>
                <option>$15,000 – $50,000</option>
                <option>$50,000 – $150,000</option>
                <option>$150,000+</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">Your Message <span style="color:var(--danger)">*</span></label>
              <textarea id="message" name="message" class="form-control" rows="5" placeholder="Please describe your requirements, challenges, or questions..." required></textarea>
            </div>

            <button type="submit" class="btn btn-gold btn-lg" style="width:100%;justify-content:center;">
              <i class="fas fa-paper-plane"></i> Send Message
            </button>

            <div class="form-status" role="alert" aria-live="polite"></div>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="reveal reveal--right">
          <h2 style="margin-bottom:8px;">Get in Touch Directly</h2>
          <p style="margin-bottom:32px;">Prefer a more direct approach? Use any of the channels below. Ansar responds to all enquiries personally.</p>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fas fa-envelope"></i></div>
            <div>
              <div class="contact-info-item__label">Email</div>
              <div class="contact-info-item__value"><a href="mailto:<?= cms_e($settings['email'] ?? 'ansar@ansarmahmood.com') ?>"><?= cms_e($settings['email'] ?? 'ansar@ansarmahmood.com') ?></a></div>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon--gold"><i class="fab fa-whatsapp"></i></div>
            <div>
              <div class="contact-info-item__label">WhatsApp</div>
              <div class="contact-info-item__value"><a href="https://wa.me/<?= cms_e($settings['whatsapp'] ?? '12345678900') ?>?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project">Chat on WhatsApp</a></div>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fas fa-phone"></i></div>
            <div>
              <div class="contact-info-item__label">Phone</div>
              <div class="contact-info-item__value"><a href="tel:<?= cms_e($settings['phone'] ?? '+12345678900') ?>"><?= cms_e($settings['phone'] ?? '+1 (234) 567-8900') ?></a></div>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon--gold"><i class="fab fa-linkedin-in"></i></div>
            <div>
              <div class="contact-info-item__label">LinkedIn</div>
              <div class="contact-info-item__value"><a href="<?= cms_e($settings['linkedin'] ?? 'https://www.linkedin.com/in/ansar-mahmood') ?>" target="_blank" rel="noopener">LinkedIn Profile</a></div>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="fas fa-globe"></i></div>
            <div>
              <div class="contact-info-item__label">Availability</div>
              <div class="contact-info-item__value">Available Globally — Remote &amp; On-site Worldwide</div>
            </div>
          </div>

          <!-- Response Promise -->
          <div class="alert alert-gold" style="margin-top:32px;">
            <i class="fas fa-clock"></i>
            <div>
              <strong>Response Commitment</strong><br>
              <span style="font-size:.9rem;">All enquiries receive a personal response from Ansar within 24 business hours. For urgent matters, WhatsApp is the fastest channel.</span>
            </div>
          </div>

          <!-- Quick CTA -->
          <div style="background:var(--navy);border-radius:var(--radius);padding:28px;margin-top:28px;text-align:center;">
            <h4 style="color:var(--white);margin-bottom:10px;">Prefer to Just Talk?</h4>
            <p style="color:rgba(255,255,255,.65);font-size:.9rem;margin-bottom:20px;">Book a free 30-minute call directly in Ansar's calendar — no forms, no gatekeepers.</p>
            <a href="book-consultation.html" class="btn btn-gold" style="width:100%;justify-content:center;">
              <i class="fas fa-calendar-check"></i> Book a Free Call
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

`;function s(){return(0,i.useEffect)(()=>{document.title=`Contact Ansar Mahmood | HSE Consulting Enquiries`},[]),(0,a.jsx)(r,{html:o})}export{s as default};