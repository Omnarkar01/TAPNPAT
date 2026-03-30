/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'soft-mcm-dark': '#3A3A3A',
        'soft-mcm-light': '#FFFFFF',
        'soft-mcm-sage': '#10B981',
        'soft-mcm-sage-dark': '#059669',
        'soft-mcm-sage-deep': '#047857',
        'soft-mcm-rose': '#F97316',
        'soft-mcm-rose-dark': '#EA580C',
        'soft-mcm-rose-deep': '#C2410C',
        'soft-mcm-taupe': '#E5E7EB',
        'soft-mcm-gray': '#9CA3AF',
      },
    },
  },
  plugins: [],
};
