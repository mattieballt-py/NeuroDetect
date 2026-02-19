import { motion } from 'framer-motion'

const links = {
  Project: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'The Solution', href: '#solution' },
    { label: 'Live Demo', href: '#demo' },
    { label: 'Impact', href: '#impact' },
  ],
  Team: [
    { label: 'About', href: '#team' },
    { label: 'Imperial College', href: 'https://imperial.ac.uk', external: true },
  ],
  Resources: [
    { label: 'GitHub', href: '#', external: true },
    { label: 'Contact', href: 'mailto:neurodetect@imperial.ac.uk' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#080C0E] border-t border-[rgba(232,242,246,0.06)]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cta/20 to-transparent" />

      <div className="max-w-content mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand column */}
          <div>
            <a href="#" className="inline-flex mb-5">
              <div className="bg-nav rounded-lg px-3 py-2">
                <img
                  src="/Logo.svg"
                  alt="NeuroDetect"
                  className="h-6 w-auto"
                />
              </div>
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-[260px]">
              Explainable AI for brain tumour detection. Built by engineers, designed for clinicians.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="mailto:neurodetect@imperial.ac.uk"
                className="text-xs text-text-muted hover:text-theme transition-colors border border-[rgba(232,242,246,0.1)] rounded-full px-4 py-1.5 hover:border-[rgba(232,242,246,0.2)]"
              >
                Contact us
              </a>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="text-xs font-semibold bg-cta text-white rounded-full px-4 py-1.5 hover:bg-cta-hover transition-colors"
              >
                Try Demo
              </motion.a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-theme mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-text-muted hover:text-theme transition-colors duration-150 inline-flex items-center gap-1"
                    >
                      {label}
                      {external && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
                          <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(232,242,246,0.06)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted opacity-50">
            © {new Date().getFullYear()} NeuroDetect — Imperial College London. Academic project.
          </p>
          <p className="text-xs text-text-muted opacity-40 text-center sm:text-right max-w-xs">
            Not a medical device. Results should always be reviewed by a qualified clinician.
          </p>
        </div>
      </div>
    </footer>
  )
}
