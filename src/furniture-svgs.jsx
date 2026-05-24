import React from 'react'

// Furniture SVGs — REALISTIC top-down architectural rendering
// Layered fills + strokes for depth; reads at any aspect ratio.
// All colors via var(--gold) so they respond to the gold-tone tweak.

const GOLD = 'var(--gold)';

const fillS = 'var(--furn-fill-soft)';
const fillM = 'var(--furn-fill-med)';
const fillH = 'var(--furn-fill-strong)';
const stkS  = 'var(--furn-stroke-soft)';

// ═══════════════════════════════════════════════════════════════════
//  PLAN VIEW — top-down for the floor plan
// ═══════════════════════════════════════════════════════════════════

const PlanSofa = () => (
  <svg viewBox="0 0 300 100" preserveAspectRatio="none">
    <rect x="6" y="24" width="288" height="74" rx="7" fill={fillS} />
    <rect x="4" y="22" width="292" height="74" rx="7" fill={fillM} stroke={GOLD} strokeWidth="1.4" />
    <rect x="4" y="22" width="292" height="22" fill={fillH} stroke={GOLD} strokeWidth="1.2" />
    <rect x="4"   y="22" width="22" height="74" fill={fillH} stroke={GOLD} strokeWidth="1.2" />
    <rect x="274" y="22" width="22" height="74" fill={fillH} stroke={GOLD} strokeWidth="1.2" />
    <rect x="32"  y="48" width="76" height="44" rx="3" fill={fillS} stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.7" />
    <rect x="112" y="48" width="76" height="44" rx="3" fill={fillS} stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.7" />
    <rect x="192" y="48" width="76" height="44" rx="3" fill={fillS} stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.7" />
    <line x1="40"  y1="58" x2="100" y2="58" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.5" />
    <line x1="120" y1="58" x2="180" y2="58" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.5" />
    <line x1="200" y1="58" x2="260" y2="58" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.5" />
    <rect x="36"  y="26" width="40" height="14" rx="3" fill={GOLD} fillOpacity="0.55" />
    <rect x="130" y="26" width="40" height="14" rx="3" fill={GOLD} fillOpacity="0.4" />
    <rect x="224" y="26" width="40" height="14" rx="3" fill={GOLD} fillOpacity="0.55" />
  </svg>
);

const PlanTable = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <ellipse cx="50" cy="52" rx="42" ry="32" fill={fillS} />
    <ellipse cx="50" cy="50" rx="42" ry="32" fill={fillM} stroke={GOLD} strokeWidth="1.3" />
    <path d="M 18 42 Q 32 38 44 46 Q 56 54 70 48 Q 80 44 84 50" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.7" />
    <path d="M 22 60 Q 34 56 48 62" fill="none" stroke={GOLD} strokeOpacity="0.25" strokeWidth="0.5" />
    <path d="M 56 64 Q 68 60 80 56" fill="none" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.5" />
    <ellipse cx="50" cy="50" rx="34" ry="24" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.6" />
    <rect x="42" y="42" width="8" height="14" rx="1" fill={fillH} stroke={GOLD} strokeWidth="0.5" />
    <circle cx="56" cy="50" r="6" fill={GOLD} fillOpacity="0.55" stroke={GOLD} strokeWidth="0.6" />
    <circle cx="56" cy="50" r="2.5" fill={GOLD} />
  </svg>
);

const PlanLamp = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <radialGradient id="lamp-pool">
        <stop offset="0%"   stopColor={GOLD} stopOpacity="0.45" />
        <stop offset="40%"  stopColor={GOLD} stopOpacity="0.18" />
        <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#lamp-pool)" />
    <circle cx="50" cy="50" r="28" fill={fillM} stroke={GOLD} strokeWidth="1.3" />
    <circle cx="50" cy="50" r="20" fill={fillH} stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.8" />
    <line x1="50" y1="10"  x2="50" y2="22"  stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.6" />
    <line x1="50" y1="78"  x2="50" y2="90"  stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.6" />
    <line x1="10" y1="50"  x2="22" y2="50"  stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.6" />
    <line x1="78" y1="50"  x2="90" y2="50"  stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.6" />
    <line x1="22" y1="22"  x2="30" y2="30"  stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.5" />
    <line x1="78" y1="78"  x2="70" y2="70"  stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.5" />
    <line x1="22" y1="78"  x2="30" y2="70"  stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.5" />
    <line x1="78" y1="22"  x2="70" y2="30"  stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="5" fill={GOLD} />
    <circle cx="50" cy="50" r="2" fill="#fff" fillOpacity="0.9" />
  </svg>
);

