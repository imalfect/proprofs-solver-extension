/** @type {import('tailwindcss').Config} */
import {radixThemePreset} from 'radix-themes-tw';
export default {
  content: ['./src/**/*.{html,js}', './src/components/**/*.tsx'],
  theme: {
    fontFamily: {
      'sans': ['SF Pro Rounded', 'sans-serif'],
      'serif': ['SF Pro Rounded', 'serif'],
      'display': ['SF Pro Rounded', 'sans-serif'],
    },
    fontSize: {
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {},
  },
  presets: [radixThemePreset],
  plugins: [],
};

