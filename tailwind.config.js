/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        procarne: {
          50: '#FDF2F3',
          100: '#FCE7E9',
          200: '#F8D2D6',
          500: '#C22338',
          600: '#A91B2F',
          700: '#8B1425',
          800: '#731321',
          900: '#540D17',
          dark: '#3A080E'
        },
        sgo: {
          navy: '#0F1E36',
          blue: '#1E3A8A',
          gold: '#D97706',
          surface: '#F8FAFC'
        },
        agrotraza: {
          green: '#059669',
          emerald: '#047857'
        }
      }
    },
  },
  plugins: [],
}
