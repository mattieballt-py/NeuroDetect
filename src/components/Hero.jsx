import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Hero section with scroll-driven MRI crossfade.
 *
 * PLACEHOLDER IMAGES
 * ------------------
 * Drop your images into /public/ and update the src paths below:
 *   MRI_PLAIN_SRC  → plain MRI brain scan (no overlay)
 *   MRI_DETECT_SRC → same scan with Grad-CAM heatmap overlay
 *
 * The transition triggers as the user scrolls through the sticky hero panel.
 * scrollY ≈ 0      → shows plain MRI
 * scrollY ≈ 600px  → crossfades to detected MRI
 */

const MRI_PLAIN_SRC = '/mri-plain.jpg'
const MRI_DETECT_SRC = '/mri-detected.jpg'

export default function Hero() {
  const containerRef = useRef(null)

  // Scroll progress within the tall hero container (0 → 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth spring for the scroll value
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  // Plain MRI: opacity 1 → 0 as scroll goes 0 → 0.4
  const plainOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  // Detected MRI: opacity 0 → 1 as scroll goes 0.15 → 0.55
  const detectedOpacity = useTransform(smoothProgress, [0.15, 0.55], [0, 1])
  // Subtle scale on detected image
  const detectedScale = useTransform(smoothProgress, [0.15, 0.55], [1.04, 1])

  // Scroll progress label
  const labelOpacity = useTransform(smoothProgress, [0, 0.1, 0.5, 0.6], [0, 1, 1, 0])

  // CTA + text: fade out as user scrolls
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -40])

  return (
    /*
     * The outer div is 220vh tall — the extra height gives scroll room
     * while the inner sticky panel stays fixed in view.
     */
    <div ref={containerRef} className="relative" style={{ height: '220vh' }}>
      {/* Sticky viewport panel */}
      <div className="sticky top-0 h-screen overflow-hidden bg-bg flex items-center justify-center">

        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(41,55,63,0.6) 0%, transparent 70%)',
          }}
        />

        {/* ── Image stack ─────────────────────────────────────────────── */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Plain MRI */}
          <motion.div
            style={{ opacity: plainOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[min(560px,90vw)] aspect-square rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(232,242,246,0.06)]">
              <img
                src={MRI_PLAIN_SRC}
                alt="Brain MRI scan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  /* Placeholder gradient shown until real image is dropped in */
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Placeholder when image not yet added */}
              <div
                className="absolute inset-0 hidden items-center justify-center flex-col gap-3 text-text-muted"
                style={{ background: 'linear-gradient(135deg, #1a2a30, #29373F)' }}
              >
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="35" stroke="rgba(232,242,246,0.15)" strokeWidth="1.5" />
                  <ellipse cx="36" cy="36" rx="22" ry="28" stroke="rgba(232,242,246,0.25)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="36" cy="36" r="8" fill="rgba(232,242,246,0.1)" stroke="rgba(232,242,246,0.3)" strokeWidth="1.5" />
                  <path d="M24 28 Q36 20 48 28" stroke="rgba(232,242,246,0.2)" strokeWidth="1.5" fill="none" />
                  <path d="M22 38 Q36 46 50 38" stroke="rgba(232,242,246,0.2)" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="text-sm font-medium opacity-60">Add mri-plain.jpg to /public</span>
              </div>
              {/* Subtle scan-line overlay for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
                }}
              />
            </div>
          </motion.div>

          {/* Detected MRI (with heatmap) */}
          <motion.div
            style={{ opacity: detectedOpacity, scale: detectedScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[min(560px,90vw)] aspect-square rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(231,30,34,0.15)]">
              <img
                src={MRI_DETECT_SRC}
                alt="Brain MRI scan with AI detection overlay"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Placeholder when detected image not yet added */}
              <div
                className="absolute inset-0 hidden items-center justify-center flex-col gap-3"
                style={{ background: 'linear-gradient(135deg, #1a1010, #3a1515)' }}
              >
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="35" stroke="rgba(231,30,34,0.2)" strokeWidth="1.5" />
                  <ellipse cx="36" cy="36" rx="22" ry="28" stroke="rgba(231,30,34,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="42" cy="30" r="10" fill="rgba(231,30,34,0.25)" stroke="rgba(231,30,34,0.6)" strokeWidth="1.5" />
                  <circle cx="42" cy="30" r="5" fill="rgba(231,30,34,0.4)" />
                  <path d="M24 28 Q36 20 48 28" stroke="rgba(232,242,246,0.15)" strokeWidth="1.5" fill="none" />
                  <path d="M22 38 Q36 46 50 38" stroke="rgba(232,242,246,0.15)" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="text-sm font-medium text-text-muted opacity-60">Add mri-detected.jpg to /public</span>
                <span className="text-xs font-medium text-cta opacity-80">Tumour detected</span>
              </div>
              {/* Heatmap colour cast */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(231,30,34,0.1)',
                }}
              />
              {/* Detection badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                style={{ opacity: detectedOpacity }}
                className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-cta/40 rounded-full px-3 py-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
                <span className="text-xs font-semibold text-text-primary">AI Analysis Active</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll label that fades in/out mid-scroll */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-xs font-medium text-text-muted tracking-widest uppercase">
              Scroll to reveal
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent" />
          </motion.div>
        </div>

        {/* ── Headline overlay ─────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-0 left-0 right-0 pb-16 px-6 flex flex-col items-center text-center pointer-events-none"
        >
          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { number: '13,000', label: 'brain tumours / year UK' },
              { number: '1.6M', label: 'people waiting for scans' },
              { number: '30%', label: 'radiologist shortage' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-theme leading-none">{number}</div>
                <div className="text-xs text-text-muted mt-1 max-w-[120px] leading-tight">{label}</div>
              </div>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-theme max-w-3xl mb-5">
            What if AI could
            <span className="text-cta"> help?</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            NeuroDetect uses explainable AI to flag high-risk brain MRI scans — showing radiologists exactly where to look.
          </p>

          <motion.a
            href="#stakes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 bg-cta text-white font-semibold rounded-full text-base glow-cta hover:glow-cta-hover hover:bg-cta-hover transition-all duration-200"
          >
            See How It Works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
              <path d="M8 3L8 13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
