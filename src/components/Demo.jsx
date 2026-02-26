import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

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

function ResultCard({ cas, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.3)] p-6 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-muted">{cas.label}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              cas.isPositive
                ? 'bg-[rgba(231,30,34,0.12)] text-cta'
                : 'bg-[rgba(74,222,128,0.12)] text-[#4ade80]'
            }`}>
              {cas.verdict}
            </span>
          </div>

          {/* Images side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-text-muted opacity-50 mb-1.5 text-center">Original Scan</div>
              <img src={cas.plain} alt="Original scan" className="w-full rounded-xl object-cover aspect-square" />
            </div>
            <div>
              <div className="text-[10px] text-text-muted opacity-50 mb-1.5 text-center">Grad-CAM Result</div>
              <img src={cas.result} alt="Grad-CAM result" className="w-full rounded-xl object-cover aspect-square" />
            </div>
          </div>

          {/* Confidence */}
          <div>
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>Model confidence</span>
              <span className="font-semibold text-theme">{cas.confidence}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface/60">
              <motion.div
                className={`h-full rounded-full ${cas.isPositive ? 'bg-gradient-to-r from-cta to-[#ff6b6b]' : 'bg-[#4ade80]'}`}
                initial={{ width: '0%' }}
                animate={{ width: `${cas.confidence}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>

          {/* Masked confidence */}
          <div className="rounded-xl border border-[rgba(232,242,246,0.06)] bg-surface/20 px-4 py-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>After masking active region</span>
              <span className="text-cta font-semibold">{cas.maskedConfidence}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface/60">
              <motion.div
                className="h-full bg-cta/60 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${cas.maskedConfidence}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <p className="text-[10px] text-text-muted opacity-50">
              {cas.confidence - cas.maskedConfidence}% drop confirms the highlighted region was critical to the diagnosis
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Demo() {
  const [phase, setPhase] = useState('idle') // idle | analysing | done
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [activeCase, setActiveCase] = useState(null)

  const runDemo = async (idx) => {
    setPhase('analysing')
    setActiveCase(null)

    await new Promise((r) => setTimeout(r, 2000))
    setPhase('done')
    setActiveCase(CASES[idx])
  }

  const reset = () => {
    setPhase('idle')
    setActiveCase(null)
    setSelectedIdx(null)
  }

  return (
    <section id="demo" className="relative bg-bg py-28 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Live Demo
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-4"
          >
            See It{' '}
            <span className="text-cta">In Action</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-lg max-w-lg mx-auto"
          >
            Run a sample scan through the model and see exactly how the AI makes its decision.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card gradient-border rounded-2xl p-8">

            {/* Case selector */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="mb-6"
            >
              <motion.p
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
                className="text-sm font-medium text-text-muted mb-4"
              >
                Choose a scan to analyse:
              </motion.p>
              <div className="grid grid-cols-2 gap-3">
                {CASES.map((cas, i) => (
                  <motion.button
                    key={cas.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedIdx(i)
                      setPhase('idle')
                      setActiveCase(null)
                    }}
                    disabled={phase === 'analysing'}
                    className={`rounded-xl border overflow-hidden text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedIdx === i
                        ? 'border-cta/50 ring-1 ring-cta/20'
                        : 'border-[rgba(232,242,246,0.08)] hover:border-[rgba(232,242,246,0.2)]'
                    }`}
                  >
                    <div className="relative">
                      <img src={cas.plain} alt={cas.label} className="w-full aspect-square object-cover" />
                      {selectedIdx === i && (
                        <div className="absolute inset-0 bg-cta/10" />
                      )}
                    </div>
                    <div className={`px-3 py-2 flex items-center justify-between transition-colors duration-200 ${
                      selectedIdx === i ? 'bg-[rgba(231,30,34,0.08)]' : 'bg-surface/20'
                    }`}>
                      <span className="text-xs font-medium text-theme">{cas.label}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        cas.isPositive
                          ? 'bg-[rgba(231,30,34,0.15)] text-cta'
                          : 'bg-[rgba(74,222,128,0.15)] text-[#4ade80]'
                      }`}>
                        {cas.isPositive ? 'Tumour' : 'Clear'}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Run button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: selectedIdx === null ? 1 : 1.02 }}
                whileTap={{ scale: selectedIdx === null ? 1 : 0.97 }}
                onClick={() => selectedIdx !== null && runDemo(selectedIdx)}
                disabled={selectedIdx === null || phase === 'analysing'}
                className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
                  selectedIdx === null || phase === 'analysing'
                    ? 'bg-surface/40 text-text-muted cursor-not-allowed'
                    : 'bg-cta text-white glow-cta hover:glow-cta-hover hover:bg-cta-hover'
                }`}
              >
                {phase === 'analysing' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Analysing with AI…
                  </>
                ) : 'Run Analysis →'}
              </motion.button>
            </motion.div>

            {/* Progress bar */}
            <AnimatePresence>
              {phase === 'analysing' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="h-1.5 rounded-full bg-surface/60">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cta to-[#ff6b6b] rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted opacity-50 mt-1.5">
                    <span>Running neural network analysis…</span>
                    <span>85%</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result */}
          <div className="mt-5">
            <ResultCard cas={activeCase} visible={phase === 'done' && !!activeCase} />
          </div>

          {phase === 'done' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
              <button onClick={reset} className="text-sm text-text-muted hover:text-theme underline transition-colors">
                ← Run another scan
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Beta access CTA */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
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
