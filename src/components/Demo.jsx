import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

const SAMPLE_RESULTS = [
  {
    label: 'Sample A — Glioma',
    verdict: 'Tumour Detected',
    confidence: 94,
    region: 'Right temporal lobe',
    isPositive: true,
  },
  {
    label: 'Sample B — Meningioma',
    verdict: 'Tumour Detected',
    confidence: 88,
    region: 'Frontal lobe, superior',
    isPositive: true,
  },
  {
    label: 'Sample C — No Tumour',
    verdict: 'No Abnormality',
    confidence: 97,
    region: 'No region of concern',
    isPositive: false,
  },
]

function ResultCard({ result, visible }) {
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
            <span className="text-sm font-medium text-text-muted">{result.label}</span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                result.isPositive
                  ? 'bg-[rgba(231,30,34,0.12)] text-cta'
                  : 'bg-[rgba(74,222,128,0.12)] text-[#4ade80]'
              }`}
            >
              {result.verdict}
            </span>
          </div>

          {/* Simulated scan + heatmap side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="aspect-square rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a2a30, #0d1a20)' }}
            >
              <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="opacity-50">
                <ellipse cx="30" cy="35" rx="25" ry="30" stroke="rgba(232,242,246,0.3)" strokeWidth="1.5" />
                <ellipse cx="30" cy="35" rx="15" ry="20" stroke="rgba(232,242,246,0.2)" strokeWidth="1" />
                <circle cx="30" cy="35" r="5" fill="rgba(232,242,246,0.05)" />
              </svg>
            </div>
            <div
              className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: result.isPositive
                  ? 'radial-gradient(ellipse at 60% 40%, rgba(231,30,34,0.5) 0%, rgba(255,120,30,0.2) 30%, #0d1a20 70%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.1) 0%, #0d1a20 60%)',
              }}
            >
              <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="opacity-50">
                <ellipse cx="30" cy="35" rx="25" ry="30" stroke="rgba(232,242,246,0.2)" strokeWidth="1.5" />
                {result.isPositive && (
                  <circle cx="36" cy="28" r="9" fill="rgba(231,30,34,0.3)" stroke="rgba(231,30,34,0.6)" strokeWidth="1" />
                )}
              </svg>
              <div className="absolute bottom-2 right-2 text-[9px] font-medium text-cta">AI overlay</div>
            </div>
          </div>

          {/* Confidence bar */}
          <div>
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>Model confidence</span>
              <span className="font-semibold text-theme">{result.confidence}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface/60">
              <motion.div
                className={`h-full rounded-full ${result.isPositive ? 'bg-gradient-to-r from-cta to-[#ff6b6b]' : 'bg-[#4ade80]'}`}
                initial={{ width: '0%' }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
            <span>Region of concern: <span className="text-theme font-medium">{result.region}</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Demo() {
  const [phase, setPhase] = useState('idle') // idle | uploading | analysing | done
  const [selectedSample, setSelectedSample] = useState(null)
  const [activeResult, setActiveResult] = useState(null)
  const fileRef = useRef(null)

  const runDemo = async (resultIndex) => {
    setPhase('uploading')
    setActiveResult(null)

    await new Promise((r) => setTimeout(r, 1000))
    setPhase('analysing')

    await new Promise((r) => setTimeout(r, 1800))
    setPhase('done')
    setActiveResult(SAMPLE_RESULTS[resultIndex])
  }

  const reset = () => {
    setPhase('idle')
    setActiveResult(null)
    setSelectedSample(null)
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
          {/* Upload / Sample selector */}
          <div className="glass-card gradient-border rounded-2xl p-8">

            {/* Sample buttons — stagger in left to right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
              className="mb-6"
            >
              <motion.p
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
                className="text-sm font-medium text-text-muted mb-4"
              >
                Choose a sample scan to analyse:
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_RESULTS.map((sample, i) => (
                  <motion.button
                    key={sample.label}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelectedSample(i); reset(); }}
                    disabled={phase === 'uploading' || phase === 'analysing'}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 text-sm ${
                      selectedSample === i
                        ? 'border-cta/50 bg-[rgba(231,30,34,0.08)] text-theme'
                        : 'border-[rgba(232,242,246,0.08)] bg-surface/20 text-text-muted hover:border-[rgba(232,242,246,0.18)] hover:text-theme'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="font-medium text-xs mb-1 text-theme opacity-70 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${sample.isPositive ? 'bg-cta' : 'bg-[#4ade80]'}`} />
                      {sample.label.split(' — ')[1]}
                    </div>
                    <div className="text-[10px] opacity-60">{sample.label.split(' — ')[0]}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-1 h-px bg-[rgba(232,242,246,0.06)]" />
              <span className="text-xs text-text-muted opacity-50">or</span>
              <div className="flex-1 h-px bg-[rgba(232,242,246,0.06)]" />
            </motion.div>

            {/* File upload zone — appears after buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[rgba(232,242,246,0.1)] hover:border-[rgba(232,242,246,0.2)] rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200 mb-6"
            >
              <input ref={fileRef} type="file" accept="image/*,.dcm" className="hidden" />
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-text-muted opacity-50">
                <path d="M14 4v14M14 4L9 9M14 4l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-text-muted opacity-60">Upload your own MRI scan</span>
              <span className="text-xs text-text-muted opacity-40">JPEG, PNG, DICOM — max 20 MB</span>
            </motion.div>

            {/* Run button — appears last, drawing the eye down */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.75 }}
            >
              <motion.button
                whileHover={{ scale: selectedSample === null ? 1 : 1.02 }}
                whileTap={{ scale: selectedSample === null ? 1 : 0.97 }}
                onClick={() => selectedSample !== null && runDemo(selectedSample)}
                disabled={selectedSample === null || phase === 'uploading' || phase === 'analysing'}
                className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
                  selectedSample === null || phase === 'uploading' || phase === 'analysing'
                    ? 'bg-surface/40 text-text-muted cursor-not-allowed'
                    : 'bg-cta text-white glow-cta hover:glow-cta-hover hover:bg-cta-hover'
                }`}
              >
                {phase === 'uploading' && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Uploading scan…
                  </>
                )}
                {phase === 'analysing' && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Analysing with AI…
                  </>
                )}
                {(phase === 'idle' || phase === 'done') && 'Run Analysis →'}
              </motion.button>
            </motion.div>

            {/* Progress bar */}
            <AnimatePresence>
              {(phase === 'uploading' || phase === 'analysing') && (
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
                      animate={{ width: phase === 'uploading' ? '35%' : '85%' }}
                      transition={{ duration: phase === 'uploading' ? 0.9 : 1.6, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted opacity-50 mt-1.5">
                    <span>{phase === 'uploading' ? 'Uploading & validating…' : 'Running neural network analysis…'}</span>
                    <span>{phase === 'uploading' ? '35%' : '85%'}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result */}
          <div className="mt-5">
            <ResultCard result={activeResult} visible={phase === 'done' && !!activeResult} />
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
