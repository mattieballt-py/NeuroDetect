import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
}

// Submit form to Formspree — sign up at https://formspree.io, create a form
// for mb1223@ic.ac.uk, then replace REPLACE_WITH_FORM_ID with your form ID.
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'

const roles = [
  'Radiologist',
  'Clinician / Physician',
  'Medical Researcher',
  'Hospital Administrator',
  'Engineer / Developer',
  'Student',
  'Other',
]

const inputCls =
  'w-full rounded-xl border border-[rgba(232,242,246,0.1)] bg-surface/20 px-4 py-3 text-sm text-theme placeholder:text-text-muted/50 focus:outline-none focus:border-[rgba(232,242,246,0.3)] focus:bg-surface/30 transition-all duration-200'

export default function Contact() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus('success')
        setFields({ name: '', email: '', institution: '', role: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f1a20 60%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(231,30,34,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-content mx-auto relative">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-5"
            >
              Request{' '}
              <span className="text-cta">Beta Access</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="text-text-muted text-base leading-relaxed"
            >
              Interested in trialling NeuroDetect at your institution? We are working with a small number of clinical partners for our initial beta. Tell us about your setting and we will be in touch.
            </motion.p>
          </div>

          {/* Form card */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-[rgba(232,242,246,0.08)] bg-[rgba(41,55,63,0.2)] p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-5 py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-[rgba(74,222,128,0.12)] border border-[rgba(74,222,128,0.25)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12l5 5L20 7" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-theme mb-2">Message received</h3>
                    <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                      Thank you for your interest. We will review your submission and get back to you at the email provided.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs text-text-muted hover:text-theme transition-colors border border-[rgba(232,242,246,0.1)] rounded-full px-5 py-2 hover:border-[rgba(232,242,246,0.2)]"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Full Name <span className="text-cta">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Dr. Jane Smith"
                        value={fields.name}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Email Address <span className="text-cta">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@hospital.nhs.uk"
                        value={fields.email}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Institution
                      </label>
                      <input
                        type="text"
                        name="institution"
                        placeholder="NHS Trust / University"
                        value={fields.institution}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Your Role
                      </label>
                      <select
                        name="role"
                        value={fields.role}
                        onChange={handleChange}
                        className={`${inputCls} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select your role…</option>
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Message <span className="text-cta">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your clinical setting and how NeuroDetect might help…"
                      value={fields.message}
                      onChange={handleChange}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-cta bg-[rgba(231,30,34,0.08)] border border-cta/20 rounded-lg px-4 py-3">
                      Something went wrong. Please try again or email{' '}
                      <a href="mailto:mb1223@ic.ac.uk" className="underline">mb1223@ic.ac.uk</a> directly.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-text-muted opacity-60 leading-relaxed max-w-xs">
                      Your details are only used to follow up on your request. No marketing.
                    </p>
                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileHover={{ scale: status === 'submitting' ? 1 : 1.03 }}
                      whileTap={{ scale: status === 'submitting' ? 1 : 0.97 }}
                      className="shrink-0 px-7 py-3 rounded-full bg-cta text-white text-sm font-semibold glow-cta hover:glow-cta-hover hover:bg-cta-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send Message →'}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center text-xs text-text-muted mt-6 opacity-60"
          >
            Or email directly:{' '}
            <a href="mailto:mb1223@ic.ac.uk" className="hover:text-theme transition-colors underline underline-offset-2">
              mb1223@ic.ac.uk
            </a>
          </motion.p>

        </div>
      </div>
    </section>
  )
}
