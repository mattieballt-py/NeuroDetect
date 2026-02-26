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
  { name: 'Mattie Ball',        degree: 'Mechanical Engineering', photo: '/team/Mattie%20Ball.jpg' },
  { name: 'Jeremy Tan',             degree: 'Electrical and Electronic Engineering', photo: '/team/Jeremy.jpg' },
  { name: 'Nana Vanichayangkuranont',               degree: 'Biomedical Engineering', photo: '/team/Nana%20.jpg' },
  { name: 'Prithvi Philip',     degree: 'Mechanical Engineering', photo: '/team/Prithvi%20Philip.jpg' },
  { name: 'Aasiyah Alloo',      degree: 'Mechanical Engineering', photo: '/team/aasiyah%20alloo.jpg' },
  { name: 'Joshua Tianle Meng', degree: 'Aerospace Engineering', photo: '/team/joshua%20tianle%20meng.jpg' },
  { name: 'Will Punter',               degree: 'Computer Science', photo: '/team/will.jpg' },
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
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            <span>Built at</span>
            <img src="/imperial.svg" alt="Imperial College London" className="h-8 md:h-10 w-auto opacity-90 inline-block" />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-base leading-relaxed mb-10"
          >
            A multidisciplinary team of Engineering students combining what we learnt from the Demystifying ML course with a genuine desire to improve diagnostic outcomes, and save lives.
          </motion.p>

          
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
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-surface/30 flex items-center justify-center">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="opacity-15">
                      <circle cx="26" cy="19" r="11" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 48c0-12 10-20 22-20s22 8 22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
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
