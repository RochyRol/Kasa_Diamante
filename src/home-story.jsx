import { useState, useEffect, useRef } from 'react'
import { KD_PRODUCTS, fmtCOP } from './data.js'
import { IconView } from './furniture-svgs.jsx'

const STAGES = [
  { caption: 'Cada espacio empieza vacío.',           subtitle: 'Una invitación a habitarlo.',                    label: 'EL ESPACIO',  productId: null,           note: 'Maison · Bogotá · MMXIV' },
  { caption: 'Una mesa, escogida con intención.',     subtitle: 'Roble quemado, herraje dorado.',                  label: 'LA MESA',     productId: 'm-rivoli',     note: null },
  { caption: 'Un florero.',                            subtitle: 'Vidrio soplado a mano.',                          label: 'EL FLORERO',  productId: 'd-vaso',       note: null },
  { caption: 'Y la vida que florece dentro.',          subtitle: 'Cada arreglo curado por nuestro equipo.',         label: 'EL STYLING',  productId: null,           note: 'Servicio de styling · incluido' },
  { caption: 'Un sillón, el descanso.',                subtitle: 'Bouclé marfil sobre base de roble.',              label: 'EL SILLÓN',   productId: 'sf-coco',      note: null },
  { caption: 'La luz exacta.',                         subtitle: 'Latón pulido, sombra envolvente.',                 label: 'LA LÁMPARA',  productId: 'l-stella',     note: null },
  { caption: 'Una obra, una historia.',                subtitle: 'Arte original de autores locales.',               label: 'LA OBRA',     productId: 'd-cuadro',     note: null },
  { caption: 'Tu casa, una obra.',                     subtitle: 'Empieza a curarla pieza por pieza.', cta: true,   label: 'EMPEZAR',     productId: null,           note: '109 piezas en catálogo' },
];

const PRODUCT_CARD_POSITIONS = {
  1: { top: '13%',    right: '36px', side: 'right' },
  2: { top: '50%',    right: '36px', side: 'right' },
  4: { top: '18%',    left: '36px',  side: 'left'  },
  5: { bottom: '18%', right: '36px', side: 'right' },
  6: { top: '56%',    left: '36px',  side: 'left'  },
};

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

