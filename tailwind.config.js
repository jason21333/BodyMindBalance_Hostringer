/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-source-code)'],
      },
    },
  },
  plugins: [],
}