import React from 'react';

interface DeliveryRiderIconProps {
  size?: number;
  riderColor?: string;
  scooterColor?: string;
  speedLineColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Custom Chaiwale Delivery Rider on Scooter Icon
 * Accurately adapted from the brand delivery illustration:
 * - Delivery Rider (helmet, leaning torso, arm on handlebar, bent leg on footrest)
 * - Scooter (parcel cargo box, chassis, seat, steering column, front & rear wheels with mudguards)
 * - Dynamic speed capsules behind the rear wheel
 */
export function DeliveryRiderIcon({
  size = 32,
  riderColor = '#F59E0B',      // Warm Chaiwale Amber / Gold
  scooterColor = '#FFFFFF',    // Crisp White Scooter & Cargo Box
  speedLineColor = '#F59E0B',  // Speed Streaks
  style
}: DeliveryRiderIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 350 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      {/* ── 1. DYNAMIC SPEED STREAKS ── */}
      <g stroke={speedLineColor} strokeWidth="11" strokeLinecap="round">
        {/* Top streak */}
        <line x1="72" y1="196" x2="112" y2="196" />
        {/* Middle streak with dot */}
        <circle cx="56" cy="218" r="5.5" fill={speedLineColor} stroke="none" />
        <line x1="72" y1="218" x2="112" y2="218" />
        {/* Bottom streak with dot */}
        <circle cx="50" cy="238" r="5.5" fill={speedLineColor} stroke="none" />
        <line x1="66" y1="238" x2="104" y2="238" />
      </g>

      {/* ── 2. SCOOTER CHASSIS, CARGO BOX & WHEELS ── */}
      <g stroke={scooterColor} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Delivery Parcel Box on Rear Rack */}
        <rect x="103" y="142" width="54" height="48" rx="6" />

        {/* Rear Wheel with Mudguard */}
        <circle cx="144" cy="242" r="23" />
        <path d="M120 238 Q120 216 144 216 Q168 216 168 238" />

        {/* Chassis, Footboard & Under-Seat Frame */}
        <path d="M116 190 L188 190 Q202 190 196 216 L192 232 Q190 240 202 240 L238 240" />

        {/* Steering Column & Handlebar / Headlamp */}
        <path d="M238 240 L254 165 L242 165" />
        <path d="M254 165 L260 144 L248 142" />

        {/* Front Wheel with Mudguard */}
        <circle cx="270" cy="242" r="23" />
        <path d="M246 226 Q270 214 290 230" />
      </g>

      {/* ── 3. DELIVERY RIDER ── */}
      <g stroke={riderColor} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Helmet / Head with Eye/Visor Slit */}
        <circle cx="196" cy="100" r="18" />
        <path d="M204 90 Q218 96 214 108" />

        {/* Torso & Arm extending forward to Handlebar */}
        <path d="M188 122 L166 156 Q162 166 172 166 L198 166 L238 166" />

        {/* Rider Legs bent at knee down to Footboard */}
        <path d="M168 190 L218 190 Q228 190 224 212 L220 234" />
      </g>
    </svg>
  );
}
export default DeliveryRiderIcon;
