import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.14 },
  }),
}

// Step cards enter with stronger y + slight scale
const stepCard = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.18 },
  }),
}

const steps = [
  {
    number: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="3" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 10h12M10 15h12M10 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 23l3 3 5-5" stroke="#E71E22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Upload',
    subtitle: 'Brain MRI Scan',
    body: 'Radiologist or clinician uploads a DICOM or JPEG brain MRI scan through the clean web interface.',
    badge: 'INPUT',
    badgeColor: 'bg-surface/60 text-text-muted',
    visual: (
      <div className="w-full rounded-xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.4)] p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 text-text-muted text-sm">
          <div className="w-9 h-9 rounded-lg bg-surface/80 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v9M9 3L5 7M9 3l4 4" stroke="#E8F2F6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 14h12" stroke="#E8F2F6" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-theme text-sm font-medium">patient_scan_2024.jpg</div>
            <div className="text-xs opacity-50">2.4 MB — ready to upload</div>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full bg-surface/60">
          <motion.div
            className="h-full bg-theme rounded-full"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
          />
        </div>
        <div className="text-xs text-text-muted opacity-60 text-right">Encrypting & uploading…</div>
      </div>
    ),
  },
  {
    number: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" strokeDasharray="5 3" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2" fill="#E71E22" />
      </svg>
    ),
    title: 'Analyse',
    subtitle: 'AI Visual Processing',
    body: 'The neural network scans every region, generating a heatmap showing exactly which areas influenced its decision.',
    badge: 'AI ANALYSIS',
    badgeColor: 'bg-[rgba(231,30,34,0.12)] text-cta',
    callout: 'Not a black box — you can see exactly what the AI is looking at',
    visual: (
      <div className="w-full rounded-xl overflow-hidden border border-[rgba(232,242,246,0.08)] bg-[#1a1a1a] relative">
        <div className="aspect-[4/3] relative flex items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 55% 40%, rgba(231,30,34,0.35) 0%, rgba(231,100,34,0.2) 25%, transparent 55%), linear-gradient(135deg, #1a2a30, #111)' }} />
          <div className="relative z-10 text-center">
            <div className="text-xs font-mono text-text-muted opacity-60">Grad-CAM overlay</div>
          </div>
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cta/60 to-transparent"
            initial={{ top: '10%' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="p-3 flex items-center justify-between border-t border-[rgba(232,242,246,0.05)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cta rounded-full animate-pulse" />
            <span className="text-xs text-text-muted">Analysing regions…</span>
          </div>
          <span className="text-xs font-mono text-theme">87.4%</span>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 13l3 3 6-6" stroke="#E71E22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Report',
    subtitle: 'Classification + Explanation',
    body: 'Clinician receives classification, confidence score, heatmap, and similar verified cases — all in one view.',
    badge: 'OUTPUT',
    badgeColor: 'bg-[rgba(41,200,100,0.1)] text-[#4ade80]',
    visual: (
      <div className="w-full rounded-xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.4)] p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Result</span>
          <span className="text-xs font-bold text-cta bg-[rgba(231,30,34,0.12)] px-2.5 py-0.5 rounded-full">Tumour Detected</span>
        </div>
        <div>
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>Confidence</span>
            <span className="text-theme font-semibold">92%</span>
          </div>
          <div className="h-2 rounded-full bg-surface/60">
            <motion.div
              className="h-full bg-gradient-to-r from-cta to-[#ff6b6b] rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '92%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-1">
          {['Similar case 1', 'Similar case 2', 'Similar case 3'].map((c) => (
            <div key={c} className="flex-1 aspect-square rounded-lg bg-surface/50 border border-[rgba(232,242,246,0.06)] flex items-center justify-center">
              <span className="text-[9px] text-text-muted opacity-50 text-center leading-tight px-1">{c}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111820 50%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Our Solution
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
            Introducing{' '}
            <span className="text-cta">NeuroDetect</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            AI you can trust because it shows its work.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">

          {/* Connector line 1: step 1 → step 2 (grows on scroll) */}
          <div className="hidden lg:flex absolute top-[72px] left-[33%] right-[33%] items-center pointer-events-none">
            <motion.div
              className="flex-1 h-px bg-gradient-to-r from-[rgba(232,242,246,0.15)] to-[rgba(231,30,34,0.3)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.svg
              width="8" height="12" viewBox="0 0 8 12" fill="none"
              className="shrink-0"
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.3 }}
            >
              <path d="M1 1l6 5-6 5" stroke="rgba(231,30,34,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          {/* Connector line 2: step 2 → step 3 */}
          <div className="hidden lg:flex absolute top-[72px] items-center pointer-events-none" style={{ left: 'calc(66.66% - 16px)', right: '16.66%' }}>
            <motion.div
              className="flex-1 h-px bg-gradient-to-r from-[rgba(231,30,34,0.3)] to-[rgba(232,242,246,0.15)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.75 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.svg
              width="8" height="12" viewBox="0 0 8 12" fill="none"
              className="shrink-0"
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.5 }}
            >
              <path d="M1 1l6 5-6 5" stroke="rgba(232,242,246,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepCard}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card gradient-border rounded-2xl p-7 flex flex-col justify-between"
            >
              {/* Top content group */}
              <div className="flex flex-col gap-5">
                {/* Step number + badge */}
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-surface/80 leading-none select-none">{step.number}</span>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-surface/50 flex items-center justify-center text-theme">
                  {step.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-bold text-theme mb-0.5">{step.title}</h3>
                  <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">{step.subtitle}</div>
                  <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
                </div>

                {/* Callout (step 2 only) */}
                {step.callout && (
                  <div className="rounded-xl border border-cta/20 bg-[rgba(231,30,34,0.06)] px-4 py-3 text-xs font-medium text-theme leading-relaxed flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5 text-cta" aria-hidden>
                      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {step.callout}
                  </div>
                )}
              </div>

              {/* Visual mockup — pushed to bottom */}
              <div className="mt-5">{step.visual}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom differentiators */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 max-w-2xl mx-auto"
        >
          <p className="text-center text-lg font-semibold text-theme mb-6">
            The difference? Our AI shows its work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M9 1.5C7 4.5 5.5 6.8 5.5 9.3a3.5 3.5 0 007 0c0-1.7-.9-3-1.9-4.4-.3 1.2-1.1 2-2.2 2.3C9 5.9 8.7 3.6 9 1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                text: 'Visual heatmaps show which parts triggered the diagnosis',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                text: "Verification checks confirm the AI's focus areas matter",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <rect x="1.5" y="8" width="3.5" height="8" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                    <rect x="7.25" y="5" width="3.5" height="11" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                    <rect x="13" y="1.5" width="3.5" height="14.5" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
                text: 'Similar case examples help doctors verify results',
              },
            ].map(({ icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(232,242,246,0.07)] bg-surface/15"
              >
                <span className="shrink-0 mt-0.5 text-theme">{icon}</span>
                <span className="text-sm text-text-muted leading-relaxed">{text}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-text-muted mt-6 opacity-70">
            Radiologists stay in control. AI handles the heavy lifting.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
