import type { Config } from 'tailwindcss';

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'text-light': 'var(--text-light)',
        'primary-light': 'var(--primary-light)',
        'secondary-light': 'var(--secondary-light)',
        'accent-light': 'var(--accent-light)',
        'neutral-light': 'var(--neutral-light)',
        'background-light': 'var(--background-light)',

        'text-dark': 'var(--text-dark)',
        'primary-dark': 'var(--primary-dark)',
        'secondary-dark': 'var(--secondary-dark)',
        'accent-dark': 'var(--accent-dark)',
        'neutral-dark': 'var(--neutral-dark)',
        'background-dark': 'var(--background-dark)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
