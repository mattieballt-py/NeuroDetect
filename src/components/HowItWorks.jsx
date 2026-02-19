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

const cards = [
  {
    id: 'gradcam',
    icon: '🔥',
    title: 'Heatmap Highlighting',
    summary: 'See what the AI is looking at',
    expanded:
      'The AI highlights the exact regions of the scan that led to its decision — like a doctor circling areas of concern on an X-ray. Brighter regions indicate stronger influence on the result.',
    visual: (
      <div className="mt-5 rounded-xl overflow-hidden border border-[rgba(232,242,246,0.08)] grid grid-cols-2 gap-1 bg-[#111]">
        <div className="aspect-square relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2a30, #0d1a20)' }}>
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="opacity-60">
            <ellipse cx="30" cy="35" rx="25" ry="30" stroke="rgba(232,242,246,0.3)" strokeWidth="1.5" />
            <ellipse cx="30" cy="35" rx="15" ry="20" stroke="rgba(232,242,246,0.2)" strokeWidth="1" />
            <circle cx="30" cy="35" r="5" fill="rgba(232,242,246,0.1)" />
          </svg>
          <span className="absolute bottom-2 left-2 text-[9px] text-text-muted opacity-50">Original</span>
        </div>
        <div className="aspect-square relative flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(231,30,34,0.5) 0%, rgba(255,120,30,0.25) 30%, rgba(30,100,150,0.1) 60%, #0d1a20 100%)' }}>
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="opacity-60">
            <ellipse cx="30" cy="35" rx="25" ry="30" stroke="rgba(232,242,246,0.2)" strokeWidth="1.5" />
            <circle cx="36" cy="28" r="10" fill="rgba(231,30,34,0.3)" stroke="rgba(231,30,34,0.5)" strokeWidth="1" />
            <circle cx="36" cy="28" r="5" fill="rgba(231,30,34,0.5)" />
          </svg>
          <span className="absolute bottom-2 left-2 text-[9px] text-cta opacity-70">AI heatmap</span>
        </div>
      </div>
    ),
  },
  {
    id: 'occlusion',
    icon: '✓',
    title: 'Occlusion Verification',
    summary: "Double-check the AI's reasoning",
    expanded:
      "We hide the highlighted region and re-run the analysis. If the AI's confidence drops significantly, we know it was looking at the right place — not just pattern-matching on noise.",
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
          ↓ 61% confidence drop confirms region was critical to the diagnosis
        </p>
      </div>
    ),
  },
  {
    id: 'similar',
    icon: '📊',
    title: 'Similar Case Retrieval',
    summary: 'Learn from past examples',
    expanded:
      'The system surfaces similar verified scans from its database — giving clinicians visual precedent. If this scan looks like four other confirmed cases, confidence in the result increases.',
    visual: (
      <div className="mt-5">
        <div className="text-xs text-text-muted mb-3 font-medium">Top 3 similar verified cases:</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { match: '96% match', label: 'Confirmed' },
            { match: '91% match', label: 'Confirmed' },
            { match: '88% match', label: 'Confirmed' },
          ].map(({ match, label }) => (
            <div key={match} className="aspect-square rounded-lg bg-[rgba(41,55,63,0.5)] border border-[rgba(232,242,246,0.07)] flex flex-col items-center justify-center gap-1 p-2">
              <div style={{ background: 'radial-gradient(ellipse at 55% 45%, rgba(231,30,34,0.3) 0%, rgba(41,55,63,0.4) 60%)' }} className="w-full h-2/3 rounded-md" />
              <span className="text-[9px] text-[#4ade80] font-semibold">{match}</span>
              <span className="text-[9px] text-text-muted opacity-50">{label}</span>
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
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`glass-card gradient-border rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${isOpen ? 'shadow-[0_0_48px_rgba(231,30,34,0.1)]' : ''}`}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="p-7 flex items-start gap-4">
        <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-colors duration-300 ${isOpen ? 'bg-[rgba(231,30,34,0.12)]' : 'bg-surface/60'}`}>
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

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7">
              <div className="pt-0 border-t border-[rgba(232,242,246,0.06)] pt-5">
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
        {/* Header */}
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

        {/* Cards — full width stacked for desktop readability, matching Nexux's expandable pattern */}
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
