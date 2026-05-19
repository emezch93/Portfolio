/**
 * ANAMBRA GREEN ENTERPRISE & CIRCULAR ECONOMY FESTIVAL 2026
 * script.js — Interactive functionality
 */

'use strict';

/* ========================================
   LOADER
   ======================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after load
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 900);
});
document.body.style.overflow = 'hidden';

/* ========================================
   STICKY NAVBAR + ACTIVE SECTION
   ======================================== */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scrolled class
  navbar.classList.toggle('scrolled', scrollY > 60);

  // Active link highlight
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) currentSection = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSection}`
    );
  });

  lastScroll = scrollY;
}, { passive: true });

// Mobile toggle
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen.toString());
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ========================================
   COUNTDOWN TIMER — June 5, 2026
   ======================================== */
const EVENT_DATE = new Date('2026-06-05T09:00:00+01:00').getTime();

const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n) { return String(n).padStart(2, '0'); }

function flipNumber(el, newVal) {
  if (el.textContent === newVal) return;
  el.classList.add('flip');
  setTimeout(() => {
    el.textContent = newVal;
    el.classList.remove('flip');
    el.style.transform = '';
    el.style.opacity = '';
  }, 200);
}

function updateCountdown() {
  const now  = Date.now();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    if (daysEl)    daysEl.textContent    = '00';
    if (hoursEl)   hoursEl.textContent   = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  if (daysEl)    flipNumber(daysEl,    pad(d));
  if (hoursEl)   flipNumber(hoursEl,   pad(h));
  if (minutesEl) flipNumber(minutesEl, pad(m));
  if (secondsEl) flipNumber(secondsEl, pad(s));
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ========================================
   SCROLL REVEAL — IntersectionObserver
   ======================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Observe all reveal elements (excluding hero which triggers on load)
document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));

// Reveal-up for non-hero sections
document.querySelectorAll('section:not(#hero) .reveal-up').forEach(el => revealObserver.observe(el));

/* ========================================
   ANIMATED COUNTERS
   ======================================== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const stepTime = 16;
    const steps   = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ========================================
   SMOOTH SCROLL for anchor links
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ========================================
   NEWSLETTER
   ======================================== */
function handleNewsletter(e) {
  e.preventDefault();
  const form  = e.target;
  const input = form.querySelector('input[type="email"]');
  const msg   = document.getElementById('newsletter-msg');
  if (!input || !input.value.trim()) return;

  // Simulate submission
  const btn = form.querySelector('button');
  btn.textContent = '...';
  btn.disabled = true;

  setTimeout(() => {
    if (msg) {
      msg.textContent = '✅ You\'re on the list! We\'ll keep you updated.';
      msg.style.color = '#81C784';
    }
    input.value = '';
    btn.textContent = 'Subscribe';
    btn.disabled = false;
  }, 1200);
}

/* ========================================
   PARALLAX (subtle, hero only)
   ======================================== */
const heroBg = document.querySelector('.hero-bg');

function onScroll() {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ========================================
   KEYBOARD ACCESSIBILITY — Cards
   ======================================== */
document.querySelectorAll('[tabindex="0"]').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

/* ========================================
   URGENCY BAR — animate on visibility
   ======================================== */
const urgencyFill = document.querySelector('.urgency-fill');
if (urgencyFill) {
  const urgencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        urgencyFill.style.animation = 'fillBar 2s ease-out forwards';
        urgencyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  urgencyObserver.observe(urgencyFill);
}

/* ========================================
   EASTER EGG — Konami code for confetti
   ======================================== */
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', e => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      launchConfetti();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function launchConfetti() {
  const emojis = ['🌱', '♻️', '🌍', '☀️', '💚', '🎉'];
  for (let i = 0; i < 40; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-30px;
      font-size:${1.2 + Math.random() * 1.5}rem;
      z-index:9998;
      pointer-events:none;
      animation: confettiFall ${1.5 + Math.random() * 2}s ease-in forwards;
      animation-delay:${Math.random() * 0.8}s;
    `;
    document.body.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }

  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      @keyframes confettiFall {
        to { transform: translateY(110vh) rotate(720deg); opacity:0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ========================================
   INIT LOG
   ======================================== */
console.log('%c 🌱 Anambra Green Fest 2026 — Website Loaded Successfully ', 'background:#2E7D32;color:#fff;padding:4px 12px;border-radius:4px;font-weight:bold;');
