import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

const photoItem = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const IconAI = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 1.5v2.5M9 14v2.5M1.5 9H4M14 9h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.6 3.6l1.8 1.8M12.6 12.6l1.8 1.8M14.4 3.6l-1.8 1.8M5.4 12.6l-1.8 1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M9 3C7 5.5 5.5 7.5 5.5 10a3.5 3.5 0 007 0c0-1.8-.9-3.3-1.9-4.8-.3 1.3-1.1 2.2-2.2 2.5C9.2 6.3 8.9 4.3 9 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 13.5c.8 1 1.5 1.5 2.5 1.5s1.7-.5 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconGear = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.42 1.42M13.53 13.53l1.42 1.42M14.95 3.05l-1.42 1.42M4.47 13.53l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const expertise = [
  { icon: <IconAI />, label: 'Machine Learning & AI' },
  { icon: <IconBrain />, label: 'Medical Imaging' },
  { icon: <IconGear />, label: 'Engineering & Data Science' },
]

const members = [
  {
    name: 'Mattie Ball',
    degree: 'Mechanical Engineering',
    photo: '/team/Mattie.jpg',
  },
  {
    name: 'Jeremy Tan',
    degree: 'Mechanical Engineering',
    photo: '/team/Jeremy.jpg',
  },
  {
    name: 'Nana',
    degree: 'Mechanical Engineering',
    photo: '/team/PHOTO-2026-02-19-13-46-26.jpg',
  },
  {
    name: 'Team Member',
    degree: 'Mechanical Engineering',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
  },
  {
    name: 'Team Member',
    degree: 'Mechanical Engineering',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format',
  },
  {
    name: 'Team Member',
    degree: 'Mechanical Engineering',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face&auto=format',
  },
  {
    name: 'Team Member',
    degree: 'Mechanical Engineering',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format',
  },
]

export default function Team() {
  return (
    <section
      id="team"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f1c22 60%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,55,63,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">

        {/* Text content — centred, constrained to max-w-2xl */}
        <div className="max-w-2xl mx-auto text-center">
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

          {/* Imperial badge */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-10"
          >
            <div className="rounded-xl border border-[rgba(232,242,246,0.1)] bg-surface/20 px-8 py-5 flex items-center justify-center">
              <img src="/imperial.svg" alt="Imperial College London" className="h-8 w-auto opacity-85" />
            </div>
          </motion.div>

          {/* Expertise pills */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {expertise.map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[rgba(232,242,246,0.1)] bg-surface/30 text-sm text-text-muted"
              >
                <span className="text-theme">{icon}</span>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Photo grid — wider container, 2 → 3 → 4 columns across breakpoints */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-wrap justify-center gap-5 mb-12 max-w-4xl mx-auto"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={photoItem}
              className="w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex flex-col items-center gap-3"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[rgba(232,242,246,0.08)]">
                <img
                  src={member.photo}
                  alt={member.role}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-theme leading-tight">{member.name}</div>
                <div className="text-xs text-text-muted mt-0.5">{member.degree}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