const PlanChair = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect x="12" y="14" width="76" height="80" rx="9" fill={fillS} />
    <rect x="10" y="12" width="80" height="80" rx="9" fill={fillM} stroke={GOLD} strokeWidth="1.3" />
    <rect x="10" y="12" width="80" height="22" fill={fillH} stroke={GOLD} strokeWidth="1.1" />
    <rect x="10" y="12" width="14" height="80" fill={fillH} stroke={GOLD} strokeWidth="1.1" />
    <rect x="76" y="12" width="14" height="80" fill={fillH} stroke={GOLD} strokeWidth="1.1" />
    <rect x="28" y="40" width="44" height="46" rx="3" fill={fillS} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.6" />
    <line x1="34" y1="56" x2="66" y2="56" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
    <rect x="34" y="16" width="32" height="14" rx="3" fill={GOLD} fillOpacity="0.5" />
  </svg>
);

const PlanDining = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect x="22" y="22" width="58" height="58" rx="2" fill={fillS} />
    <rect x="20" y="20" width="60" height="60" rx="2" fill={fillM} stroke={GOLD} strokeWidth="1.4" />
    <line x1="20" y1="32" x2="80" y2="32" stroke={GOLD} strokeOpacity="0.2" strokeWidth="0.4" />
    <line x1="20" y1="44" x2="80" y2="44" stroke={GOLD} strokeOpacity="0.15" strokeWidth="0.4" />
    <line x1="20" y1="56" x2="80" y2="56" stroke={GOLD} strokeOpacity="0.2" strokeWidth="0.4" />
    <line x1="20" y1="68" x2="80" y2="68" stroke={GOLD} strokeOpacity="0.15" strokeWidth="0.4" />
    <g fill={fillH} stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.85">
      <rect x="24" y="8"  width="13" height="9" rx="1.5" />
      <rect x="43" y="8"  width="13" height="9" rx="1.5" />
      <rect x="62" y="8"  width="13" height="9" rx="1.5" />
      <rect x="24" y="83" width="13" height="9" rx="1.5" />
      <rect x="43" y="83" width="13" height="9" rx="1.5" />
      <rect x="62" y="83" width="13" height="9" rx="1.5" />
      <rect x="6"  y="34" width="9" height="13" rx="1.5" />
      <rect x="6"  y="53" width="9" height="13" rx="1.5" />
      <rect x="85" y="34" width="9" height="13" rx="1.5" />
      <rect x="85" y="53" width="9" height="13" rx="1.5" />
    </g>
    <g fill={GOLD} fillOpacity="0.5">
      <rect x="26" y="9"  width="9" height="3" rx="0.6" />
      <rect x="45" y="9"  width="9" height="3" rx="0.6" />
      <rect x="64" y="9"  width="9" height="3" rx="0.6" />
      <rect x="26" y="88" width="9" height="3" rx="0.6" />
      <rect x="45" y="88" width="9" height="3" rx="0.6" />
      <rect x="64" y="88" width="9" height="3" rx="0.6" />
      <rect x="7"  y="36" width="3" height="9" rx="0.6" />
      <rect x="7"  y="55" width="3" height="9" rx="0.6" />
      <rect x="90" y="36" width="3" height="9" rx="0.6" />
      <rect x="90" y="55" width="3" height="9" rx="0.6" />
    </g>
    <g fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.5">
      <circle cx="30" cy="24" r="3.6" />
      <circle cx="49" cy="24" r="3.6" />
      <circle cx="68" cy="24" r="3.6" />
      <circle cx="30" cy="76" r="3.6" />
      <circle cx="49" cy="76" r="3.6" />
      <circle cx="68" cy="76" r="3.6" />
      <circle cx="22" cy="40" r="3.6" />
      <circle cx="22" cy="59" r="3.6" />
      <circle cx="78" cy="40" r="3.6" />
      <circle cx="78" cy="59" r="3.6" />
    </g>
    <g fill={GOLD}>
      <rect x="48" y="46" width="4" height="8" rx="0.6" />
      <circle cx="50" cy="44" r="2" />
      <circle cx="44" cy="46" r="1.4" />
      <circle cx="56" cy="46" r="1.4" />
      <circle cx="42" cy="50" r="1" fillOpacity="0.7" />
      <circle cx="58" cy="50" r="1" fillOpacity="0.7" />
      <circle cx="50" cy="42" r="1" fillOpacity="0.7" />
    </g>
  </svg>
);

