import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ─── scan card data ───────────────────────────────────────────────────────────
const scanClasses = [
  { label: 'Glioma',     accent: '#E71E22', image: '/Te-gl_115.jpg'     },
  { label: 'Meningioma', accent: '#9eb8c4', image: '/Te-aug-me_11.jpg'  },
  { label: 'Pituitary',  accent: '#82b4ff', image: '/Te-pi_122.jpg'     },
  { label: 'No Tumour',  accent: '#4ade80', image: '/Te-no_102.jpg'     },
]

// Resting stack positions (bottom → top)
const stackRest = [
  { rotate: -4,   x: -7, y: 18 },
  { rotate: -1.5, x: -3, y: 10 },
  { rotate:  1.5, x:  2, y:  4 },
  { rotate:  0,   x:  0, y:  0 },
]

// ─── sub-components ──────────────────────────────────────────────────────────
function ScanCard({ scan }) {
  return (
    <div style={{
      width: 210, background: '#070c10',
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(232,242,246,0.08)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.75)',
    }}>
      <div style={{ height: 3, background: scan.accent }} />
      <div style={{ height: 192, background: '#05080b', position: 'relative', overflow: 'hidden' }}>
        <img
          src={scan.image}
          alt={`${scan.label} MRI scan`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
        />
        <span style={{
          position: 'absolute', top: 8, left: 10, fontSize: 9, fontFamily: 'monospace',
          color: 'rgba(232,242,246,0.65)', background: 'rgba(0,0,0,0.55)',
          padding: '2px 6px', borderRadius: 4,
        }}>
          T1w · axial
        </span>
      </div>
      <div style={{ padding: '9px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#070c10' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: scan.accent }}>{scan.label}</span>
        <span style={{ fontSize: 9, color: 'rgba(143,163,172,0.45)' }}>224 × 224 px</span>
      </div>
    </div>
  )
}

