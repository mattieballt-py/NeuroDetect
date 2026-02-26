// Jet colormap scale matching standard Grad-CAM output: blue -> cyan -> green -> yellow -> orange -> red
// Transparent background -- safe on any dark surface

import { useState } from 'react'

let _count = 0

export default function GradCAMScale({ className = '' }) {
  const [gid] = useState(() => `gcam-${++_count}`)

  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 260 30" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00007F" />
            <stop offset="11%"  stopColor="#0000FF" />
            <stop offset="37%"  stopColor="#00FFFF" />
            <stop offset="62%"  stopColor="#FFFF00" />
            <stop offset="88%"  stopColor="#FF0000" />
            <stop offset="100%" stopColor="#7F0000" />
          </linearGradient>
        </defs>

        {/* Gradient bar */}
        <rect x="0" y="0" width="260" height="11" rx="2.5" fill={`url(#${gid})`} opacity="0.88" />
        {/* Subtle border */}
        <rect x="0" y="0" width="260" height="11" rx="2.5" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />

        {/* Tick marks at 0.2, 0.4, 0.6, 0.8 */}
        {[0.2, 0.4, 0.6, 0.8].map(v => (
          <line
            key={v}
            x1={v * 260} y1="12"
            x2={v * 260} y2="16"
            stroke="rgba(232,242,246,0.22)"
            strokeWidth="0.8"
          />
        ))}

        {/* Labels */}
        <text x="0"   y="26" fontSize="7" fill="rgba(143,163,172,0.45)" textAnchor="start" fontFamily="ui-monospace,monospace">Low</text>
        {[0.2, 0.4, 0.6, 0.8].map(v => (
          <text key={v} x={v * 260} y="26" fontSize="7" fill="rgba(143,163,172,0.32)" textAnchor="middle" fontFamily="ui-monospace,monospace">{v}</text>
        ))}
        <text x="260" y="26" fontSize="7" fill="rgba(143,163,172,0.45)" textAnchor="end" fontFamily="ui-monospace,monospace">High</text>
      </svg>
      <p style={{ fontSize: 8, color: 'rgba(143,163,172,0.28)', textAlign: 'center', marginTop: 1, fontFamily: 'ui-monospace,monospace' }}>
        Grad-CAM activation
      </p>
    </div>
  )
}
