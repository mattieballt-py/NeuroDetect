import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GradCAMScale from './GradCAMScale'

const CASES = [
  {
    id: 'glioma',
    label: 'Glioma',
    plain: '/results/glioma_c99_m_36.jpg',
    result: '/results/glioma_mc99_m36.jpg',
    confidence: 99,
    maskedConfidence: 36,
    verdict: 'Tumour Detected',
    isPositive: true,
  },
  {
    id: 'menig',
    label: 'Meningioma',
    plain: '/results/menig_c99_m_30.jpg',
    result: '/results/menig_mc99_m_30.jpg',
    confidence: 99,
    maskedConfidence: 30,
    verdict: 'Tumour Detected',
    isPositive: true,
  },
  {
    id: 'pituitary',
    label: 'Pituitary',
    plain: '/results/pituitary_c99_m25.jpg',
    result: '/results/pituitary_mc99_m25.jpg',
    confidence: 99,
    maskedConfidence: 25,
    verdict: 'Tumour Detected',
    isPositive: true,
  },
  {
    id: 'notum',
    label: 'No Tumour',
    plain: '/results/notum_c99_m24.jpg',
    result: '/results/notum_mc99_m24.jpg',
    confidence: 99,
    maskedConfidence: 24,
    verdict: 'No Abnormality',
    isPositive: false,
  },
]

const panel = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.22 } },
}

export default function Demo() {
  const [phase, setPhase]           = useState('idle')   // idle | loading | done
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [activeCase, setActiveCase]   = useState(null)
  const runId = useRef(0)

  const selectCase = async (idx) => {
    const id = ++runId.current
    setSelectedIdx(idx)
    setPhase('loading')
    setActiveCase(null)
    await new Promise(r => setTimeout(r, 2200))
    if (id !== runId.current) return
    setPhase('done')
    setActiveCase(CASES[idx])
  }

  const goBack = () => {
    runId.current++
    setPhase('idle')
    setSelectedIdx(null)
    setActiveCase(null)
  }

  return (
    <section id="demo" className="relative bg-bg py-28 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Live Demo
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-4"
          >
            See It <span className="text-cta">In Action</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.24 }}
            className="text-text-muted text-lg max-w-lg mx-auto"
          >
            Select a scan to run through the model and see exactly how the AI reaches its decision.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.36 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card gradient-border rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">

              {/* ── IDLE: case selector ── */}
              {phase === 'idle' && (
                <motion.div key="selector" {...panel} className="p-8">
                  <p className="text-sm font-medium text-text-muted mb-4">Select a scan to analyse:</p>

                  {/* Horizontal row on sm+, 2-col grid on mobile */}
                  <div className="grid grid-cols-2 sm:grid-cols-none sm:flex sm:flex-row gap-3">
                    {CASES.map((cas, i) => (
                      <motion.button
                        key={cas.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.07 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectCase(i)}
                        className="sm:flex-1 rounded-xl border border-[rgba(232,242,246,0.08)] bg-surface/10 overflow-hidden hover:border-[rgba(232,242,246,0.24)] hover:bg-surface/20 transition-all duration-200 group text-left"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={cas.plain}
                            alt={cas.label}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="px-3 py-2.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-theme">{cas.label}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            cas.isPositive
                              ? 'bg-[rgba(231,30,34,0.18)] text-cta'
                              : 'bg-[rgba(74,222,128,0.18)] text-[#4ade80]'
                          }`}>
                            {cas.isPositive ? 'Tumour' : 'Clear'}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── LOADING ── */}
              {phase === 'loading' && (
                <motion.div key="loading" {...panel} className="p-8 flex flex-col items-center gap-5 py-14">
                  {selectedIdx !== null && (
                    <img
                      src={CASES[selectedIdx].plain}
                      alt="Selected scan"
                      className="w-20 h-20 rounded-xl object-cover border border-[rgba(232,242,246,0.1)] opacity-60"
                    />
                  )}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="w-7 h-7 border-2 border-[rgba(232,242,246,0.1)] border-t-cta rounded-full"
                  />
                  <p className="text-sm text-text-muted text-center max-w-[260px] leading-relaxed">
                    Retrieving Grad-CAM analysis and cancer detection…
                  </p>
                  <div className="w-full max-w-xs">
                    <div className="h-1.5 rounded-full bg-surface/60 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cta to-[#ff6b6b] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '88%' }}
                        transition={{ duration: 2, ease: [0.22, 0.1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── DONE: results ── */}
              {phase === 'done' && activeCase && (
                <motion.div key="done" {...panel} className="p-8">

                  {/* Back button */}
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-theme transition-colors mb-6 group"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="group-hover:-translate-x-0.5 transition-transform duration-150">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>

                  {/* Verdict header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-semibold text-theme">{activeCase.label}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      activeCase.isPositive
                        ? 'bg-[rgba(231,30,34,0.12)] text-cta'
                        : 'bg-[rgba(74,222,128,0.12)] text-[#4ade80]'
                    }`}>
                      {activeCase.verdict}
                    </span>
                  </div>

                  {/* Images side by side */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-[10px] text-text-muted opacity-50 mb-1.5 text-center">Original Scan</p>
                      <img src={activeCase.plain} alt="Original scan"
                        className="w-full rounded-xl object-cover aspect-square" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted opacity-50 mb-1.5 text-center">Grad-CAM Result</p>
                      <img src={activeCase.result} alt="Grad-CAM result"
                        className="w-full rounded-xl object-cover aspect-square" />
                    </div>
                  </div>

                  {/* Colour scale */}
                  <GradCAMScale className="mb-5 px-0.5" />

                  {/* Confidence */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-text-muted mb-1.5">
                        <span>Model confidence</span>
                        <span className="font-semibold text-theme">{activeCase.confidence}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface/60">
                        <motion.div
                          className={`h-full rounded-full ${activeCase.isPositive ? 'bg-gradient-to-r from-cta to-[#ff6b6b]' : 'bg-[#4ade80]'}`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${activeCase.confidence}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Masked confidence */}
                    <div className="rounded-xl border border-[rgba(232,242,246,0.06)] bg-surface/20 px-4 py-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>After masking active region</span>
                        <span className="text-cta font-semibold">{activeCase.maskedConfidence}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface/60">
                        <motion.div
                          className="h-full bg-cta/60 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${activeCase.maskedConfidence}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
                        />
                      </div>
                      <p className="text-[10px] text-text-muted opacity-50 leading-relaxed">
                        A {activeCase.confidence - activeCase.maskedConfidence}% confidence drop when this region is hidden tells us the AI was heavily relying on it to classify this as {activeCase.label} — making it the essential area for clinical review.
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* Beta access CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.48 }}
          className="text-center mt-14"
        >
          <p className="text-text-muted text-sm mb-4">Want to connect your own backend?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(232,242,246,0.15)] rounded-full text-sm font-medium text-theme hover:border-[rgba(232,242,246,0.3)] hover:bg-surface/20 transition-all duration-200"
          >
            Request Beta Access →
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
