import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

const expertise = [
  { icon: '🤖', label: 'Machine Learning & AI' },
  { icon: '🧠', label: 'Medical Imaging' },
  { icon: '⚙️', label: 'Engineering & Data Science' },
]

export default function Team() {
  return (
    <section
      id="team"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f1c22 60%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,55,63,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              The Team
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-6"
          >
            Built at{' '}
            <span className="text-cta">Imperial College</span>
            <br />
            London
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-base leading-relaxed mb-10"
          >
            A multidisciplinary team of Mechanical Engineering students combining deep technical expertise with a genuine desire to improve diagnostic outcomes.
          </motion.p>

          {/* Imperial logo placeholder */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-10"
          >
            <div className="rounded-xl border border-[rgba(232,242,246,0.1)] bg-surface/20 px-8 py-4 flex items-center gap-3">
              {/* Replace with actual Imperial logo */}
              <div className="w-8 h-8 rounded-md bg-[rgba(0,53,128,0.4)] border border-[rgba(0,53,128,0.5)] flex items-center justify-center text-[#6699ff] font-black text-xs">IC</div>
              <span className="text-sm font-semibold text-theme">Imperial College London</span>
            </div>
          </motion.div>

          {/* Expertise pills */}
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {expertise.map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[rgba(232,242,246,0.1)] bg-surface/30 text-sm text-text-muted"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Credibility note */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.25)] px-8 py-6"
          >
            <p className="text-sm text-text-muted leading-relaxed">
              This project was developed as part of the{' '}
              <span className="text-theme font-medium">ME4 Design Project</span>{' '}
              at Imperial College London — combining rigorous engineering methodology with real clinical relevance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
