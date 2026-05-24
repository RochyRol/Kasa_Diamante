import { useState, useEffect } from 'react'
import { KD_PRODUCTS, KD_TESTIMONIALS, KD_COMBOS, fmtCOP } from './data.js'
import { IconView } from './furniture-svgs.jsx'

export function Hero() {
  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = window.innerHeight;
      setScrolled(Math.min(1, y / max));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeOut = (mul) => ({ opacity: Math.max(0, 1 - scrolled * mul) });

  return (
    <section className="kd-hero-min" id="inicio">
      <img src="/src/logo-kd.svg" aria-hidden="true" className="kd-hero-bg-logo" />
      <div className="kd-hero-corners" aria-hidden="true">
        <span className="kd-hero-corner kd-hero-corner--tl" />
        <span className="kd-hero-corner kd-hero-corner--tr" />
        <span className="kd-hero-corner kd-hero-corner--bl" />
        <span className="kd-hero-corner kd-hero-corner--br" />
      </div>
      <div className="kd-hero-side-strip" aria-hidden="true" style={fadeOut(2)}>
        <span className="kd-hero-side-n">N°01</span>
        <span className="kd-hero-side-rule" />
        <span className="kd-hero-side-label">ÉDITION · BOGOTÁ</span>
      </div>
      <div className="kd-hero-top-mark" aria-hidden="true" style={fadeOut(2)}>
        <span className="kd-hero-top-mark-text">MMXXIV</span>
        <span className="kd-hero-top-mark-line" />
        <span className="kd-hero-top-mark-label">Maison</span>
      </div>
      <div
        className="kd-hero-min-inner"
        style={{
          opacity: 1 - scrolled * 1.4,
          transform: `translateY(${scrolled * -40}px)`,
        }}
      >
        <div className="kd-hero-eyebrow-bar">
          <span className="kd-hero-eyebrow-bar-line" />
          <span className="kd-hero-eyebrow-bar-text">Mobiliario · Iluminación · Arte de autor</span>
          <span className="kd-hero-eyebrow-bar-line kd-hero-eyebrow-bar-line--r" />
        </div>
        <h1 className="kd-hero-min-title">
          <span className="kd-hero-min-w1">El arte</span>
          <span className="kd-hero-min-w2">de</span>
          <em className="kd-hero-min-w3">habitar.</em>
        </h1>
        <p className="kd-hero-min-sub">Mobiliario, iluminación y objeto de autor.</p>
        <div className="kd-hero-cta-group">
          <a href="#catalogo" className="kd-hero-cta-primary">
            <span>Colección</span>
            <svg width="36" height="10" viewBox="0 0 36 10" aria-hidden="true">
              <path d="M 0 5 L 34 5 M 30 1 L 34 5 L 30 9" stroke="currentColor" strokeWidth="0.9" fill="none" />
            </svg>
          </a>
          <a href="#disenos" className="kd-hero-cta-secondary">
            <span>Diseños prediseñados</span>
            <svg width="36" height="10" viewBox="0 0 36 10" aria-hidden="true">
              <path d="M 0 5 L 34 5 M 30 1 L 34 5 L 30 9" stroke="currentColor" strokeWidth="0.9" fill="none" />
            </svg>
          </a>
        </div>
      </div>
      <div className="kd-hero-min-scroll" style={fadeOut(2)}>
        <span className="kd-hero-min-scroll-line" />
        <span className="kd-hero-min-scroll-label">SCROLL</span>
      </div>
    </section>
  );
}

