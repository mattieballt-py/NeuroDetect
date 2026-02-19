/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        surface: '#29373F',
        nav: '#E8F2F6',
        theme: '#E8F2F6',
        cta: '#E71E22',
        'cta-hover': '#C41519',
        'text-primary': '#E8F2F6',
        'text-muted': '#8FA3AC',
        'border-subtle': 'rgba(232,242,246,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