function CNNPanel() {
  return (
    <div style={{
      width: 210, background: '#070c10',
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(232,242,246,0.08)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.75)',
    }}>
      <div style={{ height: 3, background: 'linear-gradient(to right, rgba(232,242,246,0.15), rgba(232,242,246,0.45))' }} />
      <div style={{ padding: '14px 10px 8px', height: 216, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="190" height="188" viewBox="0 0 190 188">
          {/* Input block */}
          <rect x="2" y="24" width="24" height="120" rx="3" fill="rgba(41,55,63,0.85)" stroke="rgba(232,242,246,0.14)" strokeWidth="1"/>
          {[38,53,68,83,98,113,128].map(y => <line key={y} x1="2" y1={y} x2="26" y2={y} stroke="rgba(232,242,246,0.06)" strokeWidth="0.5"/>)}
          {[9,16,22].map(x => <line key={x} x1={x} y1="24" x2={x} y2="144" stroke="rgba(232,242,246,0.06)" strokeWidth="0.5"/>)}

          {/* Arrow */}
          <path d="M28 84 L36 84" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M33 80 L37 84 L33 88" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

          {/* Conv1 — stacked feature maps */}
          {[0,3,6,9].map((o, i) => (
            <rect key={i} x={40+o} y={30+o} width="20" height={104-o} rx="2"
              fill={`rgba(60,85,105,${0.75-i*0.12})`} stroke="rgba(232,242,246,0.11)" strokeWidth="0.8"/>
          ))}

          {/* Arrow */}
          <path d="M72 84 L80 84" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M77 80 L81 84 L77 88" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

          {/* Conv2 — more, narrower */}
          {[0,3,6,9,12,15].map((o, i) => (
            <rect key={i} x={83+o} y={36+o} width="14" height={84-o*0.8} rx="2"
              fill={`rgba(50,70,90,${0.65-i*0.07})`} stroke="rgba(232,242,246,0.09)" strokeWidth="0.8"/>
          ))}

          {/* Arrow */}
          <path d="M112 84 L120 84" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M117 80 L121 84 L117 88" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

          {/* FC layers */}
          <rect x="123" y="50" width="11" height="68" rx="2" fill="rgba(41,55,63,0.75)" stroke="rgba(232,242,246,0.12)" strokeWidth="1"/>
          <rect x="138" y="60" width="9" height="48" rx="2" fill="rgba(41,55,63,0.6)" stroke="rgba(232,242,246,0.1)" strokeWidth="1"/>

          {/* Arrow */}
          <path d="M149 84 L155 84" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M152 80 L156 84 L152 88" stroke="rgba(232,242,246,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

          {/* Output nodes */}
          {[
            { cy: 50,  color: '#E71E22', label: 'Glioma'  },
            { cy: 73,  color: '#9eb8c4', label: 'Mening.' },
            { cy: 96,  color: '#82b4ff', label: 'Pituit.' },
            { cy: 119, color: '#4ade80', label: 'No Tu.'  },
          ].map(({ cy, color, label }) => (
            <g key={label}>
              <circle cx="161" cy={cy} r="5.5" fill={color} opacity="0.82"/>
              <text x="170" y={cy+3.5} fontSize="8.5" fill="rgba(232,242,246,0.48)" fontFamily="ui-monospace,monospace">{label}</text>
            </g>
          ))}

          {/* Layer labels */}
          {[
            [14, 'Input'], [52, 'Conv1'], [95, 'Conv2'], [129, 'FC'], [161, 'Out'],
          ].map(([x, lbl]) => (
            <text key={lbl} x={x} y="174" fontSize="7" fill="rgba(232,242,246,0.22)" textAnchor="middle">{lbl}</text>
          ))}
        </svg>
      </div>
      <div style={{ padding: '6px 13px 10px', borderTop: '1px solid rgba(232,242,246,0.05)' }}>
        <span style={{ fontSize: 9, color: 'rgba(143,163,172,0.45)', fontFamily: 'monospace' }}>Conv → Pool → FC → Softmax</span>
      </div>
    </div>
  )
}

function GradCAMPanel() {
  return (
    <div style={{
      width: 210, background: '#070c10',
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(232,242,246,0.08)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.75)',
    }}>
      <div style={{ height: 3, background: 'linear-gradient(to right, #E71E22, rgba(255,160,50,0.8))' }} />

      {/* Brain + heatmap */}
      <div style={{ height: 175, background: '#04070a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          width: 130, height: 148,
          borderRadius: '50% 50% 46% 46% / 55% 55% 45% 45%',
          background: 'radial-gradient(ellipse 72% 68% at 48% 44%, #333 0%, #1c1c1c 55%, #0e0e0e 82%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: '18% 10%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', opacity: 0.09 }}>
            {[0,1,2,3,4,5].map(i => <div key={i} style={{ height: 1, background: '#E8F2F6' }} />)}
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 42% 38% at 56% 40%, rgba(231,30,34,0.82) 0%, rgba(255,120,30,0.5) 35%, rgba(255,200,50,0.2) 60%, transparent 80%)',
          }} />
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 10, display: 'flex', gap: 2, alignItems: 'center' }}>
          <span style={{ fontSize: 8, color: 'rgba(232,242,246,0.3)', marginRight: 3 }}>low</span>
          {['#4ade80','#facc15','#f97316','#ef4444','#dc2626'].map(c => (
            <div key={c} style={{ width: 10, height: 6, background: c, borderRadius: 1 }} />
          ))}
          <span style={{ fontSize: 8, color: 'rgba(232,242,246,0.3)', marginLeft: 3 }}>high</span>
        </div>
        <span style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, fontFamily: 'monospace', color: 'rgba(232,242,246,0.28)' }}>Grad-CAM</span>
      </div>

      {/* Result */}
      <div style={{ padding: '10px 13px 13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(143,163,172,0.7)' }}>Result</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#E71E22', background: 'rgba(231,30,34,0.12)', padding: '2px 8px', borderRadius: 999 }}>Glioma</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 11, color: 'rgba(143,163,172,0.7)' }}>Confidence</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#E8F2F6' }}>92%</span>
        </div>
        <div style={{ height: 5, borderRadius: 999, background: 'rgba(41,55,63,0.7)', overflow: 'hidden' }}>
          <div style={{ width: '92%', height: '100%', borderRadius: 999, background: 'linear-gradient(to right, #E71E22, #ff6b6b)' }} />
        </div>
      </div>
    </div>
  )
}

