import{l as e,r as t,u as n}from"./index-BxLVe0Xe.js";import{t as r}from"./PageHtml-DmBYY9NG.js";var i=n(e(),1),a=t(),o=`

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-user-graduate" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><a href="course-calendar.html">Course Calendar</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Apply</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Enrolment Application</span>
        <h1>Course Admission Form</h1>
        <p>Complete the form below to apply for your chosen course. All applications are reviewed within 24 hours and you'll receive a confirmation email with payment details and course access information.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="adm-layout">

        <!-- Main Form -->
        <div>
          <form id="admission-form" novalidate>

            <!-- Section 1: Course Selection -->
            <div class="form-section reveal">
              <h3><span class="sec-num">1</span> Course Selection</h3>
              <p>Choose the course and intake you want to apply for.</p>
              <div class="form-grid grid-1">
                <div class="field">
                  <label>Course <span class="req">*</span></label>
                  <select name="course" id="course-select" required onchange="updateCourseInfo()">
                    <option value="" disabled selected>— Select a Course —</option>
                    <optgroup label="Safety Certification">
                      <option value=" International General Certificate (IGC)"> International General Certificate (IGC)</option>
                      <option value="International Safety Diploma">International Safety Diploma</option>
                      <option value=" Certificate in Fire Safety"> Certificate in Fire Safety</option>
                    </optgroup>
                    <optgroup label="IOSH">
                      <option value="IOSH Managing Safely">IOSH Managing Safely</option>
                      <option value="IOSH Working Safely">IOSH Working Safely</option>
                    </optgroup>
                    <optgroup label="ISO Standards">
                      <option value="ISO 45001:2018 Lead Auditor">ISO 45001:2018 Lead Auditor (IRCA)</option>
                      <option value="ISO 14001:2015 Lead Auditor">ISO 14001:2015 Lead Auditor</option>
                      <option value="ISO 45001 Internal Auditor">ISO 45001 Internal Auditor</option>
                      <option value="Integrated Management Systems (IMS)">Integrated Management Systems (IMS)</option>
                    </optgroup>
                    <optgroup label="AI & Digital">
                      <option value="AI & Power BI for HSE Professionals">AI & Power BI for HSE Professionals</option>
                      <option value="SharePoint & M365 for HSE Managers">SharePoint & Microsoft 365 for HSE Managers</option>
                      <option value="Digital HSE Transformation Programme">Digital HSE Transformation Programme</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="Incident Investigation Masterclass">Incident Investigation Masterclass</option>
                      <option value="Risk Assessment Workshop">Risk Assessment Workshop</option>
                      <option value="Corporate Custom Programme">Corporate Custom Programme</option>
                    </optgroup>
                  </select>
                </div>
                <div class="field" id="intake-field">
                  <label>Preferred Intake / Start Date <span class="req">*</span></label>
                  <select name="preferred_intake" required>
                    <option value="" disabled selected>— Select Intake —</option>
                    <option value="March 2026 — Online">March 2026 — Online Live</option>
                    <option value="April 2026 — Online">April 2026 — Online Live</option>
                    <option value="April 2026 — Dubai In-Person">April 2026 — Dubai In-Person</option>
                    <option value="May 2026 — Online">May 2026 — Online Live</option>
                    <option value="June 2026 — Online">June 2026 — Online Live</option>
                    <option value="Flexible / Next Available">Flexible — Any Next Available</option>
                    <option value="Corporate On-Site — Custom Date">Corporate On-Site (Custom Date)</option>
                  </select>
                </div>
                <div class="field">
                  <label>Preferred Delivery Mode <span class="req">*</span></label>
                  <select name="delivery_mode" required>
                    <option value="" disabled selected>— Select Mode —</option>
                    <option value="Online Live">Online Live (Zoom)</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Blended">Blended (Self-Study + Live)</option>
                    <option value="Corporate On-Site">Corporate On-Site</option>
                  </select>
                </div>
              </div>
              <!-- Course info box -->
              <div id="course-info" style="display:none;margin-top:16px;" class="highlight-box">
                <strong id="course-info-title"></strong>
                <div id="course-info-detail" style="margin-top:6px;font-size:.82rem;color:var(--text-muted);"></div>
              </div>
            </div>

            <!-- Section 2: Personal Information -->
            <div class="form-section reveal">
              <h3><span class="sec-num">2</span> Personal Information</h3>
              <p>Your contact and personal details.</p>
              <div class="form-grid">
                <div class="field">
                  <label>First Name <span class="req">*</span></label>
                  <input type="text" name="first_name" required placeholder="e.g. Ahmed">
                </div>
                <div class="field">
                  <label>Last Name <span class="req">*</span></label>
                  <input type="text" name="last_name" required placeholder="e.g. Al-Rashid">
                </div>
                <div class="field">
                  <label>Email Address <span class="req">*</span></label>
                  <input type="email" name="email" required placeholder="you@example.com">
                </div>
                <div class="field">
                  <label>Phone / WhatsApp <span class="req">*</span></label>
                  <input type="tel" name="phone" required placeholder="+92 333 928 4928">
                </div>
                <div class="field">
                  <label>Date of Birth</label>
                  <input type="date" name="dob">
                </div>
                <div class="field">
                  <label>Nationality</label>
                  <select name="nationality">
                    <option value="" disabled selected>— Select —</option>
                    <option>United Arab Emirates</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Saudi Arabia</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Nigeria</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>South Africa</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="field span-2">
                  <label>Current Country of Residence <span class="req">*</span></label>
                  <input type="text" name="country" required placeholder="e.g. United Arab Emirates">
                </div>
              </div>
            </div>

            <!-- Section 3: Professional Background -->
            <div class="form-section reveal">
              <h3><span class="sec-num">3</span> Professional Background</h3>
              <p>Helps us tailor the course delivery and examples to your context.</p>
              <div class="form-grid">
                <div class="field">
                  <label>Current Job Title <span class="req">*</span></label>
                  <input type="text" name="job_title" required placeholder="e.g. HSE Manager">
                </div>
                <div class="field">
                  <label>Organisation / Employer <span class="req">*</span></label>
                  <input type="text" name="organisation" required placeholder="Company name">
                </div>
                <div class="field">
                  <label>Industry Sector</label>
                  <select name="industry">
                    <option value="" disabled selected>— Select —</option>
                    <option>Oil & Gas</option>
                    <option>Construction</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>Mining</option>
                    <option>Transport & Logistics</option>
                    <option>Utilities / Energy</option>
                    <option>Government / Public Sector</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="field">
                  <label>Years of HSE Experience</label>
                  <select name="experience_years">
                    <option value="" disabled selected>— Select —</option>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>6–10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Section 4: Educational Background -->
            <div class="form-section reveal">
              <h3><span class="sec-num">4</span> Education & Existing Qualifications</h3>
              <p>Required for eligibility assessment and academic recognition.</p>
              <div class="form-grid">
                <div class="field">
                  <label>Highest Education Level</label>
                  <select name="education_level">
                    <option value="" disabled selected>— Select —</option>
                    <option>High School / Secondary</option>
                    <option>Diploma / HND</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD / Doctorate</option>
                    <option>Professional Qualification</option>
                  </select>
                </div>
                <div class="field">
                  <label>Field of Study</label>
                  <input type="text" name="study_field" placeholder="e.g. Engineering, Science, Business">
                </div>
                <div class="field span-2">
                  <label>Existing HSE Qualifications</label>
                  <div class="check-group">
                    <label class="check-item"><input type="checkbox" name="quals[]" value=" IGC"><i class="fas fa-check"></i> <span> IGC</span></label>
                    <label class="check-item"><input type="checkbox" name="quals[]" value="IOSH MS"><i class="fas fa-check"></i> <span>IOSH Managing Safely</span></label>
                    <label class="check-item"><input type="checkbox" name="quals[]" value="ISO 45001 Internal"><i class="fas fa-check"></i> <span>ISO 45001 Internal Auditor</span></label>
                    <label class="check-item"><input type="checkbox" name="quals[]" value="OSHA 30"><i class="fas fa-check"></i> <span>OSHA 30-Hour</span></label>
                    <label class="check-item"><input type="checkbox" name="quals[]" value="None"><i class="fas fa-check"></i> <span>None yet</span></label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Motivation & Sponsorship -->
            <div class="form-section reveal">
              <h3><span class="sec-num">5</span> Motivation & Funding</h3>
              <p>Tell us your goals and how this course is being funded.</p>
              <div class="form-grid grid-1">
                <div class="field">
                  <label>Why are you applying for this course? <span class="req">*</span></label>
                  <textarea name="motivation" required placeholder="Describe your career goals and how this course fits your development plan..."></textarea>
                </div>
                <div class="field">
                  <label>Funding / Sponsorship</label>
                  <select name="funding">
                    <option value="" disabled selected>— Select —</option>
                    <option>Self-funded</option>
                    <option>Employer sponsored</option>
                    <option>Government / scholarship</option>
                    <option>Part employer / part self</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="field">
                  <label>If employer sponsored, name of sponsor / approval contact</label>
                  <input type="text" name="sponsor_name" placeholder="e.g. HR Manager / Training Department">
                </div>
              </div>
            </div>

            <!-- Section 6: Emergency Contact -->
            <div class="form-section reveal">
              <h3><span class="sec-num">6</span> Emergency Contact</h3>
              <p>Required for in-person and residential courses.</p>
              <div class="form-grid">
                <div class="field">
                  <label>Emergency Contact Name</label>
                  <input type="text" name="emergency_name" placeholder="Full name">
                </div>
                <div class="field">
                  <label>Relationship</label>
                  <input type="text" name="emergency_relationship" placeholder="e.g. Spouse, Parent">
                </div>
                <div class="field span-2">
                  <label>Emergency Contact Phone</label>
                  <input type="tel" name="emergency_phone" placeholder="+92 333 928 4928">
                </div>
              </div>
            </div>

            <!-- Section 7: Additional Info -->
            <div class="form-section reveal">
              <h3><span class="sec-num">7</span> Special Requirements & Additional Notes</h3>
              <p>Any dietary requirements, accessibility needs, scheduling constraints, or questions for our team.</p>
              <div class="form-grid grid-1">
                <div class="field">
                  <label>Special Requirements / Notes</label>
                  <textarea name="special_requirements" placeholder="e.g. dietary requirements, accessibility needs, preferred session time, or any questions about the course..."></textarea>
                </div>
                <div class="field">
                  <label>How did you hear about us?</label>
                  <select name="referral_source">
                    <option value="" disabled selected>— Select —</option>
                    <option>Google / Search Engine</option>
                    <option>LinkedIn</option>
                    <option>Colleague / Colleague Referral</option>
                    <option>Newsletter</option>
                    <option>Previous Course / Client</option>
                    <option>Social Media</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Section 8: Declaration -->
            <div class="form-section reveal">
              <h3><span class="sec-num">8</span> Declaration & Consent</h3>
              <p>Please read and agree to the following before submitting your application.</p>
              <div style="background:var(--bg,#f2f5f3);border-radius:var(--radius-sm);padding:16px 20px;font-size:.85rem;color:var(--text-muted);line-height:1.7;margin-bottom:20px;">
                By submitting this application I confirm that: (1) All information provided is accurate and complete. (2) I understand this is an application and that enrolment is subject to availability, eligibility, and payment. (3) I consent to Ansar Mahmood contacting me regarding this application and related training services. (4) I understand that course fees are due within 7 days of acceptance and that cancellation terms apply as communicated in the enrolment confirmation.
              </div>
              <div class="check-group" style="flex-direction:column;">
                <label class="check-item" style="border-radius:var(--radius-sm);width:100%;">
                  <input type="checkbox" name="declaration_accurate" required>
                  <i class="fas fa-check"></i>
                  <span>I confirm all information is accurate and complete <span class="req">*</span></span>
                </label>
                <label class="check-item" style="border-radius:var(--radius-sm);width:100%;">
                  <input type="checkbox" name="declaration_consent" required>
                  <i class="fas fa-check"></i>
                  <span>I consent to being contacted about this application and HSE training services <span class="req">*</span></span>
                </label>
                <label class="check-item" style="border-radius:var(--radius-sm);width:100%;">
                  <input type="checkbox" name="newsletter_opt">
                  <i class="fas fa-check"></i>
                  <span>I'd like to receive the free monthly HSE newsletter (optional)</span>
                </label>
              </div>
            </div>

            <!-- Honeypot -->
            <div class="form-honeypot" style="display:none;"><input type="text" name="website"></div>
            <input type="hidden" name="source" value="course-admission-form">

            <!-- Submit -->
            <div class="form-section reveal" style="background:var(--navy);border-color:var(--navy);">
              <div style="text-align:center;">
                <h3 style="color:#fff;justify-content:center;margin-bottom:8px;"><span class="sec-num" style="background:var(--gold);color:var(--navy);">✓</span> Submit Your Application</h3>
                <p style="color:rgba(255,255,255,.7);margin-bottom:24px;">You'll receive an email confirmation within 24 hours with next steps, eligibility confirmation, and payment details.</p>
                <button type="submit" class="btn btn-gold" style="font-size:1rem;padding:15px 48px;">
                  <i class="fas fa-paper-plane"></i> Submit Application
                </button>
                <div class="form-status" style="margin-top:16px;" role="alert"></div>
              </div>
            </div>

          </form>
        </div>

        <!-- Sidebar -->
        <aside class="adm-sidebar">
          <!-- Selected Course -->
          <div class="sidebar-info-card">
            <h4><i class="fas fa-graduation-cap" style="color:var(--gold);margin-right:8px;"></i> Your Application</h4>
            <div id="sidebar-course" style="background:rgba(255,255,255,.08);border-radius:var(--radius-sm);padding:14px;font-size:.88rem;color:rgba(255,255,255,.8);min-height:60px;">
              <em style="color:rgba(255,255,255,.4);">Select a course to see details</em>
            </div>
            <div style="margin-top:16px;">
              <div class="info-row"><i class="fas fa-clock"></i><span>Application review: <strong style="color:#fff;">Within 24 hours</strong></span></div>
              <div class="info-row"><i class="fas fa-envelope"></i><span>Confirmation sent by email</span></div>
              <div class="info-row"><i class="fas fa-credit-card"></i><span>Payment due within 7 days of acceptance</span></div>
              <div class="info-row"><i class="fas fa-globe"></i><span>Available to applicants worldwide</span></div>
            </div>
          </div>

          <!-- What happens next -->
          <div class="sidebar-card">
            <h5 style="margin-bottom:16px;"><i class="fas fa-list-check" style="color:var(--blue);margin-right:6px;"></i> What Happens Next</h5>
            <div class="next-step"><div class="next-num">1</div><div><strong style="font-size:.88rem;display:block;">Application Received</strong><p style="font-size:.82rem;color:var(--text-muted);margin:3px 0 0;">Auto-confirmation email sent immediately.</p></div></div>
            <div class="next-step"><div class="next-num">2</div><div><strong style="font-size:.88rem;display:block;">Eligibility Review</strong><p style="font-size:.82rem;color:var(--text-muted);margin:3px 0 0;">Our team reviews your background within 24 hours.</p></div></div>
            <div class="next-step"><div class="next-num">3</div><div><strong style="font-size:.88rem;display:block;">Enrolment Offer</strong><p style="font-size:.82rem;color:var(--text-muted);margin:3px 0 0;">You receive a formal offer with fee details and terms.</p></div></div>
            <div class="next-step"><div class="next-num">4</div><div><strong style="font-size:.88rem;display:block;">Payment & Confirmation</strong><p style="font-size:.82rem;color:var(--text-muted);margin:3px 0 0;">Pay within 7 days to secure your seat.</p></div></div>
            <div class="next-step"><div class="next-num">5</div><div><strong style="font-size:.88rem;display:block;">Welcome & Access</strong><p style="font-size:.82rem;color:var(--text-muted);margin:3px 0 0;">Course materials and join details sent 48 hrs before start.</p></div></div>
          </div>

          <!-- Have questions -->
          <div style="margin-top:20px;padding:20px 24px;background:var(--navy-xlight,#e6f4ee);border-radius:var(--radius-md);">
            <h5 style="margin-bottom:8px;"><i class="fas fa-question-circle" style="color:var(--blue);margin-right:6px;"></i> Questions Before Applying?</h5>
            <p style="font-size:.85rem;color:var(--text-muted);margin-bottom:14px;">Not sure which course is right for you? Book a free 15-minute career consultation.</p>
            <a href="book-consultation.html" class="btn btn-gold btn-sm" style="width:100%;justify-content:center;"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
            <a href="course-calendar.html" class="btn btn-outline-navy btn-sm" style="width:100%;justify-content:center;margin-top:8px;"><i class="fas fa-calendar-alt"></i> View Course Calendar</a>
          </div>
        </aside>

      </div>
    </div>
  </section>

`;function s(){return(0,i.useEffect)(()=>{document.title=`Course Admission & Enrolment Form | Ansar Mahmood HSE Training`},[]),(0,a.jsx)(r,{html:o})}export{s as default};