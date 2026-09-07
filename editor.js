/* Travel Care Tours - Netlify Visual Editor content bridge */
(function () {
  const HOME_ID = 'content/pages/home.json';
  const PACKAGE_FILES = [
    'kerala-honeymoon-escape.json',
    'kerala-family-holiday.json',
    'kerala-premium-journey.json',
    'kerala-group-getaway.json'
  ];

  function annotate(el, objectId, field) {
    if (!el) return;
    el.setAttribute('data-sb-object-id', objectId);
    if (field) el.setAttribute('data-sb-field-path', field);
  }

  function text(selector, value, objectId, field) {
    const el = document.querySelector(selector);
    if (!el || value == null) return;
    el.textContent = value;
    annotate(el, objectId, field);
  }

  async function loadHome() {
    try {
      const res = await fetch('/content/pages/home.json', { cache: 'no-store' });
      if (!res.ok) return;
      const home = await res.json();
      text('.hero .eyebrow', home.heroEyebrow, HOME_ID, 'heroEyebrow');
      text('.hero h1', home.heroTitle, HOME_ID, 'heroTitle');
      const heroHighlight = document.querySelector('.hero h1 span');
      if (heroHighlight) {
        heroHighlight.textContent = home.heroHighlight;
        annotate(heroHighlight, HOME_ID, 'heroHighlight');
      }
      text('.hero-content > p', home.heroDescription, HOME_ID, 'heroDescription');
      text('#packages .section-heading h2', home.packagesHeading, HOME_ID, 'packagesHeading');
      text('#packages .section-heading > p', home.packagesDescription, HOME_ID, 'packagesDescription');
      text('.feature-band .eyebrow', home.experienceEyebrow, HOME_ID, 'experienceEyebrow');
      text('.feature-band h2', home.experienceTitle, HOME_ID, 'experienceTitle');
      text('.feature-band p', home.experienceDescription, HOME_ID, 'experienceDescription');
      text('#destinations .section-heading h2', home.destinationsHeading, HOME_ID, 'destinationsHeading');
      text('#destinations .section-heading p', home.destinationsDescription, HOME_ID, 'destinationsDescription');
      text('#why-us .section-heading h2', home.whyHeading, HOME_ID, 'whyHeading');
      text('.cta h2', home.ctaTitle, HOME_ID, 'ctaTitle');
      text('.cta p', home.ctaDescription, HOME_ID, 'ctaDescription');
      text('.enquiry-copy h2', home.enquiryHeading, HOME_ID, 'enquiryHeading');
      text('.enquiry-copy > p', home.enquiryDescription, HOME_ID, 'enquiryDescription');
    } catch (err) {
      console.warn('Visual Editor home content could not be loaded', err);
    }
  }

  async function loadPackages() {
    try {
      const results = await Promise.all(PACKAGE_FILES.map(async file => {
        const res = await fetch('/content/packages/' + file, { cache: 'no-store' });
        if (!res.ok) return null;
        return { file, data: await res.json() };
      }));
      const cards = document.querySelectorAll('.package-card');
      results.filter(Boolean).forEach((item, index) => {
        const card = cards[index];
        if (!card) return;
        const id = 'content/packages/' + item.file;
        const p = item.data;
        const location = card.querySelector('.card-image span');
        const tag = card.querySelector('.tag');
        const title = card.querySelector('h3');
        const desc = card.querySelector('.card-body > p');
        const meta = card.querySelectorAll('.meta span');
        if (location) { location.textContent = p.location; annotate(location, id, 'location'); }
        if (tag) { tag.textContent = p.tag; annotate(tag, id, 'tag'); }
        if (title) { title.textContent = p.title; annotate(title, id, 'title'); }
        if (desc) { desc.textContent = p.description; annotate(desc, id, 'description'); }
        if (meta[0]) { meta[0].textContent = p.duration; annotate(meta[0], id, 'duration'); }
        if (meta[1]) { meta[1].textContent = p.priceLabel; annotate(meta[1], id, 'priceLabel'); }
        annotate(card, id);
      });
    } catch (err) {
      console.warn('Visual Editor package content could not be loaded', err);
    }
  }

  function start() {
    loadHome();
    loadPackages();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