const PlanBed = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect x="10" y="10" width="80" height="84" rx="3" fill={fillS} />
    <rect x="8" y="8" width="84" height="84" rx="3" fill={fillM} stroke={GOLD} strokeWidth="1.3" />
    <rect x="8" y="8" width="84" height="18" fill={fillH} stroke={GOLD} strokeWidth="1.1" />
    <g fill={GOLD} fillOpacity="0.7">
      <circle cx="22" cy="17" r="0.9" />
      <circle cx="35" cy="17" r="0.9" />
      <circle cx="50" cy="17" r="0.9" />
      <circle cx="65" cy="17" r="0.9" />
      <circle cx="78" cy="17" r="0.9" />
    </g>
    <rect x="14" y="14" width="34" height="14" rx="3" fill={GOLD} fillOpacity="0.55" stroke={GOLD} strokeWidth="0.7" />
    <rect x="52" y="14" width="34" height="14" rx="3" fill={GOLD} fillOpacity="0.55" stroke={GOLD} strokeWidth="0.7" />
    <rect x="38" y="28" width="24" height="8" rx="3" fill={GOLD} fillOpacity="0.78" />
    <line x1="8" y1="40" x2="92" y2="40" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.6" />
    <rect x="8" y="72" width="84" height="14" fill={fillH} stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.75" />
    <line x1="8" y1="78" x2="92" y2="78" stroke={GOLD} strokeOpacity="0.4" strokeWidth="0.4" />
    <line x1="20" y1="72" x2="20" y2="86" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
    <line x1="40" y1="72" x2="40" y2="86" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
    <line x1="60" y1="72" x2="60" y2="86" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
    <line x1="80" y1="72" x2="80" y2="86" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4" />
  </svg>
);

const PlanMirror = () => (
  <svg viewBox="0 0 40 100" preserveAspectRatio="none">
    <path d="M 4 12 Q 4 2 20 2 Q 36 2 36 12 L 36 96 L 4 96 Z" fill={fillS} />
    <path d="M 2 10 Q 2 0 20 0 Q 38 0 38 10 L 38 96 L 2 96 Z" fill={fillH} stroke={GOLD} strokeWidth="1.3" />
    <path d="M 6 12 Q 6 4 20 4 Q 34 4 34 12 L 34 92 L 6 92 Z" fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.7" />
    <path d="M 10 18 Q 10 8 20 8 L 20 88 L 10 88 Z" fill={GOLD} fillOpacity="0.08" />
    <circle cx="20" cy="6" r="2" fill={GOLD} />
  </svg>
);

const PlanDeco = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect x="14" y="14" width="72" height="72" rx="3" fill={fillS} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
    <rect x="16" y="16" width="68" height="68" rx="2" fill={fillM} stroke={GOLD} strokeWidth="1" />
    <circle cx="50" cy="50" r="22" fill={fillH} stroke={GOLD} strokeWidth="1.2" />
    <circle cx="50" cy="50" r="15" fill={GOLD} fillOpacity="0.4" stroke={GOLD} strokeWidth="0.6" />
    <circle cx="50" cy="50" r="8" fill={GOLD} fillOpacity="0.6" />
    <circle cx="50" cy="50" r="3" fill={GOLD} />
    <g stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.4">
      <line x1="50" y1="28" x2="50" y2="36" />
      <line x1="50" y1="64" x2="50" y2="72" />
      <line x1="28" y1="50" x2="36" y2="50" />
      <line x1="64" y1="50" x2="72" y2="50" />
    </g>
  </svg>
);

