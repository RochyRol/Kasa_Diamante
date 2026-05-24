import { useState, useEffect } from 'react'
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakRadio } from './tweaks-panel.jsx'
import { Catalog } from './catalog.jsx'
import { FloorPlan } from './floor-plan.jsx'
import { Hero, Collections, Service, Testimonials, Showroom, Newsletter, Footer, PresetRooms } from './sections.jsx'
import { HomeStory } from './home-story.jsx'

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goldTone": "#D4AF37",
  "displayFont": "Bodoni Moda",
  "catalogCols": 3
}/*EDITMODE-END*/;

const GOLD_OPTIONS = [
  { id: 'champagne',  hex: '#E8C77E', label: 'Champagne' },
  { id: 'classic',    hex: '#D4AF37', label: 'Clásico' },
  { id: 'antique',    hex: '#C9A961', label: 'Antiguo' },
  { id: 'bronze',     hex: '#B8860B', label: 'Bronce' },
];

const FONT_OPTIONS = ['Bodoni Moda', 'DM Serif Display', 'Italiana', 'Playfair Display'];

function hexToRgb(hex) {
  const m = hex.replace('#','').match(/.{2}/g);
  if (!m) return [0,0,0];
  return m.map(x => parseInt(x, 16));
}
function rgbDim(hex, pct = 0.78) {
  const [r,g,b] = hexToRgb(hex);
  return `rgb(${Math.round(r*pct)}, ${Math.round(g*pct)}, ${Math.round(b*pct)})`;
}

const ROUTES = [
  { id: 'home',        label: 'Inicio',          hash: '' },
  { id: 'catalogo',    label: 'Catálogo',        hash: 'catalogo' },
  { id: 'colecciones', label: 'Colecciones',     hash: 'colecciones' },
  { id: 'disena',      label: 'Diseña tu hogar', hash: 'disena' },
  { id: 'disenos',     label: 'Prediseñados',    hash: 'disenos' },
  { id: 'servicio',    label: 'Interiorismo',    hash: 'servicio' },
  { id: 'maison',      label: 'Maison',          hash: 'maison' },
];

function getViewFromHash() {
  const h = (location.hash || '').replace('#', '').replace('/', '');
  if (!h) return 'home';
  const match = ROUTES.find(r => r.hash === h);
  return match ? match.id : 'home';
}

