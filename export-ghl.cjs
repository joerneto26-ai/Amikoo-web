const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:3000';
const PROJECT = 'C:\\Users\\joern\\OneDrive\\Imágenes\\Documents\\I.A_company_structure\\Prospectos_data\\camila-vet-landing';
const OUT = path.join('C:\\Users\\joern\\OneDrive\\Imágenes\\Documents\\I.A_company_structure\\Prospectos_data', 'plantilla-web-veterinaria.html');

(async () => {
  console.log('[1/7] Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('[2/7] Loading live page...');
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  console.log('[3/7] Extracting DOM with Tailwind classes preserved...');
  const result = await page.evaluate(async () => {
    // Force all animations to end state (no opacity:0 stuck elements)
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.001s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001s !important;
      }
      [style*="opacity"], [class*="opacity-0"], [data-framer-name] {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
    await new Promise(r => setTimeout(r, 500));

    // Force all Framer Motion inline styles to end-state (some elements captured with opacity:0)
    document.querySelectorAll('[style*="opacity"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Inject data-visit / data-pack on price elements so vanilla NumberFlow can find them
    const PRICE_DATA = [
      { visit: 180, pack: 150 },
      { visit: 350, pack: 290 },
      { visit: 520, pack: 430 }
    ];
    document.querySelectorAll('.pricing-card').forEach((card, idx) => {
      if (idx >= PRICE_DATA.length) return;
      const num = card.querySelector('.num');
      if (num && !num.dataset.visit) {
        num.dataset.visit = String(PRICE_DATA[idx].visit);
        num.dataset.pack = String(PRICE_DATA[idx].pack);
      }
      // Also add data-period for period swap
      const period = card.querySelector('[class*="period"]');
      if (period && !period.dataset.periodVisit) {
        period.dataset.periodVisit = 'por consulta';
        period.dataset.periodPack = 'por consulta · paquete de 5';
      }
    });

    // Inline all <img> as base64
    const imgs = document.querySelectorAll('img');
    for (const img of imgs) {
      if (img.src.startsWith('data:')) continue;
      try {
        const resp = await fetch(img.src);
        const blob = await resp.blob();
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.onloadend = () => {
            img.src = reader.result;
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } catch (e) {}
    }

    // Hardcode Google reviews count = 127 (from live aria-label "Ver 127 reseñas")
    const reviewLink = document.querySelector('a[aria-label*="reseñ"]');
    if (reviewLink) {
      // Find the big green number (class includes text-3xl, color #22C55E)
      const allSpans = reviewLink.querySelectorAll('span');
      allSpans.forEach(span => {
        const cls = span.className || '';
        if (cls.includes('text-3xl') || cls.includes('text-4xl') || cls.includes('text-5xl')) {
          if (cls.includes('22C55E') || cls.includes('text-[#')) {
            span.textContent = '127';
          }
        }
      });
      // Force the secondary "127" that may have appeared in wrong span to be empty
      allSpans.forEach(span => {
        const cls = span.className || '';
        if (cls.includes('text-3xl') && span.textContent === '127') return; // already set
        if (span.textContent === '127' && !cls.includes('font-heading')) {
          // Wrong location, leave it
        }
      });
    }

    // Remove scripts (we'll re-add our own)
    document.querySelectorAll('script, link[rel="stylesheet"][href*="fonts.googleapis"]').forEach(el => el.remove());

    return document.documentElement.outerHTML;
  });

  console.log('[4/7] Reading Tailwind CSS bundle from dist/...');
  const distAssets = fs.readdirSync(path.join(PROJECT, 'dist', 'assets'));
  const cssFile = distAssets.find(f => f.startsWith('index-') && f.endsWith('.css'));
  if (!cssFile) {
    console.error('No CSS bundle found in dist/assets');
    process.exit(1);
  }
  const tailwindCSS = fs.readFileSync(path.join(PROJECT, 'dist', 'assets', cssFile), 'utf8');

  console.log('[5/7] Reading dist/index.html for meta/template...');
  const distIndex = fs.readFileSync(path.join(PROJECT, 'dist', 'index.html'), 'utf8');

  // Extract body from puppeteer DOM
  const bodyMatch = result.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (!bodyMatch) {
    console.error('Could not extract body from puppeteer DOM');
    process.exit(1);
  }
  const body = bodyMatch[1];

  console.log('[6/7] Building final HTML...');
  const finalHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#FFFFFF">
<title>Camila Silva — Técnica Veterinaria</title>
<meta name="description" content="Cuidado profesional y cercano para tu mascota. Atención veterinaria en CDMX.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://db.onlinewebfonts.com/c/04e6981992c0e2e7642af2074ebe3901?family=Helvetica+Now+Display+Bold" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
<style>
/* === TAILWIND CSS BUNDLE FROM dist/assets === */
${tailwindCSS}

/* === OVERRIDES === */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
.skip-link { position: absolute; top: -100px; left: 16px; z-index: 100; padding: 12px 16px; background: #2FBF8F; color: white; border-radius: 8px; }
.skip-link:focus { top: 16px; }

/* Force all motion-revealed content to be visible (exported from live, animations may have left elements at 0 opacity) */
[data-framer-name], [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
</style>
</head>
<body>
${body}
<script>
// Vanilla JS: bind WhatsApp CTAs, pricing toggle, form submit, filter tabs, map press
(function() {
  'use strict';
  const phone = '525512345678';
  const waUrl = (m) => 'https://wa.me/' + phone + '?text=' + encodeURIComponent(m || 'Hola Camila, me gustaría agendar una visita para mi mascota.');

  // Bind all WhatsApp-related links
  document.querySelectorAll('a').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (href.startsWith('https://wa.me/') || href === '#' || el.target === '_blank') {
      const txt = (el.textContent || '').toLowerCase();
      if (href === '#' || href.startsWith('https://wa.me/')) {
        el.setAttribute('href', waUrl());
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
  });

  // Pricing toggle NumberFlow
  const toggle = document.getElementById('pricing-toggle');
  if (toggle) {
    let isPack = false;
    toggle.addEventListener('change', () => {
      isPack = toggle.checked;
      // Find price elements: look for spans with data-visit and data-pack
      document.querySelectorAll('[data-visit][data-pack]').forEach(priceEl => {
        const v = parseInt(priceEl.dataset.visit);
        const p = parseInt(priceEl.dataset.pack);
        if (isNaN(v) || isNaN(p)) return;
        const from = isPack ? v : p;
        const to = isPack ? p : v;
        const start = performance.now();
        const dur = 500;
        function frame(now) {
          const prog = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          priceEl.textContent = Math.round(from + (to - from) * eased);
          if (prog < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
      // Update period text
      document.querySelectorAll('[data-period-visit], [data-period-pack]').forEach(periodEl => {
        if (isPack && periodEl.dataset.periodPack) periodEl.textContent = periodEl.dataset.periodPack;
        if (!isPack && periodEl.dataset.periodVisit) periodEl.textContent = periodEl.dataset.periodVisit;
      });
      if (isPack && typeof confetti !== 'undefined') {
        const t = toggle.getBoundingClientRect();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { x: (t.left + t.width / 2) / window.innerWidth, y: (t.top + t.height / 2) / window.innerHeight },
          colors: ['#2FBF8F', '#159A74', '#FFD7A8', '#18312B'],
          ticks: 200, gravity: 1.2, decay: 0.94, startVelocity: 28, shapes: ['circle']
        });
      }
    });
  }

  // Form submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = new FormData(form);
      const species = (data.get('species') || '').toString().toLowerCase();
      const message = 'Hola, soy ' + data.get('name') + '. Quiero agendar cita para mi ' + species + '.' + (data.get('message') ? ' ' + data.get('message') : '') + ' (' + data.get('email') + ')';
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg> Enviando...';
        setTimeout(() => {
          window.open(waUrl(message), '_blank');
          btn.innerHTML = orig;
          btn.disabled = false;
          form.reset();
        }, 800);
      }
    });
  }

  // Filter tabs (servicios) via radio buttons
  document.querySelectorAll('input[type="radio"][name="filter"], input[type="radio"][id^="filter-"]').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.id || '';
      const cat = id.replace('filter-', '');
      const capitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
      document.querySelectorAll('[data-cat]').forEach(card => {
        if (cat === 'todos' || !cat) {
          card.style.display = '';
        } else {
          card.style.display = card.dataset.cat === capitalized ? '' : 'none';
        }
      });
    });
  });

  // Map press pulse (pointerdown)
  document.querySelectorAll('iframe[src*="google.com/maps"]').forEach(map => {
    const parent = map.parentElement;
    if (!parent) return;
    parent.style.cursor = 'pointer';
    parent.addEventListener('pointerdown', () => {
      const orig = parent.style.boxShadow;
      parent.style.boxShadow = '0 0 0 4px rgba(47,191,143,0.35), 0 4px 24px rgba(47,191,143,0.15)';
      parent.style.transition = 'box-shadow 0.25s';
      setTimeout(() => { parent.style.boxShadow = orig; }, 600);
    });
  });

  // Active nav link on scroll
  const sections = ['inicio', 'servicios', 'planes', 'colonias', 'contacto', 'testimonios']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = 'inicio';
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    navLinks.forEach(l => {
      const href = l.getAttribute('href');
      l.classList.toggle('active', href === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
</script>
</body>
</html>`;

  console.log('[7/7] Writing ghl.html...');
  fs.writeFileSync(OUT, finalHTML, 'utf8');
  const size = fs.statSync(OUT).size;
  console.log(`Done: ${OUT} (${(size/1024/1024).toFixed(2)} MB)`);
  console.log(`Tailwind CSS: ${(tailwindCSS.length/1024).toFixed(1)} KB`);
  console.log(`HTML body: ${(body.length/1024).toFixed(1)} KB`);

  await browser.close();
})();
