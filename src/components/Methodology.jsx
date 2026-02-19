import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

const slideIn = {
  hidden: { opacity: 0, x: 20, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 },
  }),
}

const pipeline = [
  {
    step: '01',
    title: 'Data Collection',
    body: 'Sourced from the Brain Tumour MRI Dataset on Kaggle — over 7,300 labelled T1-weighted brain MRI scans across four classes, split into training and held-out test sets.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Slice Pre-processing',
    body: 'MRI volumes are extracted as 2D axial slices. Each image is resized to 224 × 224 px, pixel values normalised, and augmented (flips, rotations, brightness shifts) to improve generalisation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.5" stroke="#E71E22" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'CNN Training',
    body: 'A convolutional neural network is trained end-to-end to classify each scan into one of four categories. Validation loss and accuracy are monitored throughout to prevent overfitting.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="19" cy="12" r="2" stroke="#E71E22" strokeWidth="1.6" />
        <path d="M7 12h3M14 12h3M13.4 7.8l4.2 3M13.4 16.2l4.2-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Explainability Layer',
    body: 'Grad-CAM is applied post-training to generate heatmap overlays for every prediction. Occlusion testing then verifies that highlighted regions genuinely drive the classification — not noise.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" strokeDasharray="4 2.5" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="#E71E22" />
      </svg>
    ),
  },
]

const classes = [
  { label: 'Glioma', count: 400, color: 'bg-[rgba(231,30,34,0.18)] border-cta/25 text-cta' },
  { label: 'Meningioma', count: 400, color: 'bg-[rgba(232,242,246,0.06)] border-[rgba(232,242,246,0.12)] text-theme' },
  { label: 'Pituitary', count: 400, color: 'bg-[rgba(232,242,246,0.06)] border-[rgba(232,242,246,0.12)] text-theme' },
  { label: 'No Tumour', count: 400, color: 'bg-[rgba(74,222,128,0.08)] border-[rgba(74,222,128,0.2)] text-[#4ade80]' },
]

export default function Methodology() {
  return (
    <section
      id="methodology"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111820 50%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(41,55,63,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              The Model
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
            How We Trained{' '}
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
            A CNN trained on 7,300+ labelled brain MRI slices, evaluated against a balanced held-out test set of 1,600 images across four tumour classes.
          </motion.p>
        </div>

        {/* Pipeline steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pipeline.map((item, i) => (
            <motion.div
              key={item.step}
              variants={slideIn}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass-card gradient-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-surface/70 leading-none select-none">{item.step}</span>
                <div className="w-10 h-10 rounded-xl bg-surface/50 flex items-center justify-center text-theme shrink-0">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-theme mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dataset breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Test set breakdown */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.2)] p-7"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-theme">Test Set</h3>
                <p className="text-xs text-text-muted mt-0.5">Held-out evaluation — never seen during training</p>
              </div>
              <span className="text-2xl font-black text-theme tabular-nums">1,600</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {classes.map((cls, i) => (
                <motion.div
                  key={cls.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className={`rounded-xl border px-4 py-3 flex items-center justify-between ${cls.color}`}
                >
                  <span className="text-sm font-medium">{cls.label}</span>
                  <span className="text-sm font-bold tabular-nums opacity-80">{cls.count}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-text-muted mt-4 opacity-60">
              400 images per class — perfectly balanced for unbiased evaluation.
            </p>
          </motion.div>

          {/* Training set + Kaggle credit */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-5"
          >
            {/* Training set stat */}
            <div className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.2)] p-7 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-theme">Training Set</h3>
                  <p className="text-xs text-text-muted mt-0.5">Glioma · Meningioma · Pituitary · No Tumour</p>
                </div>
                <span className="text-2xl font-black text-theme tabular-nums">5,712</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface/60 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cta/60 to-theme/40 rounded-full"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '78%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <p className="text-xs text-text-muted mt-2 opacity-60">78% of total dataset used for training</p>
            </div>

            {/* Dataset source */}
            <a
              href="https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[rgba(232,242,246,0.08)] hover:border-[rgba(232,242,246,0.16)] bg-[rgba(41,55,63,0.2)] hover:bg-[rgba(41,55,63,0.3)] p-6 flex items-center gap-4 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(32,145,42,0.15)] border border-[rgba(32,145,42,0.25)] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 15l4.5-6L9 11l3-4 3 8" stroke="#20912a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="4" r="1.5" fill="#20912a" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-theme group-hover:text-white transition-colors">Brain Tumour MRI Dataset</div>
                <div className="text-xs text-text-muted mt-0.5">Masoud Nickparvar · Kaggle</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-30 group-hover:opacity-60 transition-opacity">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
