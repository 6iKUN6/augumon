// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  app: {},
  vite: {
    plugins: [],
  },
  unocss: {
    nuxtLayers: true, //可以启用 nuxtLayers 选项，这样 Nuxt 会自动合并每个 Nuxt 层中的 uno.config 文件
  },
  css: ['@arco-design/web-vue/dist/arco.css'],
  // fonts: {
  //   families: [
  //     {
  //       name: "Roboto",
  //       provider: "google",
  //       weights: [400, 500, 700],
  //     },
  //     {
  //       name: "Open Sans",
  //       provider: "google",
  //       weights: [400, 600, 700],
  //     },
  //   ],
  //   preconnect: ["https://fonts.loli.net"],
  //   display: "swap",
  //   baseURL: "https://fonts.loli.net",
  //   providers: {
  //     google: {
  //       manifestURL: "https://fonts.loli.net/manifest.json",
  //       iconsURL: "https://fonts.loli.net/icons/icons.json",
  //     },
  //   },
  // },
  ui: {
    fonts: false,
  },
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    // "@nuxt/fonts",
    '@nuxt/ui',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  eslint: {
    config: {
      // ESM 项目可能需要显式声明
      useEslintrc: true,
    },
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
});
