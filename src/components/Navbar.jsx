import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Solution', href: '#solution' },
  { label: 'Impact', href: '#impact' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  // false = over the hero (transparent), true = past the hero (solid)
  const [pastHero, setPastHero] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const stakes = document.getElementById('stakes')
      if (stakes) {
        // Switch to solid once the #stakes section's top crosses the navbar height (64px)
        setPastHero(stakes.getBoundingClientRect().top <= 64)
      }
    }

    // Check on mount (handles page reload mid-scroll)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: pastHero ? 'rgba(232,242,246,0.97)' : 'transparent',
        backdropFilter: pastHero ? 'blur(12px)' : 'none',
        boxShadow: pastHero
          ? '0 1px 0 rgba(0,0,0,0.1), 0 4px 24px rgba(0,0,0,0.08)'
          : 'none',
        transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <div className="px-6 md:px-8 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={pastHero ? 'logo-dark' : 'logo-light'}
                src={pastHero ? '/Logo.svg' : '/logowhitebg.svg'}
                alt=""
                aria-hidden="true"
                className="h-8 w-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <span
              className="font-heading font-bold text-xl tracking-tight leading-none transition-colors duration-300"
              style={{ color: pastHero ? '#0D0D0D' : '#E8F2F6' }}
            >
              NeuroDetect
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                style={{
                  color: pastHero ? '#1a2a30' : '#E8F2F6',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = pastHero ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = pastHero ? '#0D0D0D' : '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = pastHero ? '#1a2a30' : '#E8F2F6'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="font-sans px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300"
              style={{
                backgroundColor: pastHero ? '#E71E22' : '#ffffff',
                color: pastHero ? '#ffffff' : '#0D0D0D',
                boxShadow: pastHero
                  ? '0 0 0 0 rgba(231,30,34,0)'
                  : '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              Request Beta →
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-300"
            style={{ color: pastHero ? '#1a2a30' : '#E8F2F6' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = pastHero ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t"
            style={{
              borderColor: pastHero ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
              backgroundColor: pastHero ? '#E8F2F6' : 'rgba(13,13,13,0.85)',
              backdropFilter: pastHero ? 'none' : 'blur(16px)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{ color: pastHero ? '#1a2a30' : '#E8F2F6' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="font-sans mt-2 px-5 py-3 text-sm font-semibold rounded-full text-center transition-colors duration-300"
                style={{
                  backgroundColor: pastHero ? '#E71E22' : '#ffffff',
                  color: pastHero ? '#ffffff' : '#0D0D0D',
                }}
              >
                Request Beta →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