// Always-visible white arrow between panels
function ArrowConnector() {
  return (
    <div className="shrink-0 flex items-center px-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="17" stroke="rgba(232,242,246,0.15)" strokeWidth="1"/>
        <path d="M11 18h14M20 12l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// Downward arrow for mobile
function ArrowDown() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke="rgba(232,242,246,0.15)" strokeWidth="1"/>
      <path d="M18 11v14M12 20l6 6 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Methodology() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 48, damping: 20 })

  // Scan cards stack in one by one
  const s0op = useTransform(smooth, [0.03, 0.12], [0, 1])
  const s0y  = useTransform(smooth, [0.03, 0.12], [52, 0])
  const s1op = useTransform(smooth, [0.10, 0.19], [0, 1])
  const s1y  = useTransform(smooth, [0.10, 0.19], [52, 0])
  const s2op = useTransform(smooth, [0.16, 0.25], [0, 1])
  const s2y  = useTransform(smooth, [0.16, 0.25], [52, 0])
  const s3op = useTransform(smooth, [0.22, 0.31], [0, 1])
  const s3y  = useTransform(smooth, [0.22, 0.31], [52, 0])

  const scanOpacities = [s0op, s1op, s2op, s3op]
  const scanYs        = [s0y,  s1y,  s2y,  s3y]

  const p1LabelOp = useTransform(smooth, [0.05, 0.18], [0, 1])

  // Panel 2 (CNN)
  const p2op = useTransform(smooth, [0.42, 0.56], [0, 1])
  const p2y  = useTransform(smooth, [0.42, 0.56], [44, 0])

  // Panel 3 (Grad-CAM)
  const p3op = useTransform(smooth, [0.68, 0.82], [0, 1])
  const p3y  = useTransform(smooth, [0.68, 0.82], [44, 0])

  return (
    <section
      id="methodology"
      className="relative"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111820 50%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      {/* ── DESKTOP: sticky scroll layout ─────────────────────────────────── */}
      <div ref={containerRef} style={{ height: '320vh' }} className="hidden lg:block">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* Header — always visible, not scroll-driven */}
          <div className="text-center pt-20 pb-6 shrink-0 px-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
              The Model
            </span>
            <h2 className="text-3xl font-black text-theme tracking-tight leading-tight mb-3 mt-5">
              How We Trained <span className="text-cta">NeuroDetect</span>
            </h2>
            <p className="text-text-muted text-base max-w-sm mx-auto">
              From raw MRI slices, through the neural network, to an explainable visual output.
            </p>
          </div>

          {/* Three-panel row — fills remaining space, panels appear on scroll */}
          <div className="flex-1 flex items-center justify-center gap-4 px-8 pb-8">

            {/* Panel 1 — Scan stack */}
            <div className="flex flex-col items-center gap-5 shrink-0">
              <div style={{ width: 210, height: 240, position: 'relative' }}>
                {scanClasses.map((scan, i) => (
                  <motion.div
                    key={scan.label}
                    style={{
                      opacity: scanOpacities[i],
                      y: scanYs[i],
                      position: 'absolute',
                      top: 0, left: 0,
                      zIndex: i + 1,
                      rotate: stackRest[i].rotate,
                      x: stackRest[i].x,
                    }}
                  >
                    <ScanCard scan={scan} />
                  </motion.div>
                ))}
              </div>
              <motion.div style={{ opacity: p1LabelOp }} className="text-center">
                <div className="text-sm font-bold text-theme">MRI Slice Input</div>
                <div className="text-xs text-text-muted mt-0.5">4 classes · 7,312 labelled scans</div>
              </motion.div>
            </div>

            {/* Arrow 1 — always visible */}
            <ArrowConnector />

            {/* Panel 2 — CNN */}
            <motion.div style={{ opacity: p2op, y: p2y }} className="flex flex-col items-center gap-5 shrink-0">
              <CNNPanel />
              <div className="text-center">
                <div className="text-sm font-bold text-theme">CNN Classification</div>
                <div className="text-xs text-text-muted mt-0.5">Conv → Pool → FC → Softmax</div>
              </div>
            </motion.div>

            {/* Arrow 2 — always visible */}
            <ArrowConnector />

            {/* Panel 3 — Grad-CAM */}
            <motion.div style={{ opacity: p3op, y: p3y }} className="flex flex-col items-center gap-5 shrink-0">
              <GradCAMPanel />
              <div className="text-center">
                <div className="text-sm font-bold text-theme">Explainable Output</div>
                <div className="text-xs text-text-muted mt-0.5">Grad-CAM heatmap · confidence score</div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── MOBILE: simple stacked layout ──────────────────────────────────── */}
      <div className="lg:hidden py-24 px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            The Model
          </span>
          <h2 className="text-3xl font-black text-theme tracking-tight leading-tight mb-3 mt-5">
            How We Trained <span className="text-cta">NeuroDetect</span>
          </h2>
          <p className="text-text-muted text-base max-w-sm mx-auto">
            From raw MRI slices, through the neural network, to an explainable visual output.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-xs mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div style={{ position: 'relative', width: 210, height: 260 }}>
              {scanClasses.map((scan, i) => (
                <div
                  key={scan.label}
                  style={{
                    position: 'absolute', top: 0, left: 0, zIndex: i + 1,
                    transform: `rotate(${stackRest[i].rotate}deg) translateX(${stackRest[i].x}px) translateY(${stackRest[i].y}px)`,
                  }}
                >
                  <ScanCard scan={scan} />
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-theme">MRI Slice Input</div>
              <div className="text-xs text-text-muted mt-0.5">4 classes · 7,312 labelled scans</div>
            </div>
          </div>

          <ArrowDown />

          <div className="flex flex-col items-center gap-3">
            <CNNPanel />
            <div className="text-center">
              <div className="text-sm font-bold text-theme">CNN Classification</div>
              <div className="text-xs text-text-muted mt-0.5">Conv → Pool → FC → Softmax</div>
            </div>
          </div>

          <ArrowDown />

          <div className="flex flex-col items-center gap-3">
            <GradCAMPanel />
            <div className="text-center">
              <div className="text-sm font-bold text-theme">Explainable Output</div>
              <div className="text-xs text-text-muted mt-0.5">Grad-CAM heatmap · confidence score</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
