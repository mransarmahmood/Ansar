import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../utils/asset';
import { PAGE_BANNER_DEFAULTS } from '../data/pageBannerDefaults';
import { studentApi } from '../lib/studentApi';

// Fetch all CMS banners once and share the promise across every PageBanner.
let _cache = null;
function loadBanners() {
  if (!_cache) {
    _cache = studentApi.listPageBanners().then((d) => d.banners || {}).catch(() => ({}));
  }
  return _cache;
}

export default function PageBanner({ route, icon = 'fa-layer-group' }) {
  const def = PAGE_BANNER_DEFAULTS[route] || {};
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let on = true;
    loadBanners().then((b) => { if (on) setCms((b && b[route]) || {}); });
    return () => { on = false; };
  }, [route]);

  const pick = (k) => (cms && cms[k]) || def[k] || '';
  const title = pick('title');
  const subtitle = pick('subtitle');
  const eyebrow = pick('eyebrow');
  const section = def.section || 'Home';
  const image = pick('image_path');
  const ctaText = pick('cta_text');
  const ctaLink = pick('cta_link');
  const cta2Text = pick('cta2_text');
  const cta2Link = pick('cta2_link');

  const isExternal = (u) => /^https?:\/\//.test(u || '');
  const renderCta = (text, link, primary) => {
    if (!text) return null;
    const cls = primary ? 'btn btn-gold btn-lg' : 'btn btn-outline-white btn-lg';
    if (isExternal(link)) return <a className={cls} href={link} target="_blank" rel="noreferrer">{text}</a>;
    return <Link className={cls} to={link || '#'}>{text}</Link>;
  };

  const style = image ? { backgroundImage: `linear-gradient(150deg, rgba(12,30,62,.86), rgba(21,38,94,.78)), url(${asset(image)})` } : undefined;

  return (
    <section className={`page-hero page-hero--gradient page-banner${image ? ' page-banner--img' : ''}`} style={style} aria-label={title || route}>
      <div className="page-hero__pattern" aria-hidden="true"></div>
      {!image && <i className={`page-hero__icon-bg fas ${icon}`} aria-hidden="true"></i>}
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><i className="fas fa-chevron-right"></i></span>
          <Link to="/services">{section}</Link>
          <span className="breadcrumb__sep"><i className="fas fa-chevron-right"></i></span>
          <span className="breadcrumb__current">{title}</span>
        </nav>
        <div className="page-hero__content">
          {eyebrow && <span className="eyebrow eyebrow--white">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {(ctaText || cta2Text) && (
            <div className="page-hero__actions">
              {renderCta(ctaText, ctaLink, true)}
              {renderCta(cta2Text, cta2Link, false)}
            </div>
          )}
          {Array.isArray(def.stats) && def.stats.length > 0 && (
            <div className="page-hero__stats">
              {def.stats.map((s, i) => (
                <div className="page-hero-stat" key={i}>
                  <span className="page-hero-stat__num">{s.num}</span>
                  <span className="page-hero-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
