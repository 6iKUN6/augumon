import { defineStore } from 'pinia';

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

    // 初始化主题监听器和 DOM 操作
    function initTheme() {
      if (!import.meta.client) return;

      // 立即应用当前主题到DOM
      document.documentElement.classList.toggle('dark', isDark.value);

      // 监听主题变化并应用到 document.documentElement
      watch(
        () => isDark.value,
        (isDarkValue) => {
          document.documentElement.classList.toggle('dark', isDarkValue);
          console.log('主题已切换到:', isDarkValue ? 'dark' : 'light');
        }
      );

      // 为了测试方便，在 window 上注册切换主题的方法
      (window as any)._changeTheme = () => toggleTheme();

      console.log('主题初始化完成，当前主题:', isDark.value ? 'dark' : 'light');
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
      initTheme,
    };
  },
  {
    persist: true,
  }
);
