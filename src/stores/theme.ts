import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThemeStore = defineStore(
  'theme',
  () => {
    // State
    const isDark = ref(true); // 默认使用暗色主题

    // Getters
    const currentTheme = computed(() => (isDark.value ? 'dark' : 'light'));

    // Actions
    function toggleTheme() {
      isDark.value = !isDark.value;
    }

    function setTheme(dark: boolean) {
      isDark.value = dark;
    }

    function setLightTheme() {
      isDark.value = false;
    }

    function setDarkTheme() {
      isDark.value = true;
    }

    return {
      // State
      isDark,
      // Getters
      currentTheme,
      // Actions
      toggleTheme,
      setTheme,
      setLightTheme,
      setDarkTheme,
    };
  },
  {
    persist: true, // 使用 pinia-plugin-persistedstate 进行持久化
  }
);
