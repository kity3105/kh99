import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        'stars': 'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.35) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.25) 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.2) 50%, transparent 51%), linear-gradient(180deg, #0b0b1a 0%, #0a0a16 35%, #070713 70%, #050510 100%)'
      }
    }
  },
  plugins: []
} satisfies Config
