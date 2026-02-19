import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Each element fades up; `custom` sets the delay
const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

// Divider line grows from left
const growLine = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.55, ease: 'easeOut', delay: 0.48 } },
}

export default function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22 })

  const img1Opacity = useTransform(smoothProgress, [0, 0.38], [1, 0])
  const img2Opacity = useTransform(smoothProgress, [0.15, 0.52], [0, 1])
  const img2Scale   = useTransform(smoothProgress, [0.15, 0.55], [1.03, 1])
  const hintOpacity = useTransform(smoothProgress, [0, 0.06, 0.45, 0.55], [0, 1, 1, 0])

  return (
    <div ref={containerRef} style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-bg flex flex-col md:flex-row">

        {/* ── LEFT: sticky text column ────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 pt-20 pb-10 md:pb-0 w-full md:w-[44%] shrink-0">

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 120% 60% at -10% 50%, rgba(41,55,63,0.45) 0%, transparent 70%)',
            }}
          />

          {/* Staggered entrance — initial/animate (not whileInView: hero is always visible) */}
          <motion.div initial="hidden" animate="visible" className="relative">

            {/* Stats: each row enters in sequence */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { number: '13,000', label: 'brain tumours per year in the UK' },
                { number: '1.6M',   label: 'people waiting for scans' },
                { number: '30%',    label: 'radiologist shortage' },
              ].map(({ number, label }, i) => (
                <motion.div
                  key={label}
                  variants={fadeIn}
                  custom={0.1 + i * 0.14}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-heading text-3xl lg:text-4xl font-black text-theme leading-none tabular-nums">
                    {number}
                  </span>
                  <span className="font-sans text-sm text-text-muted leading-snug">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Divider — grows left → right after stats */}
            <motion.div
              variants={growLine}
              className="w-12 h-px bg-cta mb-8"
              style={{ transformOrigin: 'left' }}
            />

            {/* Headline */}
            <motion.h1
              variants={fadeIn}
              custom={0.6}
              className="font-heading text-4xl lg:text-5xl xl:text-[3.5rem] font-black leading-[1.08] text-theme mb-5"
            >
              What if AI could
              <br />
              <span className="text-cta italic">help?</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              custom={0.72}
              className="font-sans text-text-muted text-base lg:text-lg max-w-sm mb-8 leading-relaxed"
            >
              NeuroDetect uses explainable AI to flag high-risk brain MRI scans — showing radiologists exactly where to look.
            </motion.p>

            <motion.a
              variants={fadeIn}
              custom={0.84}
              href="#stakes"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="font-sans inline-flex items-center gap-2 px-7 py-3.5 bg-cta text-white font-semibold rounded-full text-base glow-cta hover:glow-cta-hover hover:bg-cta-hover transition-all duration-200 w-fit"
            >
              See How It Works
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5">
                <path d="M7.5 2.5v10M7.5 12.5l5-5M7.5 12.5l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* ── RIGHT: full-height image panel ──────────────────────── */}
        <div className="relative flex-1 h-full min-h-0">

          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }}
          />

          {/* Image 1 — Grad-CAM detection (shown first) */}
          <motion.div style={{ opacity: img1Opacity }} className="absolute inset-0">
            <img
              src="/mri-detected.jpg"
              alt="Selection of brain MRI scans with Grad-CAM overlay"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Image 2 — plain MRI (crossfades in on scroll) */}
          <motion.div style={{ opacity: img2Opacity, scale: img2Scale }} className="absolute inset-0">
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 60% 50%, rgba(231,30,34,0.06) 0%, transparent 70%)',
              }}
            />
            <img src="/mri-plain.jpg" alt="Brain MRI scans" className="w-full h-full object-contain" />
            <motion.div
              style={{ opacity: img2Opacity }}
              className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-sm border border-cta/40 rounded-full px-3 py-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
              <span className="text-xs font-semibold text-text-primary font-sans">AI Analysis Active</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Imperial College logo — bottom-right ──── */}
        <div className="absolute bottom-7 right-8 z-20 pointer-events-none flex items-center gap-2 opacity-50">
          <img src="/imperial.svg" alt="Imperial College London" className="h-5 w-auto" />
        </div>

        {/* ── Scroll hint — centred at bottom ───────── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[11px] font-sans font-medium text-text-muted tracking-[0.18em] uppercase">
            Scroll to reveal
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-7 bg-gradient-to-b from-text-muted/50 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  )
}
