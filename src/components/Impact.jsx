import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
}

const before = [
  'Radiologists review every scan manually',
  'High-risk patients wait in the same queue as routine cases',
  '"Black box" AI offers no explanations',
  'Doctors hesitant to trust AI decisions',
]

const after = [
  'AI pre-screens scans and flags high-risk cases instantly',
  'Urgent cases automatically prioritised in the workflow',
  'Visual explanations build genuine clinical confidence',
  'Radiologists focus their expertise where it matters most',
]

export default function Impact() {
  return (
    <section
      id="impact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f1c22 50%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(41,55,63,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              The Impact
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight"
          >
            Before & After
          </motion.h2>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Before */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(20,10,10,0.6)] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[rgba(200,50,50,0.15)] flex items-center justify-center text-base">✗</div>
              <h3 className="text-lg font-bold text-[#f87171]">Without NeuroDetect</h3>
            </div>
            <ul className="space-y-4">
              {before.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={i * 0.5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-[rgba(248,113,113,0.3)] flex items-center justify-center text-[10px] text-[#f87171]">✗</span>
                  <span className="text-sm text-text-muted leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-[rgba(74,222,128,0.15)] bg-[rgba(10,25,15,0.6)] p-8 shadow-[0_0_48px_rgba(74,222,128,0.04)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[rgba(74,222,128,0.12)] flex items-center justify-center text-base">✓</div>
              <h3 className="text-lg font-bold text-[#4ade80]">With NeuroDetect</h3>
            </div>
            <ul className="space-y-4">
              {after.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={i * 0.5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[rgba(74,222,128,0.12)] border border-[rgba(74,222,128,0.3)] flex items-center justify-center text-[10px] text-[#4ade80]">✓</span>
                  <span className="text-sm text-text-muted leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pull quote */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-2xl mx-auto"
        >
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-surface/40 font-serif leading-none select-none">"</div>
            <p className="text-2xl md:text-3xl font-black text-theme leading-tight pt-4 mb-4">
              Not about replacing radiologists.
              <br />
              <span className="text-cta">About giving them superpowers.</span>
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
