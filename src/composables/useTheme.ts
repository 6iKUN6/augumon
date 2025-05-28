import { ref } from 'vue';

export function useTheme() {
  const isDark = ref(true); // 默认使用暗色主题

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggleTheme,
  };
}
