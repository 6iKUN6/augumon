export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const colorMode = useColorMode();

    // 调试函数：检查当前主题状态
    const debugTheme = () => {
      const html = document.documentElement;
      const body = document.body;

      console.group('🎨 主题调试信息');
      console.log('当前主题模式:', colorMode.value);
      console.log('HTML classes:', html.className);
      console.log('Body classes:', body.className);

      // 检查 CSS 变量
      const computedStyle = getComputedStyle(html);
      const cssVars = {
        '--background': computedStyle.getPropertyValue('--background'),
        '--foreground': computedStyle.getPropertyValue('--foreground'),
        '--card': computedStyle.getPropertyValue('--card'),
        '--sidebar-background': computedStyle.getPropertyValue('--sidebar-background'),
        '--sidebar-foreground': computedStyle.getPropertyValue('--sidebar-foreground'),
      };
      console.log('CSS 变量值:', cssVars);

      // 检查 Tailwind 颜色类
      const testDiv = document.createElement('div');
      testDiv.className = 'bg-background text-foreground bg-sidebar text-sidebar-foreground';
      testDiv.style.position = 'absolute';
      testDiv.style.top = '-9999px';
      document.body.appendChild(testDiv);

      const testStyle = getComputedStyle(testDiv);
      console.log('Tailwind 类解析结果:', {
        'bg-background': testStyle.backgroundColor,
        'text-foreground': testStyle.color,
      });

      document.body.removeChild(testDiv);
      console.groupEnd();
    };

    // 初始调试
    nextTick(debugTheme);

    // 监听主题变化
    watch(
      () => colorMode.value,
      () => {
        nextTick(debugTheme);
      }
    );

    // 添加全局调试方法
    (window as any).debugTheme = debugTheme;
    console.log('💡 提示：在控制台运行 debugTheme() 来调试主题状态');
  }
});
