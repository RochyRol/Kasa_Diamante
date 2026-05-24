import { useState, useMemo, useEffect, useRef } from 'react'
import { KD_ROOMS, KD_PRODUCTS, fmtCOP } from './data.js'
import { PlanIcon, IconView } from './furniture-svgs.jsx'

function classNames(...xs) { return xs.filter(Boolean).join(' '); }

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 760
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 760);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function ProductPickerSheet({ open, slot, room, onPick, onClear, onClose, selections }) {
  if (!open || !slot) return null;
  const products = KD_PRODUCTS.filter(p => p.cat === slot.cat);
  const currentId = selections[slot.id];

  return (
    <div className="picker-backdrop" onClick={onClose}>
      <div className="picker-sheet" onClick={(e) => e.stopPropagation()}>
        <header className="picker-head">
          <div>
            <div className="kd-eyebrow">{room.label} · Seleccionar</div>
            <h3 className="kd-h3">{slot.label}</h3>
          </div>
          <button className="picker-close" onClick={onClose} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M 4 4 L 16 16 M 16 4 L 4 16" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </header>

        <div className="picker-grid">
          {products.map(p => {
            const selected = currentId === p.id;
            return (
              <button
                key={p.id}
                className={classNames('picker-card', selected && 'picker-card--selected')}
                onClick={() => onPick(slot.id, p.id)}
              >
                <div className="picker-card-art">
                  <IconView cat={p.cat} />
                  {selected && <span className="picker-check">✓ Elegido</span>}
                </div>
                <div className="picker-card-meta">
                  <div className="picker-card-name">{p.name}</div>
                  <div className="picker-card-coll">{p.coll}</div>
                  <div className="picker-card-price">{fmtCOP(p.price)}</div>
                </div>
              </button>
            );
          })}
        </div>

        <footer className="picker-foot">
          <button className="kd-btn-ghost" onClick={() => onClear(slot.id)} disabled={!currentId}>
            Quitar selección
          </button>
          <button className="kd-btn-gold" onClick={onClose}>Listo</button>
        </footer>
      </div>
    </div>
  );
}

