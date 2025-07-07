<template>
  <div class="relative">
    <Button
      ref="toggleButton"
      variant="ghost"
      size="sm"
      class="p-2 relative z-10 hover:bg-muted/50 transition-colors duration-200"
      :aria-label="colorMode.value === 'dark' ? '切换到亮色主题' : '切换到暗色主题'"
      @click="handleToggle"
    >
      <Transition name="icon-rotate" mode="out-in">
        <Sun v-if="colorMode.value === 'light'" key="sun" class="h-4 w-4" />
        <Moon v-else key="moon" class="h-4 w-4" />
      </Transition>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-vue-next';

const colorMode = useColorMode();
const toggleButton = ref<HTMLElement>();

const handleToggle = async (event: MouseEvent) => {
  console.info('主题切换开始');
  console.info('View Transitions API 支持:', 'startViewTransition' in document);

  // 判断浏览器是否兼容 View Transitions API
  if (!('startViewTransition' in document)) {
    console.warn('浏览器不支持 View Transitions API，使用普通切换');
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  console.log('动画参数:', { x, y, endRadius });
  console.log('切换前主题状态:', colorMode.value);

  // 使用 View Transitions API
  const transition = document.startViewTransition!(() => {
    console.log('View Transition 回调执行');

    // 切换主题
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';

    console.log('主题切换完成，新的主题状态:', colorMode.value);
  });

  // 等待过渡准备就绪
  transition.ready
    .then(() => {
      console.log('View Transition 准备就绪，创建动画');
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

      console.log('创建扩张动画，clipPath:', clipPath);
      console.log('使用伪元素: ::view-transition-new(root)');

      // 始终对新主题做扩张动画
      const animation = document.documentElement.animate(
        {
          clipPath: clipPath,
        } as any,
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        } as any
      );

      animation.addEventListener('finish', () => {
        console.log('动画完成');
      });
    })
    .catch((error) => {
      console.error('View Transition 错误:', error);
    });
};
</script>

<style scoped>
/* 图标切换动画 */
.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: all 0.3s ease-in-out;
}

.icon-rotate-enter-from {
  transform: rotate(-90deg) scale(0.8);
  opacity: 0;
}

.icon-rotate-leave-to {
  transform: rotate(90deg) scale(0.8);
  opacity: 0;
}

.icon-rotate-enter-to,
.icon-rotate-leave-from {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}

/* 按钮hover效果增强 */
.p-2:hover {
  transform: scale(1.05);
}
</style>

<style>
/* View Transitions API 全局样式 */
:root {
  view-transition-name: root;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

/* 确保动画容器正确 */
::view-transition-group(root) {
  animation-duration: 0s;
}
</style>
