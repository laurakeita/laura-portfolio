/* ============================================================
   NAV: scroll shadow + active link tracking
   ============================================================ */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ============================================================
   SCROLL FADE-IN (Intersection Observer)
   ============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
const roles = [
  'Growth Marketing Professional',
  'Strategy & Operations Expert',
  'Business Development Lead',
  'HEC Paris MBA Graduate',
];

const typewriterEl = document.querySelector('.typewriter');

if (typewriterEl && !prefersReducedMotion) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let paused = false;

  function type() {
    if (paused) return;

    const current = roles[roleIndex];

    if (deleting) {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    } else {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        paused = true;
        setTimeout(() => {
          paused = false;
          deleting = true;
          type();
        }, 2200);
        return;
      }
      setTimeout(type, 85);
    }
  }

  setTimeout(type, 800);
} else if (typewriterEl) {
  typewriterEl.textContent = roles[0];
}

/* ============================================================
   SMOOTH SCROLL for anchor links (fallback for older browsers)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   GROWTH CARDS — READ MORE TOGGLE
   ============================================================ */
document.querySelectorAll('.growth-vcard-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.growth-vcard');
    const expanded = card.classList.toggle('expanded');
    btn.textContent = expanded ? 'Show less' : 'Read more';
    btn.setAttribute('aria-expanded', expanded);
  });
});

/* ============================================================
   BRANDING MODAL
   ============================================================ */
const brandingData = [
  {
    tag: 'Brand Identity · Growth',
    title: 'Olivia Yao Jewellery — Brand & Growth Strategy',
    desc: 'Led end-to-end brand identity and growth strategy for a premium jewellery brand expanding into Hong Kong and Japan. Developed visual merchandising guidelines, KOL partnership frameworks, and a multichannel acquisition funnel that drove +43% GMV YoY. Co-developed new product lines through strategic creator partnerships, expanding the brand into adjacent home décor categories.',
    tags: ['Brand Identity', 'GTM', 'HK & Japan', 'Visual Direction', 'A/B Testing', '+43% GMV'],
    bg: 'linear-gradient(145deg,#e8d5b7 0%,#c49050 38%,#8b6820 68%,#5c420e 100%)'
  },
  {
    tag: 'Social & KOL Marketing',
    title: 'KOL Campaign Creatives — Fashion & Jewellery',
    desc: 'Co-developed new product lines through strategic KOL partnerships and led creative briefs for 20+ influencer activations. Built activation frameworks that aligned content production with performance marketing objectives — increasing Ads ROI by 30% through systematic creative testing.',
    tags: ['KOL Marketing', 'Creative Briefing', 'Instagram', 'Campaign Strategy', '+30% ROI'],
    bg: 'linear-gradient(145deg,#f5e8e2 0%,#d9b5a0 45%,#a37060 100%)'
  },
  {
    tag: 'Campaign Creative',
    title: 'Pinkoi Year-End Campaign — Creative Direction',
    desc: 'Led the company\'s largest year-end campaign with Product, Engineering and Data teams. Delivered full creative direction including campaign concept, visual identity, and social content strategy. Introduced gamification mechanics that contributed to +17% sales uplift and +23% traffic growth.',
    tags: ['Campaign Strategy', 'Creative Direction', 'Gamification', 'Cross-functional', '+17% Sales'],
    bg: 'linear-gradient(145deg,#dce8e3 0%,#adc8bf 45%,#6e9f94 100%)'
  }
];

const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');

function openBrandModal(index) {
  const d = brandingData[index];
  document.getElementById('modal-img').style.background = d.bg;
  document.getElementById('modal-tag-el').textContent   = d.tag;
  document.getElementById('modal-title-el').textContent = d.title;
  document.getElementById('modal-desc-el').textContent  = d.desc;
  document.getElementById('modal-tags-row').innerHTML   = d.tags.map(t => `<span class="tag">${t}</span>`).join('');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBrandModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.bci-project').forEach((card) => {
  card.addEventListener('click', () => {
    const index = parseInt(card.getAttribute('data-brand-index'), 10);
    openBrandModal(index);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const index = parseInt(card.getAttribute('data-brand-index'), 10);
      openBrandModal(index);
    }
  });
});

if (modalClose)   modalClose.addEventListener('click', closeBrandModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeBrandModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBrandModal(); });