const PlanRug = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <g stroke={stkS} strokeWidth="0.4">
      <line x1="6"  y1="0" x2="6"  y2="3" /><line x1="14" y1="0" x2="14" y2="3" />
      <line x1="22" y1="0" x2="22" y2="3" /><line x1="30" y1="0" x2="30" y2="3" />
      <line x1="38" y1="0" x2="38" y2="3" /><line x1="46" y1="0" x2="46" y2="3" />
      <line x1="54" y1="0" x2="54" y2="3" /><line x1="62" y1="0" x2="62" y2="3" />
      <line x1="70" y1="0" x2="70" y2="3" /><line x1="78" y1="0" x2="78" y2="3" />
      <line x1="86" y1="0" x2="86" y2="3" /><line x1="94" y1="0" x2="94" y2="3" />
      <line x1="6"  y1="100" x2="6"  y2="97" /><line x1="14" y1="100" x2="14" y2="97" />
      <line x1="22" y1="100" x2="22" y2="97" /><line x1="30" y1="100" x2="30" y2="97" />
      <line x1="38" y1="100" x2="38" y2="97" /><line x1="46" y1="100" x2="46" y2="97" />
      <line x1="54" y1="100" x2="54" y2="97" /><line x1="62" y1="100" x2="62" y2="97" />
      <line x1="70" y1="100" x2="70" y2="97" /><line x1="78" y1="100" x2="78" y2="97" />
      <line x1="86" y1="100" x2="86" y2="97" /><line x1="94" y1="100" x2="94" y2="97" />
    </g>
    <rect x="2" y="4" width="96" height="92" rx="0.5" fill={fillS} stroke={stkS} strokeWidth="0.8" />
    <rect x="7" y="9" width="86" height="82" fill="none" stroke={stkS} strokeWidth="0.7" />
    <rect x="13" y="15" width="74" height="70" fill="none" stroke={stkS} strokeWidth="0.4" strokeDasharray="2 2.5" />
    <rect x="22" y="24" width="56" height="52" fill="none" stroke={stkS} strokeWidth="0.4" strokeOpacity="0.7" />
    <g stroke={GOLD} strokeOpacity="0.45" strokeWidth="0.6" fill="none">
      <path d="M 50 36 L 64 50 L 50 64 L 36 50 Z" />
      <path d="M 50 42 L 58 50 L 50 58 L 42 50 Z" />
      <circle cx="50" cy="50" r="3" fill={GOLD} fillOpacity="0.4" />
    </g>
    <g stroke={stkS} strokeWidth="0.35" fill="none">
      <path d="M 16 18 L 22 18 L 22 24" /><path d="M 78 18 L 84 18 L 84 24" />
      <path d="M 16 82 L 22 82 L 22 76" /><path d="M 78 82 L 84 82 L 84 76" />
    </g>
  </svg>
);

export function PlanIcon({ cat }) {
  switch (cat) {
    case 'sofas':      return <PlanSofa />;
    case 'mesas':      return <PlanTable />;
    case 'lamparas':   return <PlanLamp />;
    case 'sillas':     return <PlanChair />;
    case 'comedores':  return <PlanDining />;
    case 'camas':      return <PlanBed />;
    case 'espejos':    return <PlanMirror />;
    case 'decoracion': return <PlanDeco />;
    case 'alfombras':  return <PlanRug />;
    default:           return null;
  }
}

// ═══════════════════════════════════════════════════════════════════
//  ICON VIEW — elevation, for catalog cards (200×200)
// ═══════════════════════════════════════════════════════════════════

const G = ({ children, sw = 1.4 }) => (
  <g stroke={GOLD} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </g>
);

const IconSofa = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 24 130 L 24 96 Q 24 80 40 80 L 160 80 Q 176 80 176 96 L 176 130" />
      <rect x="36"  y="96" width="36" height="34" rx="3" />
      <rect x="82"  y="96" width="36" height="34" rx="3" />
      <rect x="128" y="96" width="36" height="34" rx="3" />
      <line x1="24" y1="130" x2="176" y2="130" />
      <line x1="36" y1="130" x2="36" y2="148" />
      <line x1="164" y1="130" x2="164" y2="148" />
    </G>
    <g fill={GOLD} fillOpacity="0.18">
      <rect x="40"  y="58" width="28" height="22" rx="3" />
      <rect x="86"  y="58" width="28" height="22" rx="3" />
      <rect x="132" y="58" width="28" height="22" rx="3" />
    </g>
  </svg>
);

const IconTable = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <ellipse cx="100" cy="92" rx="64" ry="14" />
      <path d="M 56 96 Q 70 120 70 150 L 70 158" />
      <path d="M 144 96 Q 130 120 130 150 L 130 158" />
      <line x1="60" y1="158" x2="140" y2="158" />
    </G>
    <ellipse cx="100" cy="86" rx="60" ry="10" fill={GOLD} fillOpacity="0.12" />
  </svg>
);

const IconLamp = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 70 70 L 130 70 L 116 110 L 84 110 Z" />
      <line x1="100" y1="110" x2="100" y2="160" />
      <ellipse cx="100" cy="164" rx="22" ry="4" />
      <line x1="70" y1="70" x2="130" y2="70" strokeWidth="2" />
    </G>
    <path d="M 73 73 L 127 73 L 114 107 L 86 107 Z" fill={GOLD} fillOpacity="0.18" />
    <circle cx="100" cy="55" r="3" fill={GOLD} />
  </svg>
);

