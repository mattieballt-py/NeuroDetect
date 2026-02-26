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

// Cards slide in from the right + up — matches reading flow (left to right, top down)
const slideIn = {
  hidden: { opacity: 0, x: 20, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 },
  }),
}

const IconHeatmap = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
    <path d="M11 2C8.5 5.8 7 8.5 7 11.5a4 4 0 008 0c0-2-1-3.5-2.2-5.2-.4 1.4-1.3 2.4-2.6 2.7C10.8 7.2 10.5 4.5 11 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 14.5c.5.8 1.2 1.2 2 1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconVerify = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M7.5 11l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconCases = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
    <rect x="2" y="10" width="4.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.7"/>
    <rect x="8.75" y="6" width="4.5" height="13" rx="1" stroke="currentColor" strokeWidth="1.7"/>
    <rect x="15.5" y="2" width="4.5" height="17" rx="1" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
)

const cards = [
  {
    id: 'gradcam',
    icon: <IconHeatmap />,
    title: 'Heatmap Highlighting',
    summary: 'See what the AI is looking at',
    expanded:
      'The AI highlights the exact regions of the scan that led to its decision — like a doctor circling areas of concern on an X-ray. Brighter regions indicate stronger influence on the result.',
    visual: (
      <div className="mt-5 rounded-xl overflow-hidden border border-[rgba(232,242,246,0.08)] bg-[#111]">
        <img
          src="/brain.jpg"
          alt="Grad-CAM heatmap visualisation across brain scans"
          className="w-full h-auto object-contain"
        />
        <div className="px-3 py-2 border-t border-[rgba(232,242,246,0.06)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cta animate-pulse shrink-0" />
          <span className="text-[10px] font-sans text-text-muted opacity-70">Live Grad-CAM visualisation — areas the AI weighted most heavily</span>
        </div>
      </div>
    ),
  },
  {
    id: 'occlusion',
    icon: <IconVerify />,
    title: 'Occlusion Verification',
    summary: "Double-check the AI's reasoning",
    expanded:
      "We mask the top-activated Grad-CAM region and see if the model's confidence drops more than when masking a random region of the same size. If so, we know it was looking at the right place: not just pattern-matching on noise.",
    visual: (
      <div className="mt-5 rounded-xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.3)] p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>With highlighted region</span>
          <span className="text-[#4ade80] font-semibold">Confidence 92%</span>
        </div>
        <div className="h-2 rounded-full bg-surface/60">
          <motion.div
            className="h-full bg-[#4ade80] rounded-full"
            initial={{ width: '0%' }}
            whileInView={{ width: '92%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted mt-1">
          <span>Region hidden (re-run)</span>
          <span className="text-cta font-semibold">Confidence 31%</span>
        </div>
        <div className="h-2 rounded-full bg-surface/60">
          <motion.div
            className="h-full bg-cta rounded-full"
            initial={{ width: '0%' }}
            whileInView={{ width: '31%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <p className="text-[10px] text-text-muted opacity-60 pt-1">
          61% confidence drop confirms region was critical to the diagnosis
        </p>
      </div>
    ),
  },
  {
    id: 'similar',
    icon: <IconCases />,
    title: 'Similar Case Retrieval',
    summary: 'Learn from past examples',
    expanded:
      'Nearest-neighbour scans from the training set are retrieved using CNN embeddings, giving clinicians visual precedent. If this scan looks like four other confirmed cases, confidence in the result increases.',
    visual: (
      <div className="mt-5">
        <div className="text-xs text-text-muted mb-3 font-medium">Top 3 similar verified cases:</div>
        <div className="grid grid-cols-3 gap-2">
          {['/brain1.jpg', '/brain2.jpg', '/brain3.jpg'].map((src) => (
            <div key={src} className="aspect-square rounded-lg bg-[rgba(41,55,63,0.5)] border border-[rgba(232,242,246,0.07)] overflow-hidden flex flex-col">
              <img src={src} alt="Glioma case" className="w-full flex-1 object-cover min-h-0" />
              <span className="text-[9px] text-text-muted opacity-50 text-center py-1 shrink-0">Glioma</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

function Card({ card, isOpen, onToggle, index }) {
  return (
    <motion.div
      variants={slideIn}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`glass-card gradient-border rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${isOpen ? 'shadow-[0_0_48px_rgba(231,30,34,0.1)]' : ''}`}
      onClick={onToggle}
    >
      <div className="p-7 flex items-start gap-4">
        <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[rgba(231,30,34,0.12)] text-cta' : 'bg-surface/60 text-theme'}`}>
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-theme mb-0.5">{card.title}</h3>
          <p className="text-sm text-text-muted">{card.summary}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 flex items-center justify-center text-text-muted"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7">
              <div className="border-t border-[rgba(232,242,246,0.06)] pt-5">
                <p className="text-sm text-text-muted leading-relaxed mb-1">{card.expanded}</p>
                {card.visual}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HowItWorks() {
  const [openId, setOpenId] = useState('gradcam')

  return (
    <section id="how-it-works" className="relative bg-bg py-28 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              The tech
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
            Three Layers of{' '}
            <span className="text-cta">Explanation</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-lg max-w-lg mx-auto"
          >
            Every diagnosis comes with evidence. Click each layer to learn how.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {cards.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              index={i}
              isOpen={openId === card.id}
              onToggle={() => setOpenId(openId === card.id ? null : card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
