import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    // 常用布局
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    ["flex-col-center", "flex flex-col items-center justify-center"],

    // 卡片样式
    [
      "card-base",
      "bg-[var(--color-bg-2)] rounded-lg shadow-sm overflow-hidden",
    ],
    [
      "card-hover",
      "transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md",
    ],

    // 按钮样式
    [
      "btn-text",
      "text-[var(--color-text-2)] hover:text-[var(--color-primary)] transition-colors duration-300",
    ],

    // 文本样式
    ["text-title", "text-[var(--color-text-1)] font-bold"],
    ["text-subtitle", "text-[var(--color-text-2)]"],
    ["text-desc", "text-[var(--color-text-3)] text-sm"],

    // 输入框样式
    [
      "input-base",
      "border border-[var(--color-border)] rounded p-2 focus:border-[var(--color-primary)] outline-none transition-colors duration-300",
    ],
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "var(--color-primary)",
        light: "var(--color-primary-light-1)",
        dark: "var(--color-primary-dark-1)",
      },
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      danger: "var(--color-danger)",
      info: "var(--color-info)",
      bg: {
        1: "var(--color-bg-1)",
        2: "var(--color-bg-2)",
        3: "var(--color-bg-3)",
      },
      text: {
        1: "var(--color-text-1)",
        2: "var(--color-text-2)",
        3: "var(--color-text-3)",
      },
      border: "var(--color-border)",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "32px",
      "5xl": "42px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    boxShadow: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.08)",
      md: "0 4px 12px rgba(0, 0, 0, 0.12)",
      lg: "0 8px 16px rgba(0, 0, 0, 0.15)",
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Roboto",
        serif: "Noto Serif",
        mono: "Fira Code",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
