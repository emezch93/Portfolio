/* main.js — shared across all pages */
'use strict';

// ── Scroll-triggered fade-up ──────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Nav toggle (mobile) ───────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.site-nav__links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.icon-open').style.display  = open ? 'none' : 'block';
    toggle.querySelector('.icon-close').style.display = open ? 'block' : 'none';
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.icon-open').style.display  = 'block';
      toggle.querySelector('.icon-close').style.display = 'none';
    }
  });
}

// ── Active nav link ───────────────────────────────────────────
document.querySelectorAll('.site-nav__links a').forEach(a => {
  if (a.getAttribute('href') === location.pathname.split('/').pop() ||
      (location.pathname.endsWith('/') && a.getAttribute('href') === 'index.html')) {
    a.setAttribute('aria-current', 'page');
  }
});
