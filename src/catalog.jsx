import { useState, useMemo, useEffect } from 'react'
import { KD_CATEGORIES, KD_PRODUCTS, fmtCOP } from './data.js'
import { IconView } from './furniture-svgs.jsx'

const MUEBLES_CATS = ['sofas', 'mesas', 'camas', 'sillas', 'espejos', 'alfombras'];

function dimsLabel(dims) {
  if (!dims) return null;
  const parts = [];
  if (dims.largo)       parts.push(`${dims.largo} cm largo`);
  if (dims.ancho)       parts.push(`${dims.ancho} cm ancho`);
  if (dims.alto)        parts.push(`${dims.alto} cm alto`);
  if (dims.profundo)    parts.push(`${dims.profundo} cm profundo`);
  if (dims.diam)        parts.push(`Ø ${dims.diam} cm`);
  if (dims.diam_total)  parts.push(`Ø total ${dims.diam_total} cm`);
  if (dims.diam_espejo) parts.push(`Ø espejo ${dims.diam_espejo} cm`);
  if (dims.alt_total)   parts.push(`${dims.alt_total} cm alto`);
  if (dims.alt_asiento) parts.push(`Asiento ${dims.alt_asiento} cm`);
  if (dims.alt_colgante)parts.push(`Colgante ${dims.alt_colgante} cm`);
  if (dims.largo_cama)  parts.push(`${dims.largo_cama} × ${dims.ancho_cama} cm`);
  if (dims.alt_cabecera)parts.push(`Cabecera ${dims.alt_cabecera} cm`);
  if (dims.alt_postes)  parts.push(`Postes ${dims.alt_postes} cm`);
  return parts.join(' · ');
}

const GALLERY_VIEWS = [
  { label: 'Vista frontal',  tint: 'rgba(212,175,55,0.05)', scale: 1.05 },
  { label: 'Vista lateral',  tint: 'rgba(255,255,255,0.03)', scale: 0.82 },
  { label: 'Detalle',        tint: 'rgba(212,175,55,0.09)', scale: 1.22 },
  { label: 'En ambiente',    tint: 'rgba(154,111,16,0.07)', scale: 0.70 },
];

