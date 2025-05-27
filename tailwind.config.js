/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',

    './node_modules/shadcn-vue/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};
