// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  app: {},
  vite: {
    plugins: [],
  },
  // css: ['@arco-design/web-vue/dist/arco.css'],
  css: [],
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'motion-v/nuxt',
  ],
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: [`~/assets/css/tailwind.css`, { injectPosition: 'first' }],
    exposeConfig: true,
    viewer: false,
  },
  eslint: {
    config: {
      // ESM 项目可能需要显式声明
      // useEslintrc: true,
    },
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
  shadcn: {
    prefix: '',
    componentDir: 'src/components/ui',
  },
  // 解决中间件冲突的配置
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    // 明确处理路由规则
    routeRules: {
      '/': {
        headers: { 'cache-control': 'max-age=31536000' },
        redirect: '/home',
      },
    },
  },
  colorMode: {
    preference: 'dark', // 默认主题
    fallback: 'light', // 回退主题
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
});
