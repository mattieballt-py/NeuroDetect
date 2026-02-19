import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22 })

  // Plain scan: full opacity at top, fades out by 40% scroll
  const plainOpacity = useTransform(smoothProgress, [0, 0.38], [1, 0])
  // Detected scan: fades in from 15% → 55% scroll, with a gentle scale-in
  const detectedOpacity = useTransform(smoothProgress, [0.15, 0.52], [0, 1])
  const detectedScale   = useTransform(smoothProgress, [0.15, 0.55], [1.03, 1])

  // Scroll nudge hint fades in after a moment, then out mid-scroll
  const hintOpacity = useTransform(smoothProgress, [0, 0.05, 0.45, 0.55], [0, 1, 1, 0])

  // Hero text drifts up and fades as user scrolls
  const textOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0])
  const textY        = useTransform(smoothProgress, [0, 0.28], [0, -36])

  return (
    <div ref={containerRef} className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">

        {/* Ambient glow from top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(41,55,63,0.55) 0%, transparent 65%)',
          }}
        />

        {/* ── Image stack ─────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center px-4 pt-16">

          {/* Image 1 — Grad-CAM detection panel (shown first) */}
          <motion.div
            style={{ opacity: plainOpacity }}
            className="absolute inset-0 flex items-center justify-center px-4 pt-16"
          >
            <img
              src="/mri-detected.jpg"
              alt="Selection of brain MRI scans with Grad-CAM overlay"
              className="max-w-[min(860px,92vw)] max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-[0_0_80px_rgba(232,242,246,0.05)]"
            />
          </motion.div>

          {/* Image 2 — plain MRI panel (revealed on scroll) */}
          <motion.div
            style={{ opacity: detectedOpacity, scale: detectedScale }}
            className="absolute inset-0 flex items-center justify-center px-4 pt-16"
          >
            {/* Warm red glow behind revealed image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(231,30,34,0.07) 0%, transparent 70%)',
              }}
            />
            <div className="relative">
              <img
                src="/mri-plain.jpg"
                alt="Brain MRI scans"
                className="max-w-[min(860px,92vw)] max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-[0_0_100px_rgba(231,30,34,0.12)]"
              />
              {/* Detection active badge */}
              <motion.div
                style={{ opacity: detectedOpacity }}
                className="absolute top-3 right-3 flex items-center gap-2 bg-black/75 backdrop-blur-sm border border-cta/40 rounded-full px-3 py-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
                <span className="text-xs font-semibold text-text-primary font-sans">AI Analysis Active</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] font-sans font-medium text-text-muted tracking-[0.18em] uppercase">
            Scroll to reveal detection
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-7 bg-gradient-to-b from-text-muted/50 to-transparent"
          />
        </motion.div>

        {/* ── Text overlay (bottom of hero) ──────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-0 left-0 right-0 pb-14 px-6 flex flex-col items-center text-center pointer-events-none"
        >
          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
            {[
              { number: '13,000', label: 'brain tumours per year in the UK' },
              { number: '1.6M',   label: 'people waiting for scans' },
              { number: '30%',    label: 'radiologist shortage' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-black text-theme leading-none">{number}</div>
                <div className="font-sans text-xs text-text-muted mt-1 max-w-[130px] leading-snug">{label}</div>
              </div>
            ))}
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-[5rem] font-black leading-[1.06] text-theme max-w-3xl mb-5">
            What if AI could
            <span className="text-cta italic"> help?</span>
          </h1>
          <p className="font-sans text-text-muted text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            NeuroDetect uses explainable AI to flag high-risk brain MRI scans — showing radiologists exactly where to look.
          </p>

          <motion.a
            href="#stakes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="pointer-events-auto font-sans inline-flex items-center gap-2 px-7 py-3.5 bg-cta text-white font-semibold rounded-full text-base glow-cta hover:glow-cta-hover hover:bg-cta-hover transition-all duration-200"
          >
            See How It Works
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5">
              <path d="M7.5 2.5v10M7.5 12.5l5-5M7.5 12.5l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
