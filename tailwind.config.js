/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    '!./node_modules/**',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1A531A',
        'forest-dark': '#0F3010',
        'forest-mid': '#2A6B2A',
        bark: '#8B5A2B',
        'bark-light': '#A06830',
        sky: '#87CEEB',
        cream: '#FAF0E6',
        'cream-dark': '#F0E4D4',
        charcoal: '#363636',
      },
      fontFamily: {
        slab: ['Zilla Slab', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
