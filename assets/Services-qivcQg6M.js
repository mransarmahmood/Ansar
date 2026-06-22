import{i as e,n as t,t as n}from"./jsx-runtime-ByY1xr43.js";import{o as r,u as i}from"./index-CUN4dMnJ.js";import{t as a}from"./PageHtml-D5xLXe8S.js";var o=e(t(),1),s=n(),c=[{src:`assets/images/poster-certification.png`,to:`/certification-coaching`,label:`Certification Services`},{src:`assets/images/poster-consultancy.png`,to:`/consulting`,label:`Consultancy Services`},{src:`assets/images/poster-training.png`,to:`/training`,label:`Training Services`},{src:`assets/images/poster-management-systems.png`,to:`/management-systems`,label:`Safety Management Systems`},{src:`assets/images/poster-ai.png`,to:`/ai-solutions`,label:`AI Integration`}];function l(){return(0,s.jsx)(`section`,{className:`svc-gallery`,"aria-label":`Service overview`,children:(0,s.jsxs)(`div`,{className:`container`,children:[(0,s.jsxs)(`div`,{className:`svc-gallery__head`,children:[(0,s.jsx)(`span`,{className:`svc-gallery__eyebrow`,children:`What I Deliver`}),(0,s.jsx)(`h2`,{className:`svc-gallery__title`,children:`Services at a Glance`})]}),(0,s.jsx)(`div`,{className:`svc-gallery__grid`,children:c.map(e=>(0,s.jsxs)(i,{to:e.to,className:`svc-gallery__item`,"aria-label":e.label,children:[(0,s.jsx)(`img`,{src:r(e.src),alt:e.label,loading:`lazy`,decoding:`async`}),(0,s.jsxs)(`span`,{className:`svc-gallery__bar`,children:[e.label,` `,(0,s.jsx)(`i`,{className:`fas fa-arrow-right`})]})]},e.to))})]})})}var u=`

  <section class="page-hero" aria-labelledby="services-hero-heading">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-cogs" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a>
        <span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span>
        <span class="breadcrumb__current">Services</span>
      </nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">12 Service Categories</span>
        <h1 id="services-hero-heading">Comprehensive HSE &amp; Digital Solutions</h1>
        <p>One globally trusted expert covering the full spectrum of health, safety, environment, training, digital transformation, and AI solutions — everything your organisation needs to achieve safety excellence.</p>
        <div class="page-hero__actions">
          <a href="book-consultation.html" class="btn btn-gold btn-lg"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
          <a href="contact.html" class="btn btn-outline-white btn-lg">Get a Quote</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Service Categories (CMS-driven) -->
  <section class="section section-white">
    <div class="container">

      
      <div class="svc-category-group reveal">
        <div class="category-header ">
          <div class="category-header__icon"><i class="fas "></i></div>
          <div class="category-header__body">
            <div class="category-header__label"></div>
            <h2 class="category-header__title"></h2>
          </div>
          <div class="category-header__cta">
            <a href="" class="btn btn-outline-blue btn-sm">Explore <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="grid grid-3 gap">
          
          <div class="service-card service-card--premium reveal reveal--up">
            <div class="service-card__icon"><i class="fas fa-cog"></i></div>
            <h3 class="service-card__title"></h3>
            <p class="service-card__desc"></p>
            <a href="" class="service-card__link">Learn More <i class="fas fa-arrow-right"></i></a>
          </div>
          
        </div>
      </div>
      

    </div>
  </section>

  <!-- CTA -->
  <section class="cta-banner section">
    <div class="container">
      <div class="cta-banner__content">
        <span class="eyebrow eyebrow--white">Get Started</span>
        <h2>Not Sure Which Service You Need?</h2>
        <p>Book a free 30-minute consultation and Ansar will help you identify the right solution for your specific challenges, budget, and timeline.</p>
        <div class="cta-banner__actions">
          <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
          <a href="contact.html" class="btn btn-outline-white btn-xl">Ask a Question</a>
        </div>
      </div>
    </div>
  </section>

`;function d(){(0,o.useEffect)(()=>{document.title=`HSE Services | Ansar Mahmood — Consulting, Training, AI & Digital Solutions`},[]);let e=u.indexOf(`</section>`)+10;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{html:u.slice(0,e)}),(0,s.jsx)(l,{}),(0,s.jsx)(a,{html:u.slice(e)})]})}export{d as default};