document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ──────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile nav toggle ──────────────────────────────────────
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ── Reveal on scroll ───────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // ── Back to top ────────────────────────────────────────────
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ── Active nav link ────────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const h = a.getAttribute('href');
    if (h === page || (page === '' && h === 'index.html') || (h && h.split('#')[0] === page)) {
      a.classList.add('active');
    }
  });

  // ── Copy discount code ─────────────────────────────────────
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.discount-code-box')?.querySelector('.discount-code')?.textContent?.trim();
      if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = orig, 2000);
        });
      }
    });
  });

  // ── Hero word stagger ──────────────────────────────────────
  document.querySelectorAll('.stagger-words').forEach(el => {
    const words = el.textContent.trim().split(' ');
    el.innerHTML = words.map((w, i) =>
      `<span style="display:inline-block;opacity:0;transform:translateY(18px);transition:opacity 0.5s ease ${i * 0.08}s,transform 0.5s ease ${i * 0.08}s">${w}</span>`
    ).join(' ');
    requestAnimationFrame(() => el.querySelectorAll('span').forEach(s => {
      s.style.opacity = '1'; s.style.transform = 'none';
    }));
  });

});