function Scene({ show }) {
  return (
    <svg viewBox="0 0 1400 900" className="kd-scene" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="kd-scene-light" cx="50%" cy="0%" r="80%">
          <stop offset="0%"  stopColor="#fff" stopOpacity="0.18" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kd-lamp-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="var(--gold)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="scene-el scene-room" data-show={show.room ? 1 : 0}>
        <ellipse cx="780" cy="380" rx="380" ry="280" fill="url(#kd-scene-light)" />
        <line x1="40" y1="760" x2="1360" y2="760" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.9" />
        <line x1="40" y1="770" x2="1360" y2="770" stroke="#fff" strokeOpacity="0.18" strokeWidth="0.5" />
        <line x1="700" y1="120" x2="700" y2="760" stroke="#fff" strokeOpacity="0.18" strokeWidth="0.6" />
        <path d="M 760 240 Q 760 140 850 140 Q 940 140 940 240 L 940 540 L 760 540 Z"
              fill="none" stroke="#fff" strokeOpacity="0.32" strokeWidth="1" />
        <line x1="850" y1="140" x2="850" y2="540" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" />
        <line x1="760" y1="340" x2="940" y2="340" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" />
        <line x1="740" y1="540" x2="960" y2="540" stroke="#fff" strokeOpacity="0.32" strokeWidth="0.7" />
      </g>

      <g className="scene-el scene-table" data-show={show.table ? 1 : 0}>
        <rect x="760" y="600" width="200" height="8" rx="1.5"
              fill="#fff" fillOpacity="0.05" stroke="#fff" strokeWidth="1.1" />
        <line x1="760" y1="600" x2="960" y2="600" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.5" />
        <line x1="775" y1="612" x2="945" y2="612" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.5" />
        <line x1="780" y1="608" x2="782" y2="760" stroke="#fff" strokeWidth="1" />
        <line x1="940" y1="608" x2="938" y2="760" stroke="#fff" strokeWidth="1" />
        <line x1="780" y1="752" x2="782" y2="760" stroke="var(--gold)" strokeWidth="1.4" />
        <line x1="940" y1="752" x2="938" y2="760" stroke="var(--gold)" strokeWidth="1.4" />
      </g>

      <g className="scene-el scene-vase" data-show={show.vase ? 1 : 0}>
        <path d="M 830 600 L 832 540 Q 836 524 850 522 L 870 522 Q 884 524 888 540 L 890 600 Z"
              fill="#fff" fillOpacity="0.08" stroke="#fff" strokeWidth="1.2" />
        <ellipse cx="860" cy="522" rx="22" ry="3" fill="none" stroke="#fff" strokeWidth="0.8" />
        <path d="M 838 540 Q 836 570 838 595" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.5" />
        <ellipse cx="860" cy="522" rx="22" ry="3" fill="none" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="0.6" />
      </g>

      <g className="scene-el scene-flowers" data-show={show.flowers ? 1 : 0}>
        <path d="M 850 522 Q 838 470 826 422" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="0.9" />
        <path d="M 860 522 Q 862 450 866 396" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="0.9" />
        <path d="M 870 522 Q 884 478 898 432" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.85" />
        <path d="M 855 522 Q 850 482 848 446" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.7" />
        <path d="M 858 480 Q 844 478 838 484 Q 850 484 858 480" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="0.4" />
        <path d="M 880 478 Q 894 476 900 482 Q 888 484 880 478" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="0.4" />
        <g stroke="#fff" strokeWidth="0.9" fill="#fff" fillOpacity="0.22">
          <circle cx="826" cy="420" r="15" />
          <circle cx="866" cy="394" r="18" />
          <circle cx="898" cy="430" r="13" />
          <circle cx="848" cy="444" r="10" fillOpacity="0.18" />
        </g>
        <g stroke="#fff" strokeOpacity="0.5" strokeWidth="0.4" fill="none">
          <circle cx="826" cy="420" r="7" />
          <circle cx="866" cy="394" r="9" />
          <circle cx="898" cy="430" r="6" />
          <line x1="826" y1="413" x2="826" y2="427" />
          <line x1="819" y1="420" x2="833" y2="420" />
          <line x1="866" y1="385" x2="866" y2="403" />
          <line x1="857" y1="394" x2="875" y2="394" />
        </g>
        <circle cx="826" cy="420" r="2" fill="var(--gold)" />
        <circle cx="866" cy="394" r="2.5" fill="var(--gold)" />
        <circle cx="898" cy="430" r="1.8" fill="var(--gold)" />
      </g>

      <g className="scene-el scene-chair" data-show={show.chair ? 1 : 0}>
        <path d="M 200 500 Q 200 380 280 380 L 380 380 L 380 760 L 200 760 Z"
              fill="#fff" fillOpacity="0.05" stroke="#fff" strokeWidth="1.2" />
        <path d="M 380 480 L 380 760" stroke="#fff" strokeWidth="1" />
        <path d="M 200 500 L 200 760" stroke="#fff" strokeWidth="1" />
        <line x1="215" y1="510" x2="380" y2="510" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
        <line x1="215" y1="600" x2="380" y2="600" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.5" />
        <rect x="225" y="408" width="80" height="46" rx="6"
              fill="var(--gold)" fillOpacity="0.32" stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="0.8" />
        <line x1="220" y1="760" x2="220" y2="780" stroke="#fff" strokeWidth="1" />
        <line x1="360" y1="760" x2="360" y2="780" stroke="#fff" strokeWidth="1" />
      </g>

      <g className="scene-el scene-lamp" data-show={show.lamp ? 1 : 0}>
        <ellipse cx="1180" cy="320" rx="220" ry="320" fill="url(#kd-lamp-pool)" />
        <path d="M 1150 270 L 1210 270 L 1198 326 L 1162 326 Z"
              fill="var(--gold)" fillOpacity="0.55" stroke="#fff" strokeWidth="1.2" />
        <line x1="1150" y1="270" x2="1210" y2="270" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
        <line x1="1180" y1="326" x2="1180" y2="754" stroke="#fff" strokeWidth="1.1" />
        <ellipse cx="1180" cy="756" rx="28" ry="5" fill="var(--gold)" fillOpacity="0.4" stroke="#fff" strokeWidth="1" />
        <circle cx="1180" cy="298" r="5" fill="#fff" />
        <circle cx="1180" cy="298" r="12" fill="var(--gold)" fillOpacity="0.3" />
      </g>

      <g className="scene-el scene-frame" data-show={show.frame ? 1 : 0}>
        <rect x="420" y="200" width="120" height="160" rx="2"
              fill="#fff" fillOpacity="0.04" stroke="#fff" strokeWidth="1.2" />
        <rect x="432" y="212" width="96" height="136" rx="1"
              fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.7" />
        <g opacity="0.6">
          <line x1="450" y1="240" x2="510" y2="240" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="0.8" />
          <circle cx="466" cy="290" r="12" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M 446 320 Q 466 312 486 320 Q 506 328 514 320" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
        </g>
        <line x1="420" y1="200" x2="430" y2="200" stroke="var(--gold)" strokeWidth="1.4" />
        <line x1="420" y1="200" x2="420" y2="210" stroke="var(--gold)" strokeWidth="1.4" />
      </g>

      <g className="scene-el scene-table" data-show={show.table ? 1 : 0}>
        <rect x="150" y="754" width="720" height="14" rx="1"
              fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.5" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

function Caption({ stage, idx }) {
  if (!stage) return null;
  return (
    <div className="kd-story-cap" key={idx}>
      <div className="kd-story-cap-num">{String(idx + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}</div>
      <h2 className="kd-story-cap-title">{stage.caption}</h2>
      <p className="kd-story-cap-sub">{stage.subtitle}</p>
      {stage.cta && (
        <div className="kd-story-cap-cta">
          <a href="#disena" className="kd-btn-gold">Diseñar mi hogar</a>
          <a href="#catalogo" className="kd-btn-line">Ver el catálogo</a>
        </div>
      )}
    </div>
  );
}

function LeftLabel({ stage, idx }) {
  return (
    <div className="kd-story-left" key={idx}>
      <div className="kd-story-left-num">{String(idx + 1).padStart(2, '0')}</div>
      <div className="kd-story-left-rule" />
      <div className="kd-story-left-label">{stage.label}</div>
      <div className="kd-story-left-meta">KASA DIAMANTE</div>
    </div>
  );
}

function StoryProductCard({ stageIdx, currentIdx }) {
  const stage = STAGES[stageIdx];
  if (!stage || !stage.productId) return null;

  const product = KD_PRODUCTS.find(p => p.id === stage.productId);
  if (!product) return null;

  const pos = PRODUCT_CARD_POSITIONS[stageIdx];
  if (!pos) return null;

  const visible = currentIdx >= stageIdx;
  const active  = currentIdx === stageIdx;

  const { side, ...cssPos } = pos;

  const classes = [
    'kd-story-mini-card',
    `kd-story-mini-card--${side}`,
    visible && 'kd-story-mini-card--visible',
    active  && 'kd-story-mini-card--active',
  ].filter(Boolean).join(' ');

  return (
    <a href="#catalogo" className={classes} style={cssPos}>
      <div className="kd-story-mini-topbar" />
      <div className="kd-story-mini-tag">
        <span className="kd-story-mini-dot" />
        <span>{stage.label}</span>
      </div>
      <div className="kd-story-mini-art">
        <IconView cat={product.cat} />
      </div>
      <div className="kd-story-mini-body">
        <div className="kd-story-mini-coll">{product.coll}</div>
        <div className="kd-story-mini-name">{product.name}</div>
        <div className="kd-story-mini-mat">{product.material}</div>
        <div className="kd-story-mini-foot">
          <span className="kd-story-mini-price">{fmtCOP(product.price)}</span>
          <span className="kd-story-mini-ver">Ver pieza →</span>
        </div>
      </div>
    </a>
  );
}

export function HomeStory() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const isMobile = useIsMobile();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Desktop: scroll-based progress
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const scrollStageIdx = Math.min(
    STAGES.length - 1,
    Math.floor(progress * STAGES.length * 0.999)
  );

  const stageIdx = isMobile ? mobileIdx : scrollStageIdx;

  const show = {
    room:    stageIdx >= 0,
    table:   stageIdx >= 1,
    vase:    stageIdx >= 2,
    flowers: stageIdx >= 3,
    chair:   stageIdx >= 4,
    lamp:    stageIdx >= 5,
    frame:   stageIdx >= 6,
  };

  const goNext = () => setMobileIdx(i => Math.min(STAGES.length - 1, i + 1));
  const goPrev = () => setMobileIdx(i => Math.max(0, i - 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 44 && dy < 60) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  if (isMobile) {
    return (
      <section className="kd-story-section kd-story-section--mobile">
        <div className="kd-story-stage kd-story-stage--mobile"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="kd-story-scene-wrap">
            <Scene show={show} />
          </div>

          <Caption stage={STAGES[stageIdx]} idx={stageIdx} />

          <nav className="kd-story-mobile-nav" aria-label="Historia">
            <button
              className="kd-story-mobile-btn"
              onClick={goPrev}
              disabled={mobileIdx === 0}
              aria-label="Anterior"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M17 6H1M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="kd-story-mobile-dots">
              {STAGES.map((_, i) => (
                <button
                  key={i}
                  className={'kd-story-dot ' + (
                    i === mobileIdx ? 'kd-story-dot--active' :
                    i < mobileIdx  ? 'kd-story-dot--done'   : ''
                  )}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Ir a escena ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="kd-story-mobile-btn"
              onClick={goNext}
              disabled={mobileIdx === STAGES.length - 1}
              aria-label="Siguiente"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M1 6H17M12 1L17 6L12 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </nav>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="kd-story-section"
      style={{ height: (STAGES.length * 90) + 'vh' }}
    >
      <div className="kd-story-stage">
        <LeftLabel stage={STAGES[stageIdx]} idx={stageIdx} />
        <div className="kd-story-scene-wrap">
          <Scene show={show} />
        </div>
        {Object.keys(PRODUCT_CARD_POSITIONS).map(idx => (
          <StoryProductCard
            key={idx}
            stageIdx={Number(idx)}
            currentIdx={stageIdx}
          />
        ))}
        <Caption stage={STAGES[stageIdx]} idx={stageIdx} />
        <div className="kd-story-dots" aria-hidden="true">
          {STAGES.map((_, i) => (
            <span
              key={i}
              className={'kd-story-dot ' + (
                i === stageIdx ? 'kd-story-dot--active' :
                i < stageIdx  ? 'kd-story-dot--done'   : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