function useRouter() {
  const [view, setView] = useState(getViewFromHash);
  useEffect(() => {
    const onHash = () => {
      setView(getViewFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return view;
}

function Nav({ scrolled, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = view === 'home';

  useEffect(() => { setMenuOpen(false); }, [view]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navRoutes = ROUTES.filter(r => r.id !== 'home');

  return (
    <>
      <header className={`kd-nav ${scrolled ? 'kd-nav--scrolled' : ''} ${isHome ? 'kd-nav--home' : ''}`}>
        <div className="kd-nav-inner">
          <a href="#" className="kd-logo" onClick={() => setMenuOpen(false)}>
            <img src="/src/logo-kd.svg" alt="KD" className="kd-logo-img" />
            <span className="kd-logo-word">KASA DIAMANTE</span>
          </a>
          <nav className="kd-nav-links">
            {navRoutes.map(r => (
              <a key={r.id} href={'#' + r.hash} className={view === r.id ? 'kd-nav-active' : ''}>
                {r.label}
              </a>
            ))}
          </nav>
          <div className="kd-nav-actions">
            <button className="kd-nav-icon" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/><line x1="12" y1="12" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
            <a href="#disena" className="kd-nav-cta">Mi Casa</a>
            <button
              className="kd-nav-burger"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen
                ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                : <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              }
            </button>
          </div>
        </div>
      </header>

      <div className={`kd-mobile-menu${menuOpen ? ' kd-mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="kd-mobile-menu-nav">
          {navRoutes.map((r, i) => (
            <a
              key={r.id}
              href={'#' + r.hash}
              className={`kd-mobile-menu-link${view === r.id ? ' kd-mobile-menu-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
              style={{ '--i': i }}
            >
              <span className="kd-mobile-menu-num">0{i + 1}</span>
              <span>{r.label}</span>
              <svg className="kd-mobile-menu-arrow" width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </a>
          ))}
        </nav>
        <div className="kd-mobile-menu-foot">
          <a href="#disena" className="kd-mobile-menu-cta" onClick={() => setMenuOpen(false)}>
            Diseña tu hogar
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
          </a>
          <p className="kd-mobile-menu-tag">Bogotá · Milán · Lisboa</p>
        </div>
      </div>
    </>
  );
}

function HomeBackground() {
  return (
    <div className="kd-home-bg" aria-hidden="true">
      <div className="kd-orb kd-orb--1" />
      <div className="kd-orb kd-orb--2" />
      <div className="kd-orb kd-orb--3" />
      <div className="kd-orb kd-orb--4" />
      <div className="kd-orb kd-orb--warm" />
      <div className="kd-hero-vignette" />
      <div className="kd-hero-grain" />
    </div>
  );
}

function PageHeader({ eyebrow, title, em, lead, n }) {
  return (
    <header className="kd-page-head">
      <div className="kd-page-head-bg" aria-hidden="true">
        <div className="kd-orb kd-orb--soft kd-orb--soft-1" />
        <div className="kd-orb kd-orb--soft kd-orb--soft-2" />
      </div>
      <div className="kd-page-head-inner">
        <div className="kd-page-head-num">{n}</div>
        <div className="kd-eyebrow kd-reveal">{eyebrow}</div>
        <h1 className="kd-page-title kd-reveal" style={{ '--kd-d': '120ms' }}>
          {title} <em>{em}</em>
        </h1>
        {lead && (
          <p className="kd-page-lead kd-reveal" style={{ '--kd-d': '240ms' }}>{lead}</p>
        )}
      </div>
    </header>
  );
}

function CatalogPage({ density }) {
  return (
    <>
      <PageHeader
        n="N° 01" eyebrow="Catálogo" title="La colección" em="completa"
        lead="42 piezas curadas. Cada una fabricada en talleres seleccionados de Europa y América Latina. Producción limitada, entrega curada a domicilio."
      />
      <Catalog density={density} />
    </>
  );
}

function CollectionsPage() {
  return (
    <>
      <PageHeader n="N° 02" eyebrow="Colecciones destacadas" title="Tres mundos," em="un mismo lenguaje"
        lead="Atelier Noir, Maison Doré y Casa Mediterránea. Cada colección es una manera distinta de habitar el espacio."
      />
      <div className="kd-page-body"><Collections /></div>
    </>
  );
}

function PlanPage() {
  return (
    <>
      <PageHeader n="N° 03" eyebrow="Diseña tu hogar" title="El plano de tu casa," em="curado pieza por pieza"
        lead="Toca cualquier elemento del plano para elegir la pieza Kasa Diamante que ocupará ese lugar. Tu selección se guarda en cada habitación."
      />
      <FloorPlan />
    </>
  );
}

function ServicePage() {
  return (
    <>
      <PageHeader n="N° 04" eyebrow="Servicio de diseño" title="Interiorismo" em="llave en mano"
        lead="Para quienes desean delegar la curaduría completa a un equipo de arquitectos e interioristas. Acompañamiento total."
      />
      <Service />
      <Testimonials />
    </>
  );
}

function PresetRoomsPage() {
  return (
    <>
      <PageHeader n="N° 06" eyebrow="Diseños prediseñados" title="Conjuntos listos" em="para habitar"
        lead="Cinco ambientes completamente curados. Selecciona el que resuene con tu visión y nosotros nos encargamos de todo."
      />
      <PresetRooms />
    </>
  );
}

function MaisonPage() {
  return (
    <>
      <PageHeader n="N° 05" eyebrow="Maison" title="Visítanos en" em="nuestra casa"
        lead="Showroom, asesoría privada y boletín. La maison te espera."
      />
      <Showroom />
      <Newsletter />
    </>
  );
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useState(false);
  const view = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--gold', tweaks.goldTone);
    root.style.setProperty('--gold-dim', rgbDim(tweaks.goldTone, 0.72));
    root.style.setProperty('--gold-soft', rgbDim(tweaks.goldTone, 0.55));
    root.style.setProperty('--display-font', `'${tweaks.displayFont}', 'Bodoni Moda', serif`);
  }, [tweaks.goldTone, tweaks.displayFont]);

  useEffect(() => {
    document.body.setAttribute('data-view', view);
    return () => document.body.removeAttribute('data-view');
  }, [view]);

  useEffect(() => {
    let raf;
    let io;
    raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll('.kd-reveal:not(.kd-reveal--in)');
      if (!els.length) return;
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('kd-reveal--in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      els.forEach(el => io.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, [view]);

  return (
    <>
      <div className="kd-global-bg-logo" aria-hidden="true">
        <img src="/src/logo-kd.svg" alt="" />
      </div>
      <Nav scrolled={scrolled} view={view} />
      {view === 'home' && <HomeBackground />}
      <main className="kd-view" data-view={view} key={view}>
        {view === 'home'        && <><Hero /><HomeStory /></>}
        {view === 'catalogo'    && <CatalogPage density={tweaks.catalogCols} />}
        {view === 'colecciones' && <CollectionsPage />}
        {view === 'disena'      && <PlanPage />}
        {view === 'disenos'     && <PresetRoomsPage />}
        {view === 'servicio'    && <ServicePage />}
        {view === 'maison'      && <MaisonPage />}
      </main>
      {view !== 'home' && <Footer />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Identidad visual">
          <TweakColor
            label="Tono de dorado"
            value={tweaks.goldTone}
            onChange={(v) => setTweak('goldTone', v)}
            options={GOLD_OPTIONS.map(o => o.hex)}
          />
          <TweakSelect
            label="Tipografía display"
            value={tweaks.displayFont}
            onChange={(v) => setTweak('displayFont', v)}
            options={FONT_OPTIONS}
          />
        </TweakSection>
        <TweakSection label="Catálogo">
          <TweakRadio
            label="Densidad del grid"
            value={tweaks.catalogCols}
            onChange={(v) => setTweak('catalogCols', v)}
            options={[
              { value: 2, label: '2 col' },
              { value: 3, label: '3 col' },
              { value: 4, label: '4 col' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