export function Collections() {
  const MUEBLES_CATS = ['sofas', 'mesas', 'camas', 'sillas'];
  const DECO_CATS    = ['decoracion', 'espejos', 'alfombras'];

  const SECTIONS = [
    {
      id: 'muebles', label: 'Muebles', eyebrow: 'Sofás · Mesas · Camas · Sillas',
      tagline: 'El alma de cada habitación',
      desc: 'Piezas de autor para sala, recámara y estudio. Fabricadas en talleres seleccionados de Europa y América Latina.',
      getProducts() {
        const picks = [];
        for (const cat of MUEBLES_CATS) {
          const p = KD_PRODUCTS.find(x => x.cat === cat);
          if (p) picks.push(p);
        }
        return picks;
      },
      totalCount() { return KD_PRODUCTS.filter(p => MUEBLES_CATS.includes(p.cat)).length; },
      filterCat: 'muebles',
    },
    {
      id: 'comedores', label: 'Comedores', eyebrow: 'Comedor · Dining',
      tagline: 'Donde el ritual de la mesa toma forma',
      desc: 'Mesas de comedor que transforman cada cena en un momento de elegancia irrepetible.',
      getProducts() { return KD_PRODUCTS.filter(p => p.cat === 'comedores').slice(0, 4); },
      totalCount() { return KD_PRODUCTS.filter(p => p.cat === 'comedores').length; },
      filterCat: 'comedores',
    },
    {
      id: 'lamparas', label: 'Lámparas', eyebrow: 'Iluminación · Lighting',
      tagline: 'La atmósfera que lo cambia todo',
      desc: 'Arañas de cristal, arcos escultóricos y apliques que definen la personalidad de cada espacio.',
      getProducts() { return KD_PRODUCTS.filter(p => p.cat === 'lamparas').slice(0, 4); },
      totalCount() { return KD_PRODUCTS.filter(p => p.cat === 'lamparas').length; },
      filterCat: 'lamparas',
    },
    {
      id: 'decoracion', label: 'Decoración', eyebrow: 'Objetos · Espejos · Alfombras',
      tagline: 'Los detalles que completan la historia',
      desc: 'Esculturas, vasijas, espejos y alfombras de autor. Los objetos que hacen de un espacio, un hogar.',
      getProducts() {
        const result = [];
        for (const cat of DECO_CATS) {
          const p = KD_PRODUCTS.find(x => x.cat === cat);
          if (p) result.push(p);
        }
        for (const p of KD_PRODUCTS.filter(x => DECO_CATS.includes(x.cat))) {
          if (!result.includes(p) && result.length < 4) result.push(p);
        }
        return result.slice(0, 4);
      },
      totalCount() { return KD_PRODUCTS.filter(p => DECO_CATS.includes(p.cat)).length; },
      filterCat: 'decoracion',
    },
    {
      id: 'lujo', label: 'Sección de Lujo', eyebrow: 'Édition Prestige · Ultra-Limitada',
      tagline: 'Lo más exclusivo de nuestra Maison',
      desc: 'Una selección de las piezas más excepcionales. Producción ultra limitada, materiales únicos. Para quienes buscan lo extraordinario.',
      getProducts() {
        return KD_PRODUCTS.filter(p => p.price >= 12000000).sort((a, b) => b.price - a.price).slice(0, 4);
      },
      totalCount() { return KD_PRODUCTS.filter(p => p.price >= 12000000).length; },
      filterCat: 'lujo', isLujo: true,
    },
  ];

  function handleDescubrir(filterCat) {
    window.__KD_initCat = filterCat;
    window.location.hash = '#catalogo';
  }

  return (
    <section className="kd-section kd-coll-section" id="colecciones">
      <div className="kd-section-head kd-reveal">
        <div className="kd-eyebrow">Colecciones</div>
        <h2 className="kd-h2">Explora por <em>categoría</em></h2>
        <p className="kd-lead">Desde muebles de autor hasta iluminación escultórica y objetos de lujo. Cada pieza, en producción limitada.</p>
      </div>

      {SECTIONS.map((sec, si) => (
        <div
          key={sec.id}
          className={`kd-coll-cat-section${sec.isLujo ? ' kd-coll-cat-section--lujo' : si % 2 === 1 ? ' kd-coll-cat-section--alt' : ''}`}
        >
          <div className="kd-coll-cat-header kd-reveal">
            <div className="kd-coll-cat-header-left">
              <div className="kd-eyebrow">{sec.eyebrow}</div>
              <h2 className="kd-h2 kd-coll-cat-h2">{sec.label}</h2>
              <p className="kd-coll-cat-tagline">{sec.tagline}</p>
              <p className="kd-lead">{sec.desc}</p>
            </div>
            <div className="kd-coll-cat-header-right">
              <button className="kd-btn-gold" onClick={() => handleDescubrir(sec.filterCat)}>
                {sec.isLujo ? 'Ver selección' : 'Descubrir ' + sec.label}
                <svg width="14" height="10" viewBox="0 0 14 10">
                  <path d="M 1 5 L 13 5 M 9 1 L 13 5 L 9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </button>
              <span className="kd-coll-cat-count">{sec.totalCount()} piezas</span>
            </div>
          </div>
          <div className="kd-coll-cat-grid kd-stagger">
            {sec.getProducts().map((p) => (
              <article
                key={p.id}
                className="kd-prod-card kd-reveal"
                onClick={() => handleDescubrir(sec.filterCat)}
                style={{ cursor: 'pointer' }}
              >
                <div className="kd-prod-art">
                  <span className="kd-prod-art-bg" />
                  <span className="kd-prod-art-icon"><IconView cat={p.cat} /></span>
                  {sec.isLujo && <span className="kd-coll-prestige-tag">PRESTIGE</span>}
                </div>
                <div className="kd-prod-meta">
                  <div className="kd-prod-coll">{p.coll}</div>
                  <h3 className="kd-prod-name">{p.name}</h3>
                  <div className="kd-prod-material">{p.material}</div>
                  <div className="kd-prod-foot">
                    <span className="kd-prod-price">{fmtCOP(p.price)}</span>
                    <span className="kd-prod-cta">
                      Ver pieza
                      <svg width="14" height="10" viewBox="0 0 14 10">
                        <path d="M 1 5 L 13 5 M 9 1 L 13 5 L 9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function Service() {
  const IconConsulta = () => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--gold)" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="22" height="16" rx="1.5"/>
      <path d="M 7 21 L 7 28 L 17 21"/>
      <circle cx="30" cy="23" r="6"/>
      <line x1="30" y1="20" x2="30" y2="26"/>
      <line x1="27" y1="23" x2="33" y2="23"/>
    </svg>
  );
  const IconProyecto = () => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--gold)" strokeWidth="0.85" strokeLinecap="round">
      <rect x="4" y="6" width="30" height="26"/>
      <line x1="4" y1="15" x2="34" y2="15"/>
      <line x1="19" y1="15" x2="19" y2="32"/>
      <line x1="4" y1="24" x2="19" y2="24"/>
      <rect x="8" y="18" width="7" height="6"/>
    </svg>
  );
  const IconCuraduria = () => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--gold)" strokeWidth="0.85" strokeLinecap="round">
      <rect x="5" y="5" width="28" height="28"/>
      <rect x="11" y="11" width="16" height="16"/>
      <line x1="5" y1="5" x2="11" y2="11"/>
      <line x1="33" y1="5" x2="27" y2="11"/>
      <line x1="5" y1="33" x2="11" y2="27"/>
      <line x1="33" y1="33" x2="27" y2="27"/>
    </svg>
  );

  const services = [
    {
      n: '01', Icon: IconConsulta, t: 'Consulta Privada', sub: 'Primera reunión sin compromiso',
      d: 'Una conversación íntima con uno de nuestros directores de interiorismo. En el showroom o en su residencia, definimos juntos la visión exacta de su espacio.',
      features: ['Evaluación completa del espacio', 'Propuesta de estilos y paleta', 'Orientación de presupuesto', 'Sin ningún compromiso'],
      meta: '60 — 90 min · Gratuita',
    },
    {
      n: '02', Icon: IconProyecto, t: 'Proyecto Residencial', sub: 'Llave en mano',
      d: 'Acompañamiento total desde el anteproyecto hasta la última pieza instalada. Coordinamos arquitectos, artesanos y logística con visión de maison europea.',
      features: ['Plano técnico y renders 3D', 'Selección curada de piezas', 'Coordinación de talleres y obra', 'Styling y entrega final'],
      meta: 'Desde 8 semanas · Cotización personalizada',
    },
    {
      n: '03', Icon: IconCuraduria, t: 'Curaduría de Espacios', sub: 'Sin necesidad de obra',
      d: 'Transformamos su hogar con una selección personalizada de mobiliario, iluminación y objetos de autor. Intervención estética sin obra estructural.',
      features: ['Diagnóstico del espacio actual', 'Mood board exclusivo', 'Selección curada de piezas', 'Instalación y styling incluidos'],
      meta: 'Desde 2 semanas · A partir de $8M COP',
    },
  ];

  return (
    <section className="kd-section kd-service-section" id="servicio">
      <div className="kd-service-head kd-reveal">
        <div className="kd-eyebrow">Servicio de diseño</div>
        <h2 className="kd-h2">Interiorismo <em>a su medida</em></h2>
        <p className="kd-service-intro">
          Para quienes desean confiar la curaduría de su hogar a un equipo de
          arquitectos e interioristas. Acompañamiento total, con visión de maison europea.
        </p>
      </div>
      <div className="kd-service-cards kd-stagger">
        {services.map(s => (
          <article key={s.n} className="kd-svc-card kd-reveal">
            <div className="kd-svc-card-header">
              <span className="kd-svc-n">{s.n}</span>
              <div className="kd-svc-icon"><s.Icon /></div>
            </div>
            <h3 className="kd-svc-title">{s.t}</h3>
            <span className="kd-svc-sub">{s.sub}</span>
            <p className="kd-svc-desc">{s.d}</p>
            <ul className="kd-svc-features">
              {s.features.map(f => (
                <li key={f}><span className="kd-svc-bullet">◆</span>{f}</li>
              ))}
            </ul>
            <div className="kd-svc-foot">
              <span className="kd-svc-meta">{s.meta}</span>
              <a href="#contacto" className="kd-svc-cta">
                Consultar
                <svg width="14" height="10" viewBox="0 0 14 10">
                  <path d="M 1 5 L 13 5 M 9 1 L 13 5 L 9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="kd-service-bottom kd-reveal">
        <p className="kd-service-bottom-text">Cada proyecto es único. Comenzamos siempre con una conversación.</p>
        <a href="#contacto" className="kd-btn-gold">Agendar consulta gratuita</a>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="kd-section kd-testi-section" id="testimonios">
      <div className="kd-section-head kd-reveal">
        <div className="kd-eyebrow">Testimonios</div>
        <h2 className="kd-h2">Las casas <em>de quienes ya viven Kasa Diamante</em></h2>
      </div>
      <div className="kd-testi-grid kd-stagger">
        {KD_TESTIMONIALS.map((t, i) => (
          <figure key={i} className="kd-testi kd-reveal">
            <span className="kd-testi-mark">"</span>
            <blockquote className="kd-testi-q">{t.quote}</blockquote>
            <figcaption className="kd-testi-cap">
              <span className="kd-testi-name">{t.name}</span>
              <span className="kd-testi-role">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Showroom() {
  return (
    <section className="kd-section kd-showroom-section" id="contacto">
      <div className="kd-showroom-grid">
        <div className="kd-showroom-left kd-reveal">
          <div className="kd-eyebrow">Showroom</div>
          <h2 className="kd-h2">Visítanos en<br/><em>nuestra Maison</em></h2>
          <ul className="kd-showroom-meta">
            <li>
              <span className="kd-eyebrow">Dirección</span>
              <span>Calle 81 N° 11–24<br/>Zona G · Bogotá D.C.</span>
            </li>
            <li>
              <span className="kd-eyebrow">Horario</span>
              <span>Lunes a sábado<br/>10:00 — 19:00</span>
            </li>
            <li>
              <span className="kd-eyebrow">Cita privada</span>
              <span>+57 310 421 89 04<br/>maison@kasadiamante.co</span>
            </li>
          </ul>
        </div>
        <div className="kd-showroom-map kd-reveal" style={{ '--kd-d': '160ms' }}>
          <svg viewBox="0 0 400 360" preserveAspectRatio="none" className="kd-map">
            <defs>
              <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--gold)" strokeOpacity="0.08" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="360" fill="url(#mapgrid)"/>
            <line x1="0" y1="100" x2="400" y2="100" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1"/>
            <line x1="0" y1="220" x2="400" y2="220" stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="2"/>
            <line x1="0" y1="290" x2="400" y2="290" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1"/>
            <line x1="120" y1="0" x2="120" y2="360" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1"/>
            <line x1="240" y1="0" x2="240" y2="360" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1.4"/>
            <line x1="340" y1="0" x2="340" y2="360" stroke="var(--gold)" strokeOpacity="0.2" strokeWidth="1"/>
            <rect x="130" y="110" width="100" height="100" fill="var(--gold)" fillOpacity="0.04" stroke="var(--gold)" strokeOpacity="0.25"/>
            <rect x="250" y="110" width="80" height="100" fill="var(--gold)" fillOpacity="0.04" stroke="var(--gold)" strokeOpacity="0.25"/>
            <rect x="130" y="230" width="100" height="50" fill="var(--gold)" fillOpacity="0.04" stroke="var(--gold)" strokeOpacity="0.25"/>
            <rect x="250" y="230" width="80" height="50" fill="var(--gold)" fillOpacity="0.04" stroke="var(--gold)" strokeOpacity="0.25"/>
            <g transform="translate(280,165)">
              <circle r="26" fill="var(--gold)" fillOpacity="0.1"/>
              <circle r="14" fill="var(--gold)" fillOpacity="0.2"/>
              <circle r="5" fill="var(--gold)"/>
            </g>
            <text x="280" y="200" textAnchor="middle" fontFamily="'Bodoni Moda', serif" fontSize="11" fill="var(--gold)">Maison · Zona G</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="kd-section kd-news-section">
      <div className="kd-news-inner kd-reveal">
        <div className="kd-eyebrow">Boletín privado</div>
        <h2 className="kd-h2">Recibe las <em>nuevas colecciones</em><br/>antes que el resto.</h2>
        <p className="kd-lead">Acceso anticipado a ediciones limitadas, eventos privados y editoriales.</p>
        {!sent ? (
          <form className="kd-news-form" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSent(true); }}>
            <input
              type="email" required placeholder="tu@correo.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="kd-news-input"
            />
            <button type="submit" className="kd-btn-gold">Suscribirme</button>
          </form>
        ) : (
          <p className="kd-news-thanks">Gracias. Te escribiremos pronto desde <strong>maison@kasadiamante.co</strong>.</p>
        )}
      </div>
    </section>
  );
}

export function PresetRooms() {
  const [open, setOpen] = useState(null);

  return (
    <section className="kd-section kd-combos-section" id="disenos">
      <div className="kd-section-head kd-reveal">
        <div className="kd-eyebrow">Diseños prediseñados</div>
        <h2 className="kd-h2">Conjuntos <em>listos para habitar</em></h2>
        <p className="kd-lead">Cinco ambientes curados por nuestros interioristas. Cada conjunto incluye las piezas exactas para transformar un espacio desde cero.</p>
      </div>

      <div className="kd-combos-grid kd-stagger">
        {KD_COMBOS.map((combo, ci) => {
          const products = combo.productIds
            .map(id => KD_PRODUCTS.find(p => p.id === id))
            .filter(Boolean);
          const total = products.reduce((sum, p) => sum + p.price, 0);
          const isOpen = open === combo.id;

          return (
            <article key={combo.id} className={`kd-combo-card kd-reveal${isOpen ? ' kd-combo-card--open' : ''}`} style={{ '--kd-d': ci * 80 + 'ms' }}>
              <div className="kd-combo-palette">
                {combo.palette.map((c, i) => (
                  <span key={i} className="kd-combo-swatch" style={{ background: c }} />
                ))}
              </div>
              <div className="kd-combo-header">
                <div className="kd-combo-meta">
                  <span className="kd-combo-room">{combo.room}</span>
                  <span className="kd-combo-style">{combo.style}</span>
                </div>
                <h3 className="kd-combo-name">{combo.name}</h3>
                <p className="kd-combo-tagline">{combo.tagline}</p>
                <p className="kd-combo-desc">{combo.desc}</p>
              </div>

              <div className="kd-combo-products">
                {products.map(p => (
                  <div key={p.id} className="kd-combo-product-row">
                    <span className="kd-combo-product-name">{p.name}</span>
                    <span className="kd-combo-product-mat">{p.material}</span>
                    <span className="kd-combo-product-price">{fmtCOP(p.price)}</span>
                  </div>
                ))}
              </div>

              <div className="kd-combo-foot">
                <div className="kd-combo-total">
                  <span className="kd-combo-total-label">Total estimado</span>
                  <span className="kd-combo-total-price">{fmtCOP(total)}</span>
                </div>
                <a href="#contacto" className="kd-btn-gold kd-combo-cta">
                  Solicitar asesoría
                  <svg width="14" height="10" viewBox="0 0 14 10">
                    <path d="M 1 5 L 13 5 M 9 1 L 13 5 L 9 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="kd-combos-note kd-reveal">
        <p>¿Ningún conjunto te convence del todo? Nuestros interioristas pueden armar el tuyo a medida.</p>
        <a href="#servicio" className="kd-combos-note-link">Ver servicio de diseño →</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="kd-footer">
      <div className="kd-footer-grid">
        <div className="kd-footer-brand">
          <div className="kd-logo kd-logo--lg">
            <span className="kd-logo-mark">◆</span>
            <span className="kd-logo-word">KASA DIAMANTE</span>
          </div>
          <p className="kd-footer-tag">Maison de mobiliario y objeto de autor.<br/>Bogotá · Milán · Lisboa</p>
        </div>
        <div className="kd-footer-cols">
          <div>
            <div className="kd-eyebrow">Colección</div>
            <ul>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#colecciones">Atelier Noir</a></li>
              <li><a href="#colecciones">Maison Doré</a></li>
              <li><a href="#colecciones">Casa Mediterránea</a></li>
            </ul>
          </div>
          <div>
            <div className="kd-eyebrow">Servicio</div>
            <ul>
              <li><a href="#disena">Diseña tu hogar</a></li>
              <li><a href="#servicio">Interiorismo llave en mano</a></li>
              <li><a href="#contacto">Consulta privada</a></li>
              <li><a href="#contacto">Showroom</a></li>
            </ul>
          </div>
          <div>
            <div className="kd-eyebrow">Maison</div>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Talleres</a></li>
              <li><a href="#">Prensa</a></li>
              <li><a href="#">Carrera</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="kd-footer-base">
        <span>© 2025 Kasa Diamante S.A.S.</span>
        <span>NIT 901.452.118-3</span>
        <span>Política de privacidad · Términos</span>
      </div>
    </footer>
  );
}
