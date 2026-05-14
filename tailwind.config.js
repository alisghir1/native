/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F9F7F2',
        'sand-light': '#E1D4C2',
        'sand-medium': '#BEB5A9',
        'taupe': '#A78D78',
        'chocolate': '#291C0E',
        'brown-medium': '#6E473B',
        'gold': '#D4AF37',
        'studio-sand': '#F5F5F0',
        'studio-brown': '#2C1E16',
      },
      fontFamily: {
        'serif': ['Bogart', 'Playfair Display', 'serif'],
        'sans': ['Jost', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
