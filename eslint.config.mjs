// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default withNuxt([
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/require-default-prop': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
  {
    ignores: ['pnpm-lock.yaml', '**/.nuxt', '**/dist', '**/node_modules'],
  },
  prettierConfig,
  // Prettier规则集成
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 'prettier/prettier': 'error',
    },
  },
]);
