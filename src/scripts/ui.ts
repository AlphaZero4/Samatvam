// Client behaviour for every page. Click handlers are delegated on document (bound once);
// per-page setup re-runs on `astro:page-load`, which fires after each view-transition swap.

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Theme toggle with circular reveal ---------------- */
function setTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    /* private mode: theme just won't persist */
  }
}

function toggleTheme(btn: HTMLElement) {
  const next = !document.documentElement.classList.contains('dark');
  if (!document.startViewTransition || reducedMotion()) return setTheme(next);

  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const root = document.documentElement;
  root.classList.add('theme-transition');
  const vt = document.startViewTransition(() => setTheme(next));
  vt.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 650,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });
  vt.finished.finally(() => root.classList.remove('theme-transition'));
}

// Follow the OS setting live unless the visitor picked a theme explicitly.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('theme');
  } catch {
    /* ignore */
  }
  if (!saved) document.documentElement.classList.toggle('dark', e.matches);
});

/* ---------------- Delegated clicks ---------------- */
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;

  const themeBtn = t.closest<HTMLElement>('[data-theme-toggle]');
  if (themeBtn) return toggleTheme(themeBtn);

  if (t.closest('[data-menu-open]'))
    return document.querySelector<HTMLDialogElement>('[data-menu]')?.showModal();
  if (t.closest('[data-menu-close]'))
    return document.querySelector<HTMLDialogElement>('[data-menu]')?.close();

  const soon = t.closest<HTMLElement>('[data-coming-soon-trigger]');
  if (soon) {
    const dlg = document.querySelector<HTMLDialogElement>('[data-coming-soon]');
    const label = dlg?.querySelector('[data-coming-soon-label]');
    if (label) label.textContent = soon.dataset.comingSoonTrigger || 'Coming soon';
    return dlg?.showModal();
  }
  if (t.closest('[data-dialog-close]')) return t.closest('dialog')?.close();

  // Click on a dialog's backdrop closes it.
  if (t instanceof HTMLDialogElement && t.open) {
    const r = t.getBoundingClientRect();
    const ev = e as MouseEvent;
    if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) t.close();
    if (t.matches('[data-menu]')) t.close();
  }

  const video = t.closest<HTMLButtonElement>('[data-youtube]');
  if (video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${video.dataset.youtube}?autoplay=1&rel=0`;
    iframe.title = video.getAttribute('aria-label') || 'Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'absolute inset-0 size-full';
    video.replaceWith(iframe);
    return;
  }

  const thumb = t.closest<HTMLElement>('[data-lightbox-index]');
  if (thumb) return openLightbox(Number(thumb.dataset.lightboxIndex));
  if (t.closest('[data-lightbox-prev]')) return stepLightbox(-1);
  if (t.closest('[data-lightbox-next]')) return stepLightbox(1);
});

/* ---------------- Lightbox (gallery page) ---------------- */
let lbIndex = 0;
function lightboxItems() {
  return [...document.querySelectorAll<HTMLElement>('[data-lightbox-index]')];
}
function showLightbox() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const items = lightboxItems();
  const img = dlg?.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const src = items[lbIndex]?.querySelector('img');
  if (!dlg || !img || !src) return;
  img.src = src.currentSrc || src.src;
  img.alt = src.alt;
  const counter = dlg.querySelector('[data-lightbox-count]');
  if (counter) counter.textContent = `${lbIndex + 1} / ${items.length}`;
}
function openLightbox(i: number) {
  lbIndex = i;
  showLightbox();
  document.querySelector<HTMLDialogElement>('[data-lightbox]')?.showModal();
}
function stepLightbox(d: number) {
  const n = lightboxItems().length;
  lbIndex = (lbIndex + d + n) % n;
  showLightbox();
}
document.addEventListener('keydown', (e) => {
  if (!document.querySelector<HTMLDialogElement>('[data-lightbox]')?.open) return;
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
});

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
  if (!('IntersectionObserver' in window) || reducedMotion()) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    // threshold 0: very tall blocks (long articles) would never reach a fractional threshold.
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  els.forEach((el) => io.observe(el));

  // A fast scroll (or jump to an anchor) can skip past an element without it ever
  // intersecting. Reveal anything that is already above the viewport bottom.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    for (const el of els) {
      if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < innerHeight) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(sweep);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener(
    'astro:before-swap',
    () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
    },
    { once: true },
  );
}

/* ---------------- Hero slideshow ---------------- */
function initSlideshow() {
  const root = document.querySelector<HTMLElement>('[data-slideshow]');
  if (!root) return;
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-slide-dot]')];
  const progress = root.querySelector<HTMLElement>('[data-slide-progress]');
  const interval = 6500;
  let i = 0;
  let timer: number | undefined;

  const go = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      s.setAttribute('aria-hidden', String(k !== i));
      s.inert = k !== i;
    });
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    if (progress) {
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.style.animation = '';
    }
  };
  const play = () => {
    stop();
    if (!reducedMotion()) timer = window.setInterval(() => go(i + 1), interval);
  };
  const stop = () => window.clearInterval(timer);

  root.querySelector('[data-slide-prev]')?.addEventListener('click', () => (go(i - 1), play()));
  root.querySelector('[data-slide-next]')?.addEventListener('click', () => (go(i + 1), play()));
  dots.forEach((d, k) => d.addEventListener('click', () => (go(k), play())));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', () => (go(i), play()));
  root.addEventListener('focusin', stop);
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1);
  });

  // Touch swipe
  let x0: number | null = null;
  root.addEventListener('touchstart', (e) => (x0 = e.touches[0]?.clientX ?? null), { passive: true });
  root.addEventListener('touchend', (e) => {
    const x1 = e.changedTouches[0]?.clientX;
    if (x0 != null && x1 != null && Math.abs(x1 - x0) > 40) {
      go(i + (x1 < x0 ? 1 : -1));
      play();
    }
    x0 = null;
  });

  go(0);
  play();
  document.addEventListener('astro:before-swap', stop, { once: true });
}

/* ---------------- Contact form ---------------- */
function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const say = (msg: string, ok = true) => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.ok = String(ok);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const endpoint = form.dataset.endpoint;
    const to = form.dataset.to || '';

    if (!endpoint) {
      const body = `Name: ${data.name}\nMobile: ${data.mobile}\nEmail: ${data.email}\n\n${data.message}`;
      location.href = `mailto:${to}?subject=${encodeURIComponent(`Enquiry from ${data.name} via samatvam website`)}&body=${encodeURIComponent(body)}`;
      say('Your email app should open with the message ready to send.');
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
    if (btn) btn.disabled = true;
    say('Sending…');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, subject: `Enquiry from ${data.name} via samatvam website` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say('Thank you! We will get back to you soon.');
    } catch {
      say(`Sorry, that didn't go through. Please email us at ${to} or call a helpline.`, false);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

document.addEventListener('astro:page-load', () => {
  initReveal();
  initSlideshow();
  initContactForm();
});
