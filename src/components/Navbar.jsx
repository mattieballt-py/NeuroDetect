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
        backgroundColor: pastHero ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)',
        backdropFilter: pastHero ? 'blur(12px)' : 'none',
        boxShadow: pastHero
          ? '0 1px 0 rgba(19,33,43,0.08), 0 4px 24px rgba(19,33,43,0.06)'
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
                key="logo"
                src="/Logo.svg"
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
              style={{ color: '#13212B' }}
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
                  color: '#13212B',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(19,33,43,0.06)'
                  e.currentTarget.style.color = '#13212B'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#13212B'
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
                color: pastHero ? '#ffffff' : '#13212B',
                boxShadow: pastHero
                  ? '0 0 0 0 rgba(231,30,34,0)'
                  : '0 2px 8px rgba(19,33,43,0.12)',
              }}
            >
              Request Beta →
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-300"
              style={{ color: '#13212B' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(19,33,43,0.06)'
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
              borderColor: 'rgba(19,33,43,0.08)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{ color: '#13212B' }}
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
                  color: pastHero ? '#ffffff' : '#13212B',
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