function ProductModal({ product, onClose }) {
  const [activeView, setActiveView] = useState(0);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;
  const { spec } = product;
  const dims = spec?.dims ? dimsLabel(spec.dims) : null;
  const view = GALLERY_VIEWS[activeView];
  const stockLabel = !spec?.stock ? 'Bajo pedido'
    : spec.stock > 5 ? 'Disponible'
    : spec.stock > 2 ? `Solo ${spec.stock} unidades`
    : spec.stock === 1 ? 'Última unidad'
    : `${spec.stock} en stock`;
  const stockClass = !spec?.stock ? 'kd-stock--order'
    : spec.stock > 5 ? 'kd-stock--ok'
    : 'kd-stock--low';

  return (
    <div className="kd-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="kd-modal" role="dialog" aria-modal="true">

        {/* ── Gallery column ── */}
        <div className="kd-gallery">
          <div className="kd-gallery-main" style={{ background: view.tint }}>
            <div className="kd-gallery-grain" />
            <div className="kd-gallery-icon" style={{ transform: `scale(${view.scale})` }}>
              <IconView cat={product.cat} />
            </div>
            <div className="kd-gallery-counter">{activeView + 1} / {GALLERY_VIEWS.length}</div>
            <button className="kd-gallery-arrow kd-gallery-arrow--prev" onClick={() => setActiveView(v => (v - 1 + GALLERY_VIEWS.length) % GALLERY_VIEWS.length)} aria-label="Anterior">
              <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
            </button>
            <button className="kd-gallery-arrow kd-gallery-arrow--next" onClick={() => setActiveView(v => (v + 1) % GALLERY_VIEWS.length)} aria-label="Siguiente">
              <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div className="kd-gallery-thumbs">
            {GALLERY_VIEWS.map((v, i) => (
              <button
                key={i}
                className={`kd-gallery-thumb${activeView === i ? ' kd-gallery-thumb--active' : ''}`}
                onClick={() => setActiveView(i)}
                title={v.label}
                style={{ background: v.tint || 'transparent' }}
              >
                <span className="kd-gallery-thumb-icon"><IconView cat={product.cat} /></span>
                <span className="kd-gallery-thumb-label">{v.label}</span>
              </button>
            ))}
          </div>

          <p className="kd-gallery-note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.5"/>
              <line x1="6" y1="5" x2="6" y2="9" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.5"/>
              <circle cx="6" cy="3.2" r="0.5" fill="currentColor" fillOpacity="0.5"/>
            </svg>
            Fotografías de alta resolución disponibles en showroom
          </p>
        </div>

        {/* ── Info column ── */}
        <div className="kd-modal-info">
          <button className="kd-modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
          </button>

          <div className="kd-modal-brand">
            <span className="kd-modal-coll-tag">{product.coll}</span>
            {product.year && <span className="kd-modal-year">{product.year}</span>}
          </div>

          <h2 className="kd-modal-title">{product.name}</h2>

          <div className="kd-modal-price-row">
            <span className="kd-modal-price">{fmtCOP(product.price)}</span>
            <span className={`kd-stock-badge ${stockClass}`}>{stockLabel}</span>
          </div>

          {spec?.desc && <p className="kd-ficha-desc">{spec.desc}</p>}

          <div className="kd-ficha-specs">
            {spec?.finish && (
              <div className="kd-spec-row">
                <span className="kd-spec-label">Material</span>
                <span className="kd-spec-val">{spec.finish}</span>
              </div>
            )}
            {dims && (
              <div className="kd-spec-row">
                <span className="kd-spec-label">Dimensiones</span>
                <span className="kd-spec-val">{dims}</span>
              </div>
            )}
            {product.seats && (
              <div className="kd-spec-row">
                <span className="kd-spec-label">Capacidad</span>
                <span className="kd-spec-val">{product.seats} comensales</span>
              </div>
            )}
            {spec?.origin && (
              <div className="kd-spec-row">
                <span className="kd-spec-label">Origen</span>
                <span className="kd-spec-val">{spec.origin}</span>
              </div>
            )}
            {spec?.delivery && (
              <div className="kd-spec-row">
                <span className="kd-spec-label">Entrega</span>
                <span className="kd-spec-val">{spec.delivery}</span>
              </div>
            )}
          </div>

          {spec?.care && (
            <details className="kd-ficha-care-details">
              <summary className="kd-ficha-care-summary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C7 1 2 4 2 8.5C2 11 4.2 13 7 13C9.8 13 12 11 12 8.5C12 4 7 1 7 1Z" stroke="currentColor" strokeWidth="0.9" fill="none"/>
                  <line x1="7" y1="7" x2="7" y2="11" stroke="currentColor" strokeWidth="0.9"/>
                </svg>
                Cuidado y mantenimiento
              </summary>
              <p className="kd-ficha-care-text">{spec.care}</p>
            </details>
          )}

          <div className="kd-modal-actions">
            <a href="#contacto" className="kd-modal-cta" onClick={onClose}>
              Solicitar asesoría
              <svg width="16" height="10" viewBox="0 0 16 10">
                <path d="M 1 5 L 15 5 M 11 1 L 15 5 L 11 9" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
              </svg>
            </a>
            <button className="kd-modal-share" onClick={onClose} title="Compartir">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="13" cy="3" r="1.8" stroke="currentColor" strokeWidth="1"/>
                <circle cx="3" cy="8" r="1.8" stroke="currentColor" strokeWidth="1"/>
                <circle cx="13" cy="13" r="1.8" stroke="currentColor" strokeWidth="1"/>
                <line x1="4.8" y1="7.1" x2="11.2" y2="3.9" stroke="currentColor" strokeWidth="1"/>
                <line x1="4.8" y1="8.9" x2="11.2" y2="12.1" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export function Catalog({ density = 3, onAddToCart }) {
  const [active, setActive] = useState(() => {
    const init = window.__KD_initCat || 'todos';
    window.__KD_initCat = null;
    return init;
  });
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (active === 'todos')   return KD_PRODUCTS;
    if (active === 'muebles') return KD_PRODUCTS.filter(p => MUEBLES_CATS.includes(p.cat));
    if (active === 'lujo')    return KD_PRODUCTS.filter(p => p.price >= 12000000).sort((a, b) => b.price - a.price);
    return KD_PRODUCTS.filter(p => p.cat === active);
  }, [active]);

  function getCount(catId) {
    if (catId === 'muebles') return KD_PRODUCTS.filter(p => MUEBLES_CATS.includes(p.cat)).length;
    if (catId === 'lujo')    return KD_PRODUCTS.filter(p => p.price >= 12000000).length;
    return KD_PRODUCTS.filter(p => p.cat === catId).length;
  }

  return (
    <>
      <section className="kd-section kd-catalog-section" id="catalogo">
        <div className="kd-section-head kd-reveal">
          <div className="kd-eyebrow">Catálogo</div>
          <h2 className="kd-h2">La colección <em>completa</em></h2>
          <p className="kd-lead">
            Cada pieza es fabricada en talleres seleccionados de Europa y América Latina.
            Producción limitada. Entrega curada a domicilio.
          </p>
        </div>

        <nav className="kd-cat-nav kd-reveal" style={{ '--kd-d': '100ms' }}>
          <button
            className={`kd-cat-pill ${active === 'todos' ? 'kd-cat-pill--active' : ''}`}
            onClick={() => setActive('todos')}
          >
            Todos
            <span className="kd-cat-pill-count">{KD_PRODUCTS.length}</span>
          </button>
          <button
            className={`kd-cat-pill ${active === 'muebles' ? 'kd-cat-pill--active' : ''}`}
            onClick={() => setActive('muebles')}
          >
            Muebles
            <span className="kd-cat-pill-count">{getCount('muebles')}</span>
          </button>
          {KD_CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`kd-cat-pill ${active === c.id ? 'kd-cat-pill--active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="kd-cat-pill-count">{getCount(c.id)}</span>
            </button>
          ))}
          <button
            className={`kd-cat-pill kd-cat-pill--lujo ${active === 'lujo' ? 'kd-cat-pill--active' : ''}`}
            onClick={() => setActive('lujo')}
          >
            ◆ Lujo
            <span className="kd-cat-pill-count">{getCount('lujo')}</span>
          </button>
        </nav>

        <div className="kd-prod-grid" style={{ '--cols': density }}>
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="kd-prod-card kd-prod-card--loaded"
              onClick={() => setSelected(p)}
              style={{ '--kd-d': (i % 8) * 60 + 'ms', cursor: 'pointer' }}
            >
              <div className="kd-prod-art">
                <span className="kd-prod-art-bg" />
                <span className="kd-prod-art-icon">
                  <IconView cat={p.cat} />
                </span>
                <span className="kd-prod-art-tag">N° {String(i + 1).padStart(3, '0')}</span>
                {p.price >= 12000000 && active === 'lujo' && (
                  <span className="kd-coll-prestige-tag">PRESTIGE</span>
                )}
              </div>
              <div className="kd-prod-meta">
                <div className="kd-prod-coll">{p.coll}</div>
                <h3 className="kd-prod-name">{p.name}</h3>
                <div className="kd-prod-material">{p.material}</div>
                <div className="kd-prod-foot">
                  <span className="kd-prod-price">{fmtCOP(p.price)}</span>
                  <div className="kd-prod-actions">
                    {onAddToCart && (
                      <button className="kd-prod-cart" onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} title="Añadir al carrito">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1 1h2l2 8h7l1.5-5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="7" cy="13" r="1" fill="currentColor"/>
                          <circle cx="12" cy="13" r="1" fill="currentColor"/>
                        </svg>
                      </button>
                    )}
                    <button className="kd-prod-cta" onClick={(e) => { e.stopPropagation(); setSelected(p); }}>
                      Ficha técnica
                      <svg width="14" height="10" viewBox="0 0 14 10"><path d="M 1 5 L 13 5 M 9 1 L 13 5 L 9 9" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
