import React from 'react';
import { ProjectItem } from './projectsData';

interface ArchitecturalPlateProps {
  plateType: ProjectItem['plateType'];
  mode?: 'perspective' | 'blueprint';
  sunAngle?: number;
  className?: string;
}

export const ArchitecturalPlate: React.FC<ArchitecturalPlateProps> = ({
  plateType,
  mode = 'perspective',
  sunAngle = 55,
  className = '',
}) => {
  const shadowOffset = (sunAngle - 50) * 1.4;
  const lightIntensity = 0.72 + (sunAngle / 100) * 0.25;

  if (mode === 'blueprint') {
    return (
      <div className={`relative w-full h-full bg-[#080809] overflow-hidden select-none ${className}`}>
        <svg
          viewBox="0 0 800 520"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={`Architectural orthographic plan for ${plateType}`}
        >
          <defs>
            <pattern id={`grid-${plateType}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272A" strokeWidth="0.6" />
              <path d="M 20 0 L 20 40 M 0 20 L 40 20" fill="none" stroke="#18181B" strokeWidth="0.4" />
            </pattern>
          </defs>

          <rect width="800" height="520" fill="#080809" />
          <rect width="800" height="520" fill={`url(#grid-${plateType})`} />

          <line x1="60" y1="60" x2="740" y2="60" stroke="#71717A" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="60" y1="460" x2="740" y2="460" stroke="#71717A" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="60" y1="60" x2="60" y2="460" stroke="#71717A" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="740" y1="60" x2="740" y2="460" stroke="#71717A" strokeWidth="0.75" strokeDasharray="4 4" />

          <rect x="110" y="100" width="580" height="320" fill="none" stroke="#E4E4E7" strokeWidth="2" />
          <rect x="110" y="100" width="220" height="190" fill="#18181B" fillOpacity="0.6" stroke="#A1A1AA" strokeWidth="1" />
          <rect x="330" y="100" width="360" height="320" fill="none" stroke="#A1A1AA" strokeWidth="1" />

          <rect x="106" y="96" width="12" height="210" fill="#F4F4F0" />
          <rect x="324" y="96" width="12" height="135" fill="#F4F4F0" />
          <rect x="510" y="275" width="175" height="12" fill="#F4F4F0" />

          <path d="M 330 231 A 58 58 0 0 1 388 289" fill="none" stroke="#71717A" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="330" y1="289" x2="388" y2="289" stroke="#E4E4E7" strokeWidth="1.2" />

          {Array.from({ length: 11 }).map((_, idx) => (
            <line
              key={idx}
              x1={140 + idx * 14}
              y1="315"
              x2={140 + idx * 14}
              y2="395"
              stroke="#A1A1AA"
              strokeWidth="1"
            />
          ))}
          <rect x="140" y="315" width="140" height="80" fill="none" stroke="#E4E4E7" strokeWidth="1.2" />
          <line x1="140" y1="355" x2="280" y2="355" stroke="#F4F4F0" strokeWidth="1" />

          <circle cx="520" cy="195" r="54" fill="none" stroke="#71717A" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="520" cy="195" r="28" fill="none" stroke="#A1A1AA" strokeWidth="1" />
          <line x1="450" y1="195" x2="590" y2="195" stroke="#52525B" strokeWidth="0.7" />
          <line x1="520" y1="125" x2="520" y2="265" stroke="#52525B" strokeWidth="0.7" />

          <text x="115" y="84" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
            SUMBU A-01 // 14.200 mm
          </text>
          <text x="530" y="84" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
            ELEVASI +5,40 m
          </text>
          <text x="115" y="442" fill="#71717A" fontSize="10" fontFamily="JetBrains Mono, monospace">
            SKALA 1:50 · POTONGAN ORTOGONAL &amp; DENAH REFLEKSI
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-[#09090B] overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 800 540"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Monochrome architectural photography plate: ${plateType}`}
      >
        <defs>
          <filter id={`grain-${plateType}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise" />
            <feComponentTransfer in="monoNoise" result="subtleNoise">
              <feFuncA type="linear" slope="0.065" />
            </feComponentTransfer>
            <feBlend mode="overlay" in="subtleNoise" in2="SourceGraphic" />
          </filter>

          <linearGradient id={`wall-left-${plateType}`} x1="0%" y1="0%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#0C0C0E" />
            <stop offset="65%" stopColor="#1C1C1F" />
            <stop offset="100%" stopColor="#2A2A2E" />
          </linearGradient>

          <linearGradient id={`wall-back-${plateType}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#323236" stopOpacity={lightIntensity} />
            <stop offset="55%" stopColor="#1D1D20" />
            <stop offset="100%" stopColor="#0E0E10" />
          </linearGradient>

          <linearGradient id={`floor-${plateType}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#252528" />
            <stop offset="45%" stopColor="#161618" />
            <stop offset="100%" stopColor="#070708" />
          </linearGradient>

          <linearGradient id={`sunbeam-${plateType}`} x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.34 * lightIntensity} />
            <stop offset="55%" stopColor="#E4E4E0" stopOpacity={0.12 * lightIntensity} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`sky-glow-${plateType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAFAFA" stopOpacity={0.95 * lightIntensity} />
            <stop offset="70%" stopColor="#D4D4D8" stopOpacity={0.75 * lightIntensity} />
            <stop offset="100%" stopColor="#71717A" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <g filter={`url(#grain-${plateType})`}>
          <rect width="800" height="540" fill="#09090B" />

          {plateType === 'brutalist_living' && (
            <>
              <polygon points="0,0 800,0 640,120 170,120" fill="#121214" />
              <polygon points="0,0 170,120 170,390 0,540" fill={`url(#wall-left-${plateType})`} />
              <polygon points="170,120 640,120 640,390 170,390" fill={`url(#wall-back-${plateType})`} />
              <polygon points="640,120 800,0 800,540 640,390" fill="#18181B" />

              <polygon points="665,105 775,28 775,455 665,380" fill={`url(#sky-glow-${plateType})`} />
              <line x1="715" y1="68" x2="715" y2="418" stroke="#09090B" strokeWidth="4" />
              <line x1="665" y1="245" x2="775" y2="195" stroke="#09090B" strokeWidth="3.5" />

              <polygon points="170,390 640,390 800,540 0,540" fill={`url(#floor-${plateType})`} />

              <polygon
                points={`665,380 775,455 ${430 + shadowOffset},540 ${220 + shadowOffset},540`}
                fill="#F4F4F0"
                fillOpacity={0.18 * lightIntensity}
              />
              <polygon
                points={`665,105 775,28 ${430 + shadowOffset},540 ${220 + shadowOffset},540`}
                fill={`url(#sunbeam-${plateType})`}
              />

              <line x1="290" y1="120" x2="290" y2="390" stroke="#09090B" strokeWidth="1" strokeOpacity="0.45" />
              <line x1="410" y1="120" x2="410" y2="390" stroke="#09090B" strokeWidth="1" strokeOpacity="0.45" />
              <line x1="530" y1="120" x2="530" y2="390" stroke="#09090B" strokeWidth="1" strokeOpacity="0.45" />
              <line x1="170" y1="255" x2="640" y2="255" stroke="#09090B" strokeWidth="1" strokeOpacity="0.4" />

              <polygon points="215,355 475,355 495,412 195,412" fill="#D4D4CE" />
              <polygon points="225,322 465,322 475,355 215,355" fill="#A1A19A" />
              <polygon points="195,412 495,412 495,428 195,428" fill="#09090B" />

              <polygon
                points={`${275 + shadowOffset * 0.2},448 535,448 555,495 ${240 + shadowOffset * 0.3},495`}
                fill="#050505"
                fillOpacity="0.7"
              />
              <polygon points="290,432 525,432 545,472 270,472" fill="#E4E4DE" />
              <polygon points="270,472 545,472 545,492 270,492" fill="#52524E" />
            </>
          )}

          {plateType === 'zurich_penthouse' && (
            <>
              <rect x="0" y="0" width="800" height="370" fill="#161618" />
              <rect x="260" y="30" width="490" height="330" fill={`url(#sky-glow-${plateType})`} />
              <polygon
                points="260,275 350,210 445,248 560,175 675,225 750,190 750,360 260,360"
                fill="#71717A"
                fillOpacity="0.45"
              />
              <polygon
                points="260,305 390,255 510,285 640,225 750,265 750,360 260,360"
                fill="#3F3F46"
                fillOpacity="0.65"
              />
              <line x1="420" y1="30" x2="420" y2="360" stroke="#09090B" strokeWidth="6" />
              <line x1="585" y1="30" x2="585" y2="360" stroke="#09090B" strokeWidth="6" />
              <line x1="260" y1="215" x2="750" y2="215" stroke="#09090B" strokeWidth="5" />

              <rect x="55" y="0" width="165" height="395" fill="#27272A" />
              <rect x="85" y="285" width="105" height="85" fill="#070708" />

              <polygon points="0,360 800,360 800,540 0,540" fill={`url(#floor-${plateType})`} />

              <polygon
                points={`260,360 750,360 ${690 + shadowOffset},540 ${120 + shadowOffset},540`}
                fill="#F4F4F0"
                fillOpacity={0.22 * lightIntensity}
              />
              <line
                x1="420"
                y1="360"
                x2={310 + shadowOffset}
                y2="540"
                stroke="#09090B"
                strokeWidth="14"
                strokeOpacity="0.65"
              />
              <line
                x1="585"
                y1="360"
                x2={505 + shadowOffset}
                y2="540"
                stroke="#09090B"
                strokeWidth="14"
                strokeOpacity="0.65"
              />

              <polygon points="365,390 615,390 640,445 340,445" fill="#18181B" stroke="#52525B" strokeWidth="1" />
              <polygon points="340,445 640,445 640,468 340,468" fill="#09090B" />
            </>
          )}

          {plateType === 'kyoto_sanctuary' && (
            <>
              <rect width="800" height="540" fill="#0B0B0C" />
              {Array.from({ length: 18 }).map((_, i) => (
                <line
                  key={i}
                  x1={45 * i}
                  y1="0"
                  x2={45 * i}
                  y2="375"
                  stroke="#18181B"
                  strokeWidth="1.5"
                />
              ))}

              <rect x="130" y="210" width="540" height="145" fill={`url(#sky-glow-${plateType})`} />
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={i}
                  x1={130 + i * 90}
                  y1="210"
                  x2={130 + i * 90}
                  y2="355"
                  stroke="#121214"
                  strokeWidth="3"
                />
              ))}
              <line x1="130" y1="282" x2="670" y2="282" stroke="#121214" strokeWidth="2.5" />

              <polygon points="0,355 800,355 800,540 0,540" fill="#121215" />
              <polygon
                points={`130,355 670,355 ${720 + shadowOffset * 0.6},540 ${80 + shadowOffset * 0.6},540`}
                fill="#E4E4E7"
                fillOpacity={0.16 * lightIntensity}
              />

              <polygon points="275,380 525,380 545,420 255,420" fill="#3F3F46" />
              <ellipse cx="400" cy="400" rx="105" ry="11" fill="#E4E4E7" fillOpacity={0.35 * lightIntensity} />
              <polygon points="255,420 545,420 535,485 265,485" fill="#18181B" />
            </>
          )}

          {plateType === 'milan_spiral' && (
            <>
              <rect width="800" height="540" fill="#141416" />
              <polygon
                points={`320,0 490,0 ${680 + shadowOffset},540 ${120 + shadowOffset},540`}
                fill={`url(#sunbeam-${plateType})`}
              />
              <path
                d="M 140,0 C 160,210 620,170 640,390 L 440,390 C 420,240 80,260 60,0 Z"
                fill="#E4E4E0"
                fillOpacity={0.88 * lightIntensity}
              />
              <path
                d="M 140,0 C 160,210 620,170 640,390 L 580,435 C 550,245 110,275 80,35 Z"
                fill="#27272A"
              />
              <rect x="165" y="340" width="95" height="135" fill="#D4D4CE" />
              <rect x="260" y="340" width="28" height="135" fill="#18181B" />
              <rect x="520" y="375" width="120" height="100" fill="#3F3F46" />
            </>
          )}

          {plateType === 'antwerp_monolith' && (
            <>
              <rect width="800" height="380" fill="#131315" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1={100 * i}
                  y1="30"
                  x2={100 * i}
                  y2="380"
                  stroke="#070708"
                  strokeWidth="2"
                />
              ))}
              <rect x="100" y="185" width="600" height="6" fill="#FAFAFA" fillOpacity={0.85 * lightIntensity} />
              <rect x="100" y="191" width="600" height="65" fill="#27272A" />

              <rect x="0" y="380" width="800" height="160" fill="#1C1C1F" />

              <polygon points="115,325 685,325 715,360 85,360" fill="#27272A" />
              <polygon points="85,360 715,360 715,470 85,470" fill="#0B0B0D" />
              <path
                d="M 130,368 Q 260,395 340,435 T 590,410 L 680,445"
                fill="none"
                stroke="#D4D4D8"
                strokeWidth="1.2"
                strokeOpacity="0.45"
              />
              <path
                d="M 290,362 Q 380,410 470,390 T 650,462"
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </>
          )}

          {plateType === 'oslo_library' && (
            <>
              <rect width="800" height="390" fill="#121214" />
              {Array.from({ length: 6 }).map((_, row) => (
                <rect
                  key={row}
                  x="70"
                  y={35 + row * 55}
                  width="440"
                  height="42"
                  fill="#09090B"
                  stroke="#27272A"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 28 }).map((_, b) => (
                <rect
                  key={b}
                  x={82 + b * 14}
                  y={42 + (b % 5) * 55}
                  width="9"
                  height="33"
                  fill={b % 3 === 0 ? '#D4D4CE' : '#52525B'}
                  fillOpacity="0.75"
                />
              ))}

              <rect x="560" y="35" width="180" height="355" fill={`url(#sky-glow-${plateType})`} />

              <rect x="45" y="340" width="495" height="28" fill="#52525B" />
              <polygon
                points={`560,390 740,390 ${640 + shadowOffset},540 ${280 + shadowOffset},540`}
                fill="#F4F4F0"
                fillOpacity={0.18 * lightIntensity}
              />
            </>
          )}

          {plateType === 'berlin_gallery' && (
            <>
              <rect width="800" height="540" fill="#0D0D0F" />
              {Array.from({ length: 7 }).map((_, i) => (
                <polygon
                  key={i}
                  points={`${60 + i * 100},0 ${130 + i * 100},0 ${160 + i * 85},115 ${110 + i * 85},115`}
                  fill="#232327"
                />
              ))}
              <rect x="110" y="265" width="580" height="3" fill="#FAFAFA" fillOpacity={0.9 * lightIntensity} />
              <polygon
                points="110,268 690,268 780,540 20,540"
                fill={`url(#sunbeam-${plateType})`}
              />
              <rect x="195" y="180" width="78" height="215" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
              <circle cx="234" cy="235" r="24" fill="#09090B" stroke="#71717A" strokeWidth="1" />
              <rect x="527" y="180" width="78" height="215" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
              <circle cx="566" cy="235" r="24" fill="#09090B" stroke="#71717A" strokeWidth="1" />

              <rect x="290" y="410" width="220" height="24" fill="#D4D4CE" />
              <rect x="315" y="434" width="170" height="28" fill="#09090B" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
