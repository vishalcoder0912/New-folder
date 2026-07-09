/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        brand: '#2563eb',
        accent: '#0f766e',
        warm: '#f59e0b'
      },
      boxShadow: {
        soft: '0 12px 40px rgba(17, 24, 39, 0.08)'
      }
    }
  },
  plugins: []
};
