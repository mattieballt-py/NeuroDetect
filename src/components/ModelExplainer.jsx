import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 },
  }),
}

const items = [
  {
    q: 'What is a CNN?',
    a: 'A Convolutional Neural Network (CNN) is a type of artificial intelligence modelled loosely on how the human visual system works. Rather than analysing an image all at once, it processes it through a series of layers, each responsible for extracting increasingly complex information. Early layers detect simple patterns like edges and contrasts; deeper layers combine these into shapes and textures. At the end, a classifier maps the compressed visual information to one of the output categories. The model learns by seeing thousands of labelled MRI scans and making small adjustments each time it gets a prediction wrong.',
  },
  {
    q: 'Image Input',
    a: 'Users upload a brain MRI scan image, which is standardised, resised and normalised, before analysis. This ensures consistent, reliable predictions regardless of the original scan resolution or brightness.',
  },
  {
    q: 'Feature Learning (ResNet-50)',
    a: 'The model passes the image through multiple convolutional blocks to learn important visual patterns: texture, shape, and region-specific abnormalities. NeuroDetect uses ResNet-50, a 50-layer network pretrained on millions of images and fine-tuned specifically on brain MRI data. Its residual connections allow it to learn deeply without losing earlier feature information.',
  },
  {
    q: 'Prediction',
    a: 'Learned features are passed to a final classification layer that outputs a predicted class (Glioma, Meningioma, Pituitary tumour, or No Tumour) and a confidence score. To improve transparency, we display Grad-CAM, showing where in the scan the model was looking, and run occlusion sensitivity testing to confirm that those regions genuinely drove the prediction, not noise.',
  },
]

function Item({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
        isOpen
          ? 'border-[rgba(232,242,246,0.15)] bg-[rgba(41,55,63,0.25)]'
          : 'border-[rgba(232,242,246,0.07)] bg-[rgba(41,55,63,0.1)] hover:border-[rgba(232,242,246,0.12)]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-theme leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 w-5 h-5 flex items-center justify-center text-text-muted"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed border-t border-[rgba(232,242,246,0.06)] pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ModelExplainer() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section
      id="model"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111820 50%, #0D0D0D 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,242,246,0.1)] to-transparent" />

      <div className="max-w-content mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,242,246,0.12)] bg-surface/30 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Behind the Scenes
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-3xl md:text-5xl font-black text-theme tracking-tight leading-tight mb-4"
          >
            Our <span className="text-cta">Model</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-text-muted text-base max-w-2xl mx-auto leading-relaxed"
          >
            Our system uses a{' '}
            <span className="text-theme font-semibold">Convolutional Neural Network (CNN)</span>
            {' '}— specifically a{' '}
            <span className="text-theme font-semibold">fine-tuned ResNet-50</span>
            {' '}— to analyse{' '}
            <span className="text-theme font-semibold">brain MRI scans</span>
            {' '}and predict whether a tumour is present and, if so, which type.
          </motion.p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {items.map((item, i) => (
            <Item
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Clinical disclaimer */}
        <motion.p
          variants={fadeUp}
          custom={items.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="text-center text-xs text-text-muted mt-10 opacity-40 max-w-lg mx-auto leading-relaxed"
        >
          The output is decision support only. Final interpretation and next steps are always made by a qualified radiologist using full clinical context.
        </motion.p>

      </div>
    </section>
  )
}