function MiCasaPanel({ selections, rooms, products, onJump, onClearAll }) {
  const total = useMemo(() => {
    return Object.values(selections).reduce((s, pid) => {
      const p = products.find(x => x.id === pid);
      return s + (p ? p.price : 0);
    }, 0);
  }, [selections, products]);

  const picksByRoom = rooms.map(r => {
    const items = r.slots
      .map(slot => {
        const pid = selections[slot.id];
        if (!pid) return null;
        const p = products.find(x => x.id === pid);
        return p ? { slot, product: p } : null;
      })
      .filter(Boolean);
    return { room: r, items };
  });

  const anyPicked = Object.keys(selections).length > 0;

  return (
    <aside className="micasa">
      <div className="micasa-head">
        <div className="kd-eyebrow">Mi Casa</div>
        <h3 className="kd-h3 micasa-title">Tu selección</h3>
      </div>

      <div className="micasa-body">
        {!anyPicked && (
          <div className="micasa-empty">
            <div className="micasa-empty-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M 8 24 L 24 10 L 40 24 L 40 40 L 8 40 Z" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="40" x2="20" y2="28" stroke="currentColor" strokeWidth="1" />
                <line x1="28" y1="40" x2="28" y2="28" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <p>Toca cualquier objeto del plano para empezar a curar tu hogar.</p>
          </div>
        )}

        {picksByRoom.map(({ room, items }) => (
          items.length > 0 && (
            <section key={room.id} className="micasa-room">
              <div className="micasa-room-head">
                <span className="micasa-room-name">{room.label}</span>
                <span className="micasa-room-area">{room.area}</span>
              </div>
              <ul className="micasa-list">
                {items.map(({ slot, product }) => (
                  <li key={slot.id} className="micasa-item" onClick={() => onJump(room, slot)}>
                    <span className="micasa-item-icon">
                      <IconView cat={product.cat} />
                    </span>
                    <span className="micasa-item-text">
                      <span className="micasa-item-name">{product.name}</span>
                      <span className="micasa-item-slot">{slot.label}</span>
                    </span>
                    <span className="micasa-item-price">{fmtCOP(product.price)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        ))}
      </div>

      {anyPicked && (
        <div className="micasa-foot">
          <div className="micasa-total">
            <span className="kd-eyebrow">Total estimado</span>
            <span className="micasa-total-value">{fmtCOP(total)}</span>
          </div>
          <div className="micasa-actions">
            <button className="kd-btn-ghost" onClick={onClearAll}>Limpiar</button>
            <button className="kd-btn-gold">Solicitar cotización</button>
          </div>
        </div>
      )}
    </aside>
  );
}

function PlanArchitecture() {
  return (
    <svg className="kd-plan-arch" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x="0.4" y="0.4" width="99.2" height="99.2" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.55" />
      <line x1="52" y1="4"  x2="52" y2="42" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.4" />
      <line x1="52" y1="46" x2="52" y2="98" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.4" />
      <line x1="2"  y1="52" x2="50" y2="52" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.4" />
      <line x1="54" y1="44" x2="98" y2="44" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.4" />
      <g stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.55" fill="none">
        <path d="M 52 20 A 8 8 0 0 1 60 28" />
        <line x1="52" y1="20" x2="52" y2="28" strokeOpacity="0.3" strokeDasharray="1 1" />
      </g>
      <g stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.55" fill="none">
        <path d="M 20 52 A 7 7 0 0 1 27 59" />
        <line x1="20" y1="52" x2="27" y2="52" strokeOpacity="0.3" strokeDasharray="1 1" />
      </g>
      <g stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.55" fill="none">
        <path d="M 52 70 A 7 7 0 0 1 59 77" />
        <line x1="52" y1="70" x2="52" y2="77" strokeOpacity="0.3" strokeDasharray="1 1" />
      </g>
      <g stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.55" fill="none">
        <path d="M 76 44 A 6 6 0 0 1 82 50" />
        <line x1="76" y1="44" x2="76" y2="50" strokeOpacity="0.3" strokeDasharray="1 1" />
      </g>
      <g stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.85" fill="none">
        <line x1="62" y1="0" x2="78" y2="0" strokeWidth="0.6" />
        <line x1="62" y1="0.6" x2="78" y2="0.6" />
        <line x1="0" y1="18" x2="0" y2="36" strokeWidth="0.6" />
        <line x1="0.6" y1="18" x2="0.6" y2="36" />
        <line x1="100" y1="60" x2="100" y2="78" strokeWidth="0.6" />
        <line x1="99.4" y1="60" x2="99.4" y2="78" />
        <line x1="22" y1="100" x2="36" y2="100" strokeWidth="0.6" />
        <line x1="22" y1="99.4" x2="36" y2="99.4" />
      </g>
      <g stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.7" fill="none">
        <path d="M 28 0 L 28 -1.5 L 42 -1.5 L 42 0" />
        <text x="35" y="-2.5" textAnchor="middle" fontSize="2" fill="var(--gold)" fillOpacity="0.7" fontFamily="'JetBrains Mono', monospace">ENTRADA</text>
      </g>
      <g stroke="var(--gold)" strokeOpacity="0.3" strokeWidth="0.2" fill="var(--gold)" fillOpacity="0.5" fontSize="2" fontFamily="'JetBrains Mono', monospace">
        <line x1="-2" y1="4" x2="-2" y2="98" />
        <line x1="-2.6" y1="4" x2="-1.4" y2="4" />
        <line x1="-2.6" y1="98" x2="-1.4" y2="98" />
        <text x="-3.5" y="52" textAnchor="middle" transform="rotate(-90 -3.5 52)">12.40 m</text>
      </g>
    </svg>
  );
}

/* ── Mobile room planner ── */
function MobileFloorPlan({ selections, onPick, onClear, onClearAll, openSlot, setOpenSlot }) {
  const [activeRoomId, setActiveRoomId] = useState(KD_ROOMS[0].id);
  const activeRoom = KD_ROOMS.find(r => r.id === activeRoomId) || KD_ROOMS[0];

  const total = useMemo(() =>
    Object.values(selections).reduce((s, pid) => {
      const p = KD_PRODUCTS.find(x => x.id === pid);
      return s + (p?.price || 0);
    }, 0),
    [selections]
  );

  const selectedCount = Object.keys(selections).length;

  const ROOM_ICONS = {
    sala:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="10" width="20" height="10" rx="2"/><path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M2 15h20"/></svg>,
    comedor:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="4" y="6" width="16" height="2" rx="1"/><line x1="7" y1="8" x2="7" y2="18"/><line x1="12" y1="8" x2="12" y2="18"/><line x1="17" y1="8" x2="17" y2="18"/><line x1="2" y1="18" x2="22" y2="18"/></svg>,
    recamara:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="12" width="20" height="8" rx="2"/><path d="M2 14h20M7 12V9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3"/></svg>,
    recamara2:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M3 15h18M8 13v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/></svg>,
  };

  return (
    <section className="kd-section kd-plan-section kd-plan-mobile" id="disena">
      <div className="kd-section-head kd-reveal">
        <div className="kd-eyebrow">Diseña tu hogar</div>
        <h2 className="kd-h2">El plano de tu casa, <em>curado pieza por pieza</em></h2>
        <p className="kd-lead">
          Elige la habitación y selecciona cada pieza que ocupará ese espacio.
        </p>
      </div>

      {/* Room tabs */}
      <div className="kd-room-tabs">
        {KD_ROOMS.map(r => (
          <button
            key={r.id}
            className={`kd-room-tab ${activeRoomId === r.id ? 'kd-room-tab--active' : ''}`}
            onClick={() => setActiveRoomId(r.id)}
          >
            <span className="kd-room-tab-icon">{ROOM_ICONS[r.id]}</span>
            <span className="kd-room-tab-label">{r.label}</span>
            <span className="kd-room-tab-area">{r.area}</span>
            {r.slots.some(s => selections[s.id]) && (
              <span className="kd-room-tab-badge">
                {r.slots.filter(s => selections[s.id]).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Slot cards for active room */}
      <div className="kd-slot-grid">
        {activeRoom.slots.map(slot => {
          const productId = selections[slot.id];
          const product = productId ? KD_PRODUCTS.find(p => p.id === productId) : null;
          return (
            <button
              key={slot.id}
              className={`kd-slot-card ${productId ? 'kd-slot-card--filled' : ''}`}
              onClick={() => setOpenSlot({ room: activeRoom, slot })}
            >
              <div className="kd-slot-card-icon">
                <PlanIcon cat={slot.cat} />
              </div>
              <div className="kd-slot-card-body">
                <div className="kd-slot-card-label">{slot.label}</div>
                {product ? (
                  <>
                    <div className="kd-slot-card-product">{product.name}</div>
                    <div className="kd-slot-card-price">{fmtCOP(product.price)}</div>
                  </>
                ) : (
                  <div className="kd-slot-card-empty">Toca para elegir</div>
                )}
              </div>
              <div className="kd-slot-card-action">
                {productId
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--gold)" strokeWidth="1"/><path d="M5 8l2 2 4-4" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1"/><line x1="8" y1="5" x2="8" y2="11" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2"/><line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2"/></svg>
                }
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom summary */}
      {selectedCount > 0 && (
        <div className="kd-plan-mobile-foot">
          <div className="kd-plan-mobile-foot-info">
            <span className="kd-plan-mobile-count">{selectedCount} pieza{selectedCount !== 1 ? 's' : ''}</span>
            <span className="kd-plan-mobile-total">{fmtCOP(total)}</span>
          </div>
          <div className="kd-plan-mobile-foot-actions">
            <button className="kd-btn-ghost kd-plan-mobile-clear" onClick={onClearAll}>Limpiar</button>
            <button className="kd-btn-gold">Cotizar →</button>
          </div>
        </div>
      )}

      <ProductPickerSheet
        open={!!openSlot}
        slot={openSlot?.slot}
        room={openSlot?.room}
        selections={selections}
        onPick={onPick}
        onClear={onClear}
        onClose={() => setOpenSlot(null)}
      />
    </section>
  );
}

export function FloorPlan() {
  const [selections, setSelections] = useState(() => {
    try {
      const raw = localStorage.getItem('kd_selections');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      'sala-sofa':     'sf-modena',
      'sala-mesa':     'm-orbis',
      'sala-lampara':  'l-arc',
      'com-mesa':      'c-versalles',
      'com-lampara':   'l-stella',
      'rec-cama':      'cm-imperial',
    };
  });
  const [openSlot, setOpenSlot] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const planRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    try { localStorage.setItem('kd_selections', JSON.stringify(selections)); } catch (e) {}
  }, [selections]);

  const handlePick = (slotId, productId) => {
    setSelections(s => ({ ...s, [slotId]: productId }));
  };
  const handleClear = (slotId) => {
    setSelections(s => { const n = { ...s }; delete n[slotId]; return n; });
  };
  const handleClearAll = () => setSelections({});
  const handleJump = (room, slot) => setOpenSlot({ room, slot });

  if (isMobile) {
    return (
      <MobileFloorPlan
        selections={selections}
        onPick={handlePick}
        onClear={handleClear}
        onClearAll={handleClearAll}
        openSlot={openSlot}
        setOpenSlot={setOpenSlot}
      />
    );
  }

  return (
    <section className="kd-section kd-plan-section" id="disena">
      <div className="kd-section-head kd-reveal">
        <div className="kd-eyebrow">Diseña tu hogar</div>
        <h2 className="kd-h2 kd-foil">El plano de tu casa, <em>curado pieza por pieza</em></h2>
        <p className="kd-lead">
          Toca cualquier elemento del plano para elegir la pieza Kasa Diamante que ocupará ese lugar.
          Tu selección se guarda en cada habitación.
        </p>
      </div>

      <div className="kd-plan-wrap kd-reveal" style={{ '--kd-d': '120ms' }}>
        <div className="kd-plan-canvas" ref={planRef}>
          <div className="kd-plan-dust" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} style={{
                '--x': Math.random() * 100 + '%',
                '--y': Math.random() * 100 + '%',
                '--s': (Math.random() * 0.7 + 0.3).toFixed(2),
                '--d': (Math.random() * 8 + 6).toFixed(2) + 's',
                '--dl': (Math.random() * -10).toFixed(2) + 's',
              }} />
            ))}
          </div>

          <div className="kd-plan-compass">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.7" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.4" />
              <path d="M 20 4 L 23 20 L 20 36 L 17 20 Z" fill="currentColor" />
              <text x="20" y="3" textAnchor="middle" fontSize="4" fill="currentColor" fontFamily="'JetBrains Mono', monospace">N</text>
              <text x="20" y="39.5" textAnchor="middle" fontSize="3" fill="currentColor" fillOpacity="0.5" fontFamily="'JetBrains Mono', monospace">S</text>
            </svg>
          </div>
          <div className="kd-plan-scale">
            <span>0</span>
            <span className="kd-plan-scale-bar" />
            <span>5 m</span>
          </div>
          <div className="kd-plan-meta">
            <span>KASA DIAMANTE · MAISON #017</span>
            <span>114 m² · ESC 1:75</span>
          </div>
          <div className="kd-plan-title">
            <span className="kd-plan-title-num">PLANTA · NIVEL 01</span>
            <span className="kd-plan-title-name">RESIDENCIA · ATELIER NOIR</span>
          </div>

          <div className="kd-plan">
            <PlanArchitecture />

            {KD_ROOMS.map(r => (
              <div
                key={r.id}
                data-room={r.id}
                className={`kd-plan-room kd-plan-room--${r.id}`}
                style={{
                  left:   r.bounds.x + '%',
                  top:    r.bounds.y + '%',
                  width:  r.bounds.w + '%',
                  height: r.bounds.h + '%',
                }}
              >
                <div className="kd-plan-room-label">
                  <span className="kd-plan-room-name">{r.label}</span>
                  <span className="kd-plan-room-area">{r.area}</span>
                </div>
              </div>
            ))}

            {KD_ROOMS.flatMap(r => r.slots.map(slot => {
              const productId = selections[slot.id];
              const product = productId ? KD_PRODUCTS.find(p => p.id === productId) : null;
              const isRug = slot.cat === 'alfombras';
              const isLamp = slot.cat === 'lamparas';
              return (
                <button
                  key={slot.id}
                  className={classNames(
                    'kd-plan-slot',
                    `kd-plan-slot--${slot.cat}`,
                    productId && 'kd-plan-slot--filled',
                    isRug && 'kd-plan-slot--rug',
                    isLamp && 'kd-plan-slot--lamp',
                    hoveredSlot === slot.id && 'kd-plan-slot--hover',
                  )}
                  style={{
                    left:   slot.x + '%',
                    top:    slot.y + '%',
                    width:  slot.w + '%',
                    height: slot.h + '%',
                  }}
                  onClick={() => setOpenSlot({ room: r, slot })}
                  onMouseEnter={() => setHoveredSlot(slot.id)}
                  onMouseLeave={() => setHoveredSlot(null)}
                  aria-label={`${slot.label} en ${r.label}`}
                >
                  <span className="kd-plan-slot-art">
                    <PlanIcon cat={slot.cat} />
                  </span>
                  <span className="kd-plan-slot-tag">
                    {product ? product.name : slot.label}
                  </span>
                </button>
              );
            }))}
          </div>
        </div>

        <MiCasaPanel
          selections={selections}
          rooms={KD_ROOMS}
          products={KD_PRODUCTS}
          onJump={handleJump}
          onClearAll={handleClearAll}
        />
      </div>

      <ProductPickerSheet
        open={!!openSlot}
        slot={openSlot && openSlot.slot}
        room={openSlot && openSlot.room}
        selections={selections}
        onPick={handlePick}
        onClear={handleClear}
        onClose={() => setOpenSlot(null)}
      />
    </section>
  );
}
