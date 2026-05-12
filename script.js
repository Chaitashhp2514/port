/* =========================================================
   Alex Carter — Portfolio JS
   Vanilla, no dependencies.
   ========================================================= */

/* ---------- Year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme toggle (persisted) ---------- */
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ---------- Navbar scroll state ---------- */
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
  document.getElementById('toTop').classList.toggle('show', window.scrollY > 600);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ---------- Scroll to top ---------- */
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Typing effect ---------- */
(function typingEffect() {
  const target = document.getElementById('typed');
  const phrases = [
    'Computer Engineer',
    'Full Stack Developer',
    'UI Craftsman',
    'Cloud Builder'
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    target.textContent = phrase.slice(0, ci);
    if (!deleting && ci < phrase.length) { ci++; setTimeout(tick, 75); }
    else if (deleting && ci > 0)        { ci--; setTimeout(tick, 35); }
    else {
      deleting = !deleting;
      if (!deleting) pi = (pi + 1) % phrases.length;
      setTimeout(tick, deleting ? 1500 : 300);
    }
  }
  tick();
})();

/* ---------- Skills (data-driven) ---------- */
const SKILLS = [
  { name: 'HTML',       level: 95 },
  { name: 'CSS',        level: 92 },
  { name: 'JavaScript', level: 94 },
  { name: 'React',      level: 90 },
  { name: 'Node.js',    level: 88 },
  { name: 'Python',     level: 80 },
  { name: 'Git/GitHub', level: 92 },
  { name: 'MongoDB',    level: 82 },
  { name: 'SQL',        level: 78 },
  { name: 'AWS',        level: 75 }
];

(function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill reveal">
      <div class="skill-top">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.level}%</span>
      </div>
      <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
    </div>
  `).join('');
})();

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    title: 'AI SaaS Landing Page',
    desc: 'Conversion-focused marketing site for an AI writing tool. Stripe checkout, animated hero, edge-cached.',
    tech: ['React', 'Next.js', 'Tailwind', 'Stripe'],
    icon: 'ai',
    github: '#', demo: '#'
  },
  {
    title: 'Real-Time Chat App',
    desc: 'Slack-inspired chat with channels, presence, typing indicators and end-to-end encryption.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    icon: 'chat',
    github: '#', demo: '#'
  },
  {
    title: 'E-Commerce Website',
    desc: 'Full storefront with cart, checkout, admin dashboard and inventory sync. Optimized for Core Web Vitals.',
    tech: ['Next.js', 'Postgres', 'Stripe', 'AWS'],
    icon: 'shop',
    github: '#', demo: '#'
  },
  {
    title: 'Developer Dashboard',
    desc: 'Unified analytics dashboard for indie developers — revenue, traffic and deploys in one place.',
    tech: ['React', 'Node.js', 'D3', 'Supabase'],
    icon: 'chart',
    github: '#', demo: '#'
  }
];

const ICONS = {
  ai:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/><circle cx="12" cy="12" r="4"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4a8 8 0 0 1 1 4z"/></svg>',
  shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18l-2 12H5L3 7zM8 7V5a4 4 0 0 1 8 0v2"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18M7 14l3-3 4 4 5-6"/></svg>'
};

(function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project reveal">
      <div class="project-img">${ICONS[p.icon] || ''}</div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-actions">
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub</a>
          <a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary">Live Demo</a>
        </div>
      </div>
    </article>
  `).join('');
})();

/* ---------- Reveal on scroll + animated counters + skill bars ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');

    // skill bar fill
    if (el.classList.contains('skill')) {
      const fill = el.querySelector('.skill-fill');
      if (fill) requestAnimationFrame(() => fill.style.width = fill.dataset.level + '%');
    }

    // stat counter
    if (el.classList.contains('stat')) {
      const numEl = el.querySelector('.stat-num');
      const target = parseInt(numEl.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function frame(t) {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Contact form (frontend validation) ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function setError(name, msg) {
  form.querySelector(`.error[data-for="${name}"]`).textContent = msg || '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  status.classList.remove('success');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  if (name.length < 2) { setError('name', 'Please enter your name.'); valid = false; }
  else setError('name', '');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Enter a valid email address.'); valid = false; }
  else setError('email', '');

  if (message.length < 10) { setError('message', 'Message should be at least 10 characters.'); valid = false; }
  else setError('message', '');

  if (!valid) return;

  // Simulate send (no backend)
  status.textContent = 'Sending…';
  setTimeout(() => {
    status.textContent = `Thanks, ${name}! Your message has been received. I'll reply soon.`;
    status.classList.add('success');
    form.reset();
  }, 700);
});
