import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

// Headline lines stagger independently
const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22 } },
}

const headlineLine = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'Delayed Diagnosis',
    detail: 'Average wait from GP referral to neurology scan: over 8 weeks.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.48 4 4 8.48 4 14s4.48 10 10 10 10-4.48 10-10S19.52 4 14 4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 14h8M14 10v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'Overworked Staff',
    detail: '30% fewer radiologists than the NHS needs — and the gap is growing.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8.5 5 13c0 3.5 2 6.5 5 8h8c3-1.5 5-4.5 5-8 0-4.5-4-9-9-9z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 16s1-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="13" r="1" fill="currentColor" />
        <circle cx="17" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
    label: 'Lives at Risk',
    detail: 'Brain tumour survival rates drop sharply with every week of delay.',
  },
]

export default function Stakes() {
  return (
    <section
      id="stakes"
      className="relative bg-bg py-28 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(41,55,63,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">

        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
            The problem
          </span>
        </motion.div>

        {/* Headline — two lines stagger in sequence */}
        <motion.h2
          variants={headlineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-3xl md:text-5xl font-black text-theme text-center leading-tight mb-5 tracking-tight max-w-2xl mx-auto"
        >
          <motion.span variants={headlineLine} className="block">
            Early detection saves lives.
          </motion.span>
          <motion.span
            variants={headlineLine}
            className="block text-text-muted font-semibold text-2xl md:text-3xl mt-2"
          >
            But radiologists are drowning in scans.
          </motion.span>
        </motion.h2>

        {/* Stat cards — stagger left to right */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 mb-16"
        >
          {stats.map(({ icon, label, detail }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 36, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card gradient-border rounded-2xl p-7 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-surface/60 flex items-center justify-center text-theme">
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-theme mb-1">{label}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pull quote — scales in after cards, feels like a conclusion */}
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-[rgba(231,30,34,0.2)] bg-[rgba(231,30,34,0.05)] px-8 py-7"
          >
            <p className="text-xl md:text-2xl font-semibold text-theme leading-relaxed mb-3">
              Current AI models are{' '}
              <span className="text-cta font-black italic">"black boxes"</span>
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              They give answers without showing their work. In healthcare,
              that's not good enough. Doctors need to see{' '}
              <span className="text-theme font-medium">WHY</span> the AI made its decision.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
