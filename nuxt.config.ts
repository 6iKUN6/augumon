// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  app: {},
  vite: {
    plugins: [],
  },
  css: ['@arco-design/web-vue/dist/arco.css', '~/assets/css/tailwind.css'],
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    exposeConfig: true,
    injectPosition: 'first',
    viewer: false,
  },
  eslint: {
    config: {
      // ESM 项目可能需要显式声明
      useEslintrc: true,
    },
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./src/components/ui"
     */
    componentDir: './src/components/ui',
  },
});
