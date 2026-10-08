/**
 * SAHLI REDA - MINIMALIST DOCK & PORTFOLIO ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDockNavigation();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  notifyVisitor(); // 🔔 Visitor notification
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sr_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sr_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;
  if (theme === 'light') {
    themeToggleBtn.innerHTML = `<i class="ph-bold ph-moon"></i>`;
  } else {
    themeToggleBtn.innerHTML = `<i class="ph-bold ph-sun"></i>`;
  }
}

/* ==========================================================================
   FLOATING DOCK NAVIGATION
   ========================================================================== */
function initDockNavigation() {
  const dockLinks = document.querySelectorAll('.dock-item-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    dockLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   PROJECT FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-bento-card');

  filterChips.forEach(btn => {
    btn.addEventListener('click', () => {
      filterChips.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT MODAL POPUP (ACCURATE TO CV & LINKS)
   ========================================================================== */
const projectDatabase = {
  'excel-clearance': {
    title: 'Excel Clearance Express — Stage PFE Full-Stack',
    category: 'Application Web Logistique & Facturation Douanière',
    tags: ['React 19', 'TailwindCSS', 'Node.js', 'Express.js', 'PostgreSQL', 'API REST (40 endpoints)', 'JWT / Bcrypt'],
    description: 'Conception et développement de bout en bout d’une application web full-stack de gestion logistique et de facturation pour la société EXCEL CLEARANCE à Casablanca (Maroc). Site officiel et plateforme en ligne accessible sur https://excelclearance.com/',
    features: [
      'Création complète de l’application de l’UI dynamique (React 19, TailwindCSS) jusqu’au serveur (Node.js, Express, PostgreSQL)',
      'Implémentation d’une API REST (40 endpoints) pour gérer les clients, le registre des douanes et un système de facturation avec calcul des taxes en temps réel',
      'Sécurisation de l’application via JWT / Bcrypt avec contrôle d’accès selon le rôle (RBAC)',
      'Intégration d’un tableau de bord avec graphiques statistiques et reporting financier'
    ],
    liveLink: 'https://excelclearance.com/',
    githubLink: 'https://github.com/Reda-sahli'
  },
  'medchain': {
    title: 'Projet MedChains (Santé-Tech) — Al Akhawayn University',
    category: 'Projet Entrepreneurial Technologique',
    tags: ['HealthTech', 'TBH Program', 'Ventures Adventures', 'Al Akhawayn University', 'UI/UX Design'],
    description: 'Collaboration intensive sur un projet entrepreneurial technologique à fort impact appliqué au secteur médical au sein du TBH Program (Ventures Adventures, Al Akhawayn University).',
    features: [
      'Représentation du Centre TBH lors de la compétition à Al Akhawayn University',
      'Conception d’interfaces pour la gestion sécurisée des dossiers médicaux et vérification décentralisée',
      'Modélisation économique et pitch de faisabilité technologique'
    ],
    githubLink: 'https://github.com/Reda-sahli'
  },
  'umi-mun': {
    title: 'UMI MUN — Site Web Officiel & Vidéos',
    category: 'Plateforme Diplomatique & Médias',
    tags: ['Next.js', 'React', 'umi-mun.online', 'Vidéo de Formation', 'Diplomatie'],
    description: 'Création du site web officiel du club Model United Nations de l’Université Moulay Ismaïl (umi-mun.online) et engagement actif au sein du bureau.',
    features: [
      'Développement du portail d’inscription des délégués et de soumission des documents de position',
      'Participation à la réalisation de la vidéo de formation en trois langues : français, anglais et arabe',
      'Participation active à la simulation diplomatique (négociation, débat, résolution)'
    ],
    githubLink: 'https://github.com/Reda-sahli/umi-mun'
  },
  'ivr-club': {
    title: 'Club IVR — Designer, Organisateur & Logo FHEMTECH 3D',
    category: 'Tech & Créativité 3D',
    tags: ['Ateliers Code', 'Animation 3D', 'Blender', 'Logo FHEMTECH', 'Charte Graphique'],
    description: 'Membre actif du bureau du Club IVR (Université Moulay Ismaïl), dédié à la promotion de la programmation, la robotique, l’IA et le design.',
    features: [
      'Co-création d’événements Tech et d’ateliers de programmation pour les étudiants',
      'Réalisation complète de la charte graphique et des visuels de communication (web, affiches, vidéo)',
      'Conception du logo officiel FHEMTECH (robotique, IA, web) et réalisation d’une vidéo animée en 3D'
    ],
    githubLink: 'https://github.com/Reda-sahli'
  },
  'gameathon': {
    title: 'Gameathon FactiCITY 2025 — UNESCO Maghreb',
    category: 'Jeux Numériques Éducatifs',
    tags: ['UNESCO Maghreb', 'Ministère de la Jeunesse', 'FactiCITY', 'Bouznika', 'Club MUN FSM'],
    description: 'Participation au Gameathon FactiCITY 2025 sous l’égide du Ministère de la Jeunesse, de la Culture et de la Communication et de l’UNESCO Maghreb à Bouznika.',
    features: [
      'Conception en équipe de jeux numériques éducatifs de sensibilisation à la désinformation et à l’esprit critique',
      'Semaine mondiale de l’éducation aux médias et à l’information',
      'Représentation conjointe du Club MUN FSM et de l’Université Moulay Ismaïl'
    ],
    githubLink: 'https://github.com/Reda-sahli'
  },
  'smartalim': {
    title: 'Prix du Design FSM & Représentant Smartalim (SIAM 2025)',
    category: 'Récompenses & Plateformes Innovantes',
    tags: ['Prix du Design', 'UMI Out Of The Box', 'SIAM 2025', 'Smartalim', 'Agriculture Numérique'],
    description: 'Distinctions créatives et représentation officielle de l’Université Moulay Ismaïl.',
    features: [
      'Lauréat du Prix du Design lors de la compétition des meilleures vidéos créatives (« UMI Out Of The Box ») avec « Lumière sur l’Inattendu »',
      'Présentation de la plateforme numérique agricole Smartalim au stand de l’UMI au Salon International de l’Agriculture au Maroc (SIAM 2025)',
      'Échanges avec les experts, chercheurs et délégations professionnelles'
    ],
    githubLink: 'https://github.com/Reda-sahli'
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalDetails = document.getElementById('modalDetails');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggers = document.querySelectorAll('[data-project-trigger]');

  if (!modal || !modalDetails) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      const data = projectDatabase[projectId];
      if (!data) return;

      modalDetails.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span class="pill-tag" style="margin-bottom: 10px; display: inline-block;">${data.category}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 12px; color: var(--text-main);">${data.title}</h2>
          <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7;">${data.description}</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
          ${data.tags.map(t => `<span class="skill-badge">${t}</span>`).join('')}
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 22px; margin-bottom: 24px;">
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #38bdf8; margin-bottom: 14px;">Points Clés &amp; Réalisations</h4>
          <ul style="display: flex; flex-direction: column; gap: 10px;">
            ${data.features.map(f => `
              <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.94rem; color: var(--text-muted);">
                <i class="ph-bold ph-check-circle" style="color: #10b981; font-size: 1.2rem; flex-shrink: 0;"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
          ${data.liveLink ? `
            <a href="${data.liveLink}" target="_blank" rel="noopener noreferrer" class="btn-pill-download" style="padding: 10px 22px; font-size: 0.88rem;">
              <i class="ph-bold ph-arrow-square-out"></i>
              <span>Visiter https://excelclearance.com/</span>
            </a>
          ` : ''}
          <a href="${data.githubLink}" target="_blank" class="btn-pill-contact" style="padding: 10px 22px; font-size: 0.88rem;">
            <i class="ph-bold ph-github-logo"></i>
            <span>GitHub Profile</span>
          </a>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Envoi en cours...</span>`;
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        if (feedback) {
          feedback.className = 'form-alert-msg success';
          feedback.innerText = 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.';
        }
        form.reset();
      } else {
        throw new Error(data.message || 'Error occurred');
      }
    } catch (err) {
      if (feedback) {
        feedback.className = 'form-alert-msg success';
        feedback.innerText = "Merci pour votre message ! Vous pouvez également me joindre directement sur coodenow@gmail.com.";
      }
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
/* ==========================================================================
   VISITOR NOTIFICATION — Maximum info collection → coodenow@gmail.com
   ========================================================================== */
async function notifyVisitor() {
  if (sessionStorage.getItem('sr_visit_notified')) return;
  sessionStorage.setItem('sr_visit_notified', '1');

  const ua = navigator.userAgent;
  const visitTime = new Date();

  /* ── 1. TIME ── */
  const localTime   = visitTime.toLocaleString('fr-MA', { timeZone: 'Africa/Casablanca', hour12: false });
  const utcTime     = visitTime.toUTCString();
  const visitorTZ   = Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A';
  const tzOffset    = `UTC${visitTime.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(visitTime.getTimezoneOffset() / 60)}h`;

  /* ── 2. PAGE / NAVIGATION ── */
  const pageUrl     = window.location.href;
  const referrer    = document.referrer || '(Direct — no referrer)';
  const pageTitle   = document.title;

  /* ── 3. BROWSER ── */
  const browserLang     = navigator.language || 'N/A';
  const allLangs        = (navigator.languages || []).join(', ') || 'N/A';
  const cookiesEnabled  = navigator.cookieEnabled ? '✅ Oui' : '❌ Non';
  const doNotTrack      = navigator.doNotTrack === '1' ? '🚫 Activé' : '✅ Désactivé';
  const javaEnabled     = typeof navigator.javaEnabled === 'function' ? (navigator.javaEnabled() ? 'Oui' : 'Non') : 'N/A';
  const pdfViewer       = navigator.pdfViewerEnabled !== undefined ? (navigator.pdfViewerEnabled ? '✅ Oui' : '❌ Non') : 'N/A';

  /* ── 4. DETECT BROWSER NAME ── */
  let browserName = 'Unknown';
  if (/Edg\//i.test(ua))         browserName = 'Microsoft Edge';
  else if (/OPR\//i.test(ua))    browserName = 'Opera';
  else if (/Chrome\//i.test(ua)) browserName = 'Google Chrome';
  else if (/Safari\//i.test(ua)) browserName = 'Safari';
  else if (/Firefox\//i.test(ua))browserName = 'Mozilla Firefox';
  else if (/MSIE|Trident/i.test(ua)) browserName = 'Internet Explorer';

  /* ── 5. OS & DEVICE ── */
  let os = 'Unknown OS';
  if (/Windows NT 10/i.test(ua))   os = 'Windows 10/11';
  else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
  else if (/Windows/i.test(ua))    os = 'Windows';
  else if (/Android [\d.]+/i.test(ua)) {
    const v = ua.match(/Android ([\d.]+)/i);
    os = `Android ${v ? v[1] : ''}`;
  }
  else if (/iPhone OS [\d_]+/i.test(ua)) {
    const v = ua.match(/iPhone OS ([\d_]+)/i);
    os = `iOS ${v ? v[1].replace(/_/g, '.') : ''}`;
  }
  else if (/iPad/i.test(ua))       os = 'iPadOS';
  else if (/Mac OS X/i.test(ua))   os = 'macOS';
  else if (/Linux/i.test(ua))      os = 'Linux';

  const isMobile    = /Mobi|Android|iPhone|iPad/i.test(ua);
  const isTablet    = /iPad|tablet/i.test(ua);
  const deviceType  = isTablet ? '📱 Tablette' : isMobile ? '📱 Mobile' : '🖥️ Desktop';

  /* ── 6. SCREEN ── */
  const screenRes       = `${window.screen.width}×${window.screen.height}`;
  const viewportSize    = `${window.innerWidth}×${window.innerHeight}`;
  const colorDepth      = `${window.screen.colorDepth}-bit`;
  const pixelRatio      = window.devicePixelRatio ? `${window.devicePixelRatio}x` : 'N/A';
  const touchSupport    = navigator.maxTouchPoints > 0 ? `✅ Oui (${navigator.maxTouchPoints} points)` : '❌ Non';

  /* ── 7. HARDWARE ── */
  const cpuCores    = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cœurs` : 'N/A';
  const deviceRAM   = navigator.deviceMemory ? `≥ ${navigator.deviceMemory} GB` : 'N/A';

  /* ── 8. NETWORK ── */
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const netType        = conn ? (conn.effectiveType || conn.type || 'N/A') : 'N/A';
  const netSpeed       = conn && conn.downlink ? `${conn.downlink} Mbps` : 'N/A';
  const netRTT         = conn && conn.rtt !== undefined ? `${conn.rtt} ms` : 'N/A';
  const saveData       = conn && conn.saveData ? '🔋 Mode économie activé' : 'Non';

  /* ── 9. BATTERY ── */
  let batteryInfo = 'N/A';
  try {
    if (navigator.getBattery) {
      const bat = await navigator.getBattery();
      const pct = Math.round(bat.level * 100);
      const chg = bat.charging ? '⚡ En charge' : '🔋 Sur batterie';
      batteryInfo = `${pct}% — ${chg}`;
    }
  } catch (_) {}

  /* ── 10. GPU (WebGL) ── */
  let gpuInfo = 'N/A';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (dbgInfo) {
        const vendor   = gl.getParameter(dbgInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL);
        gpuInfo = `${vendor} — ${renderer}`;
      }
    }
  } catch (_) {}

  /* ── 11. PLUGINS ── */
  let plugins = 'Aucun / Non disponible';
  try {
    if (navigator.plugins && navigator.plugins.length > 0) {
      plugins = Array.from(navigator.plugins).map(p => p.name).join(', ');
    }
  } catch (_) {}

  /* ── 12. ADBLOCK DETECTION ── */
  let adBlock = 'Inconnu';
  try {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox ad-banner pub_300x250';
    testAd.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(testAd);
    await new Promise(r => setTimeout(r, 100));
    adBlock = (testAd.offsetHeight === 0) ? '🚫 AdBlock détecté' : '✅ Pas d\'AdBlock';
    document.body.removeChild(testAd);
  } catch (_) {}

  /* ── 13. IP GEOLOCATION (detailed) ── */
  let ip = 'N/A', city = 'N/A', region = 'N/A', country = 'N/A';
  let countryCode = '', postal = 'N/A', latlon = 'N/A';
  let isp = 'N/A', org = 'N/A', asn = 'N/A';
  let vpnFlag = '';

  try {
    const geoRes = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    if (geoRes.ok) {
      const g = await geoRes.json();
      ip          = g.ip          || 'N/A';
      city        = g.city        || 'N/A';
      region      = g.region      || 'N/A';
      country     = g.country_name || 'N/A';
      countryCode = g.country_code || '';
      postal      = g.postal      || 'N/A';
      latlon      = (g.latitude && g.longitude) ? `${g.latitude}, ${g.longitude}` : 'N/A';
      isp         = g.org         || 'N/A';
      asn         = g.asn         || 'N/A';
      // Basic VPN/hosting heuristic
      if (/vpn|proxy|hosting|datacenter|cloud|server|digital ocean|aws|azure|linode|vultr/i.test(g.org || '')) {
        vpnFlag = '⚠️ Possible VPN/Proxy/Hébergeur';
      }
    }
  } catch (_) {}

  const googleMapsLink = latlon !== 'N/A'
    ? `https://www.google.com/maps?q=${latlon}`
    : null;

  /* ── 14. PERMISSIONS ── */
  let notifPerm = 'N/A';
  try {
    const p = await navigator.permissions.query({ name: 'notifications' });
    notifPerm = p.state === 'granted' ? '✅ Accordé' : p.state === 'denied' ? '❌ Refusé' : '⏳ Non demandé';
  } catch (_) {}

  /* ── COMPOSE EMAIL ── */
  const sep = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  const message = [
    `🔔 NOUVEAU VISITEUR — Portfolio Sahli Reda`,
    sep,
    ``,
    `📍 LOCALISATION`,
    `   🌐 Adresse IP      : ${ip}${vpnFlag ? '  ' + vpnFlag : ''}`,
    `   🏙️  Ville           : ${city}`,
    `   🗺️  Région          : ${region}`,
    `   🌍 Pays            : ${country} ${countryCode ? `(${countryCode})` : ''}`,
    `   📮 Code Postal     : ${postal}`,
    `   📡 Coordonnées GPS : ${latlon}`,
    googleMapsLink ? `   🗺️  Google Maps     : ${googleMapsLink}` : '',
    `   🏢 FAI / ISP       : ${isp}`,
    `   🔢 ASN             : ${asn}`,
    ``,
    `📅 HEURE DE VISITE`,
    `   🕐 Heure locale (MA): ${localTime}`,
    `   🌐 UTC             : ${utcTime}`,
    `   🌍 Fuseau visiteur  : ${visitorTZ} (${tzOffset})`,
    ``,
    `🌐 NAVIGATION`,
    `   📄 Page visitée    : ${pageUrl}`,
    `   🔗 Provenance      : ${referrer}`,
    `   📌 Titre page      : ${pageTitle}`,
    ``,
    `🖥️  APPAREIL & SYSTÈME`,
    `   📟 Type            : ${deviceType}`,
    `   💻 Système d'exploit: ${os}`,
    `   🌐 Navigateur      : ${browserName}`,
    `   🗣️  Langue          : ${browserLang} (Toutes : ${allLangs})`,
    `   📐 Résolution écran : ${screenRes}`,
    `   🪟 Taille viewport  : ${viewportSize}`,
    `   🎨 Profondeur couleur: ${colorDepth}`,
    `   🔍 Pixel Ratio     : ${pixelRatio}`,
    `   👆 Écran tactile   : ${touchSupport}`,
    ``,
    `⚙️  MATÉRIEL`,
    `   🧠 CPU             : ${cpuCores}`,
    `   💾 RAM             : ${deviceRAM}`,
    `   🎮 GPU             : ${gpuInfo}`,
    `   🔋 Batterie        : ${batteryInfo}`,
    ``,
    `📶 RÉSEAU`,
    `   🔌 Type connexion  : ${netType}`,
    `   ⚡ Vitesse DL      : ${netSpeed}`,
    `   📡 Latence (RTT)   : ${netRTT}`,
    `   🔋 Économie données: ${saveData}`,
    ``,
    `🔒 CONFIDENTIALITÉ & SÉCURITÉ`,
    `   🍪 Cookies         : ${cookiesEnabled}`,
    `   🚫 Do Not Track    : ${doNotTrack}`,
    `   🔔 Notifications   : ${notifPerm}`,
    `   🛡️  AdBlock         : ${adBlock}`,
    `   ☕ Java            : ${javaEnabled}`,
    `   📄 PDF Viewer      : ${pdfViewer}`,
    ``,
    `🔌 PLUGINS NAVIGATEUR`,
    `   ${plugins}`,
    ``,
    sep,
    `📋 USER-AGENT COMPLET`,
    `${ua}`,
    sep,
  ].filter(l => l !== null && l !== undefined).join('\n');

  try {
    const formData = new FormData();
    formData.append('access_key', 'f982af88-c897-47cf-b15e-fd66a61dd36b');
    formData.append('from_name', '🔔 Portfolio — Nouveau Visiteur');
    formData.append('subject', `🔔 Visiteur depuis ${city}, ${country} (${ip}) — ${localTime}`);
    formData.append('email', 'coodenow@gmail.com');
    formData.append('message', message);

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
  } catch (_) {
    // Silent fail — non-critical
  }
}
