import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
}

const links = {
  Project: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'The Solution', href: '#solution' },
    { label: 'Clinical Impact', href: '#impact' },
    { label: 'The Team', href: '#team' },
  ],
  'Beta & Research': [
    { label: 'Request Beta Access', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'GitHub', href: '#', external: true },
  ],
  Institution: [
    { label: 'Imperial College London', href: 'https://imperial.ac.uk', external: true },
    { label: 'Department of Mechanical Engineering', href: 'https://imperial.ac.uk/mechanical-engineering', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#06090B] border-t border-[rgba(232,242,246,0.06)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cta/20 to-transparent" />

      <div className="max-w-content mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* Main grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp}>
            <a href="#" className="inline-flex items-center gap-2.5 mb-5">
              <div className="bg-nav rounded-lg px-3 py-2 flex items-center gap-2">
                <img src="/Logo.svg" alt="" aria-hidden="true" className="h-6 w-auto" />
                <span className="font-heading font-bold text-lg text-[#0D0D0D] tracking-tight leading-none">
                  NeuroDetect
                </span>
              </div>
            </a>

            <p className="text-sm text-text-muted leading-relaxed max-w-[260px] mb-6">
              Explainable AI for brain tumour detection. Built by engineers, designed for clinicians.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:mb1223@ic.ac.uk"
                className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-theme transition-colors duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-60">
                  <rect x="1" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M1 4.5l5.5 3.5 5.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                mb1223@ic.ac.uk
              </a>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block mt-5 text-xs font-semibold bg-cta text-white rounded-full px-5 py-2 hover:bg-cta-hover transition-colors"
            >
              Request Beta Access
            </motion.a>
          </motion.div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <motion.div key={heading} variants={fadeUp}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-theme/60 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-text-muted hover:text-theme transition-colors duration-150 inline-flex items-center gap-1.5"
                    >
                      {label}
                      {external && (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="opacity-35 shrink-0">
                          <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[rgba(232,242,246,0.06)] mb-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Left: copyright + disclaimer */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-text-muted opacity-50">
              © {new Date().getFullYear()} NeuroDetect — Imperial College London. ME4 Design Project.
            </p>
            <p className="text-xs text-text-muted opacity-35 max-w-sm leading-relaxed">
              Not a certified medical device. All outputs must be reviewed by a qualified clinician before acting on them.
            </p>
          </div>

          {/* Right: Imperial College branding */}
          <a
            href="https://imperial.ac.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-3 opacity-40 hover:opacity-70 transition-opacity duration-200"
            aria-label="Imperial College London"
          >
            <div className="h-px w-10 bg-[rgba(232,242,246,0.2)]" />
            <img src="/imperial.svg" alt="Imperial College London" className="h-6 w-auto" />
          </a>
        </motion.div>

      </div>
    </footer>
  )
}