const IconChair = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 60 60 Q 60 40 80 40 L 120 40 Q 140 40 140 60 L 140 110" />
      <line x1="60" y1="110" x2="140" y2="110" />
      <line x1="64" y1="110" x2="60" y2="170" />
      <line x1="136" y1="110" x2="140" y2="170" />
    </G>
    <path d="M 64 60 Q 64 44 80 44 L 120 44 Q 136 44 136 60 L 136 108 L 64 108 Z" fill={GOLD} fillOpacity="0.15" />
    <rect x="74" y="86" width="52" height="20" rx="3" fill={GOLD} fillOpacity="0.22" />
  </svg>
);

const IconDining = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <ellipse cx="100" cy="86" rx="80" ry="12" />
      <path d="M 32 90 L 28 156" />
      <path d="M 168 90 L 172 156" />
      <line x1="28" y1="156" x2="172" y2="156" />
    </G>
    <ellipse cx="100" cy="84" rx="76" ry="9" fill={GOLD} fillOpacity="0.14" />
    <g fill={GOLD} fillOpacity="0.5">
      <circle cx="70"  cy="76" r="3" />
      <circle cx="100" cy="74" r="3" />
      <circle cx="130" cy="76" r="3" />
    </g>
  </svg>
);

const IconBed = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 26 80 L 26 130 L 174 130 L 174 80" />
      <path d="M 26 80 Q 26 50 50 50 L 150 50 Q 174 50 174 80" />
      <line x1="26" y1="130" x2="26" y2="160" />
      <line x1="174" y1="130" x2="174" y2="160" />
    </G>
    <path d="M 30 80 Q 30 54 50 54 L 150 54 Q 170 54 170 80 L 170 88 L 30 88 Z" fill={GOLD} fillOpacity="0.16" />
    <rect x="40"  y="100" width="50" height="22" rx="3" fill={GOLD} fillOpacity="0.32" />
    <rect x="110" y="100" width="50" height="22" rx="3" fill={GOLD} fillOpacity="0.32" />
    <g fill={GOLD} fillOpacity="0.7">
      <circle cx="60"  cy="70" r="1.6" />
      <circle cx="85"  cy="70" r="1.6" />
      <circle cx="115" cy="70" r="1.6" />
      <circle cx="140" cy="70" r="1.6" />
    </g>
  </svg>
);

const IconMirror = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 70 36 Q 70 20 100 20 Q 130 20 130 36 L 130 170 L 70 170 Z" />
    </G>
    <path d="M 76 40 Q 76 26 100 26 Q 124 26 124 40 L 124 164 L 76 164 Z" fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
    <circle cx="100" cy="14" r="3" fill={GOLD} />
  </svg>
);

const IconDeco = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <path d="M 76 80 Q 60 100 70 130 Q 80 160 100 160 Q 120 160 130 130 Q 140 100 124 80 Z" />
      <path d="M 80 70 L 120 70 L 120 80 L 80 80 Z" />
    </G>
    <path d="M 78 82 Q 64 100 72 128 Q 80 156 100 156 Q 120 156 128 128 Q 136 100 122 82 Z" fill={GOLD} fillOpacity="0.16" />
    <ellipse cx="100" cy="80" rx="22" ry="3" fill={GOLD} fillOpacity="0.5" />
  </svg>
);

const IconRug = () => (
  <svg viewBox="0 0 200 200">
    <G>
      <rect x="20" y="60" width="160" height="100" rx="2" />
    </G>
    <rect x="24" y="64" width="152" height="92" fill={GOLD} fillOpacity="0.12" />
    <rect x="36" y="76" width="128" height="68" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
    <g stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" fill="none">
      <path d="M 100 88 L 116 110 L 100 132 L 84 110 Z" />
      <circle cx="100" cy="110" r="4" fill={GOLD} fillOpacity="0.5" />
    </g>
    <g stroke={GOLD} strokeWidth="0.6">
      {[30,50,70,90,110,130,150,170].map(x => <line key={x} x1={x} y1="160" x2={x} y2="164" />)}
      {[30,50,70,90,110,130,150,170].map(x => <line key={'t'+x} x1={x} y1="60" x2={x} y2="56" />)}
    </g>
  </svg>
);

export function IconView({ cat }) {
  switch (cat) {
    case 'sofas':      return <IconSofa />;
    case 'mesas':      return <IconTable />;
    case 'lamparas':   return <IconLamp />;
    case 'sillas':     return <IconChair />;
    case 'comedores':  return <IconDining />;
    case 'camas':      return <IconBed />;
    case 'espejos':    return <IconMirror />;
    case 'decoracion': return <IconDeco />;
    case 'alfombras':  return <IconRug />;
    default:           return null;
  }
}

export function TinyIcon({ cat, size = 20 }) {
  return (
    <span style={{ display: 'inline-block', width: size, height: size }}>
      <IconView cat={cat} />
    </span>
  );
}
