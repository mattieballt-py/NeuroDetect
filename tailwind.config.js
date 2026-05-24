/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F9FB',
        surface: '#E6EDF2',
        nav: '#FFFFFF',
        theme: '#13212B',
        cta: '#E71E22',
        'cta-hover': '#C41519',
        'text-primary': '#13212B',
        'text-muted': '#5F7380',
        'border-subtle': 'rgba(19,33,43,0.10)',
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
        sans: ['Source Sans 3', 'Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
