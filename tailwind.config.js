/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
    './node_modules/shadcn-vue/**/*.{js,ts,vue}',
  ],
  // Tailwind v4 简化的暗色模式配置
  darkMode: 'selector',
};
