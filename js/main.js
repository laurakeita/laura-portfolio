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
  'GTM & Strategy Operations',
  'Data-Driven Growth Strategist',
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
