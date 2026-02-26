import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 },
  }),
}

const faqs = [
  {
    q: 'Is NeuroDetect a replacement for radiologists?',
    a: 'No. NeuroDetect is designed as a decision-support tool, not a replacement. It helps radiologists triage and prioritise high-risk scans faster, but every diagnosis remains the responsibility of a qualified clinician. The AI flags; the expert decides.',
  },
  {
    q: 'What scan formats does NeuroDetect accept?',
    a: 'NeuroDetect currently supports DICOM (the standard clinical format) and JPEG/PNG exports of brain MRI scans. DICOM support preserves all associated metadata for more accurate analysis.',
  },
  {
    q: 'How does the AI explain its decisions?',
    a: 'We use Grad-CAM (Gradient-weighted Class Activation Mapping) to generate a heatmap overlay showing which regions of the scan most influenced the AI\'s output. We then run occlusion testing — hiding those regions and re-running the analysis — to verify they are genuinely meaningful, not artefacts.',
  },
  {
    q: 'How accurate is NeuroDetect?',
    a: 'In testing on our validation dataset, NeuroDetect achieves over 92% classification accuracy with a confidence score attached to every result. All outputs are designed to be reviewed alongside clinical judgement — the system is calibrated to favour sensitivity (minimising missed detections) over specificity.',
  },
  {
    q: 'Is patient data kept secure and confidential?',
    a: 'Yes. Scans are encrypted in transit using TLS and are not retained beyond the active analysis session. No patient-identifiable data is stored on our servers. NeuroDetect is designed with NHS and GDPR data handling principles in mind.',
  },
  {
    q: 'What types of brain tumour can NeuroDetect detect?',
    a: 'The current model is trained to classify glioma, meningioma, pituitary tumours, and normal (no tumour) cases from T1-weighted MRI scans. Expanding to additional modalities and tumour types is part of our ongoing research.',
  },
  {
    q: 'When will NeuroDetect be available to clinical partners?',
    a: 'We are currently in closed beta, working with a small number of clinical partners to validate the system in real-world settings. If you are interested in participating, please use the contact form above. A broader rollout is planned following successful validation.',
  },
  
]

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
        isOpen
          ? 'border-[rgba(232,242,246,0.15)] bg-[rgba(41,55,63,0.25)]'
          : 'border-[rgba(232,242,246,0.07)] bg-[rgba(41,55,63,0.1)] hover:border-[rgba(232,242,246,0.12)]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-theme leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 w-5 h-5 flex items-center justify-center text-text-muted"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed border-t border-[rgba(232,242,246,0.06)] pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      className="relative py-28 px-6 overflow-hidden bg-bg"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              FAQ
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
            Common{' '}
            <span className="text-cta">Questions</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-lg max-w-lg mx-auto"
          >
            Everything you need to know about NeuroDetect and how it works in practice.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          custom={faqs.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="text-center text-sm text-text-muted mt-10 opacity-60"
        >
          Still have questions?{' '}
          <a href="#contact" className="hover:text-theme transition-colors underline underline-offset-2">
            Get in touch
          </a>
        </motion.p>
      </div>
    </section>
  )
}
