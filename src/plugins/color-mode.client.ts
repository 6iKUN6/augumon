export default defineNuxtPlugin(() => {
  // 确保在客户端正确应用主题类
  if (import.meta.client) {
    const colorMode = useColorMode();

    // 监听主题变化并确保正确应用类
    watch(
      () => colorMode.value,
      (newMode: string) => {
        const html = document.documentElement;
        const body = document.body;

        // 移除所有可能的主题类
        html.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');

        // 应用新的主题类到 html 元素（这是 Tailwind 期望的）
        html.classList.add(newMode);

        // 强制刷新样式
        html.style.colorScheme = newMode;

        console.log('主题已切换到:', newMode, '应用到 html 元素');

        // 触发重新渲染以确保所有组件获取新的主题
        nextTick(() => {
          document.dispatchEvent(new Event('theme-changed'));
        });
      },
      { immediate: true }
    );
  }
});
