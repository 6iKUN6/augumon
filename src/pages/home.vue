<template>
  <div class="w-full">
    <!-- 顶部横幅 -->
    <div class="relative p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-bold mb-2 text-white">重新定义您的<br />创作之旅</h1>
            <p class="text-lg mb-4 text-white/80">遇见 XXXX，您的下一代一站式设计创作平台。</p>
            <Button
              variant="outline"
              class="w-36 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >立即体验</Button
            >
          </div>
          <div class="flex justify-end items-center">
            <div class="relative">
              <div class="absolute -inset-10 opacity-70">
                <div
                  class="w-full h-full bg-gradient-to-br from-red-500 to-pink-600 rounded-full blur-xl"
                ></div>
              </div>
              <img src="" alt="Atomm Logo" class="relative w-32 h-32" />
              <!-- /public/logo.svg -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近打开区域 -->
    <div class="p-6 bg-gradient-to-b from-muted/50 to-background">
      <h2 class="text-xl font-semibold mb-6 text-foreground">最近打开</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        <div
          class="group relative bg-card rounded-xl shadow-lg border border-border/50 aspect-square flex items-center justify-center flex-col cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
        >
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <!-- 边框光效 -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          ></div>

          <div
            class="relative z-10 text-4xl text-muted-foreground group-hover:text-primary mb-3 transition-colors duration-300"
          >
            <Plus />
          </div>
          <p
            class="relative z-10 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          >
            新建项目
          </p>

          <!-- 微妙的内阴影 -->
          <div
            class="absolute inset-1 rounded-lg shadow-inner opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          ></div>
        </div>
        <!-- 这里可以添加更多最近打开的项目 -->
      </div>
    </div>

    <!-- 趋势区域 -->
    <div class="p-6 bg-background">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-foreground">当前热门</h2>
        <Button
          variant="ghost"
          size="sm"
          class="text-sm hover:bg-accent transition-colors duration-200"
        >
          查看更多
          <ChevronRight class="ml-1" />
        </Button>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        <div
          v-for="(item, index) in trendingItems"
          :key="index"
          class="group relative bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
        >
          <!-- 图片容器 -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <!-- 图片遮罩 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- 悬停时的操作按钮 -->
            <div
              class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            >
              <Button
                size="sm"
                variant="secondary"
                class="bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
              >
                <span class="text-xs">查看</span>
              </Button>
            </div>
          </div>

          <!-- 内容区域 -->
          <div class="relative p-4 bg-gradient-to-b from-card to-muted/30">
            <h3
              class="text-sm font-semibold mb-2 text-card-foreground group-hover:text-foreground transition-colors duration-200"
            >
              {{ item.title }}
            </h3>
            <div class="flex items-center text-xs text-muted-foreground">
              <Avatar
                size="sm"
                :fallback="item.avatarText"
                :style="{ backgroundColor: item.avatarColor || '#165DFF' }"
                class="ring-2 ring-background shadow-sm"
              />
              <span class="ml-2 font-medium">{{ item.author }}</span>
            </div>

            <!-- 底部装饰线 -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>

          <!-- 卡片边框光效 -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, ChevronRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

// 趋势项目数据
const trendingItems = ref([
  {
    title: '可爱小鸡彩蛋惊喜礼盒',
    image: 'https://picsum.photos/400/300?random=1',
    author: 'XLaser',
    avatarText: 'X',
    avatarColor: '#1D72FC',
  },
  {
    title: '个性化复活节礼品包装',
    image: 'https://picsum.photos/400/300?random=2',
    author: 'Atomm',
    avatarText: 'A',
    avatarColor: '#F5319D',
  },
  {
    title: '复活节茶蜡烛台',
    image: 'https://picsum.photos/400/300?random=3',
    author: '@flythyme',
    avatarText: 'F',
    avatarColor: '#7BC616',
  },
  {
    title: '金色激光烫金箔',
    image: 'https://picsum.photos/400/300?random=4',
    author: 'Atomm',
    avatarText: 'A',
    avatarColor: '#F5319D',
  },
  {
    title: '母亲节笔筒',
    image: 'https://picsum.photos/400/300?random=5',
    author: 'design-people',
    avatarText: 'D',
    avatarColor: '#00B42A',
  },
]);
</script>

<style scoped>
/* 现代化阴影效果 */
.shadow-lg {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px hsl(var(--border) / 0.1);
}

.shadow-2xl {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px hsl(var(--primary) / 0.1);
}

/* 渐变动画 */
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 卡片悬停时的微光效果 */
.group:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, hsl(var(--background) / 0.2), transparent);
  transition: left 0.5s;
  pointer-events: none;
  z-index: 1;
}

.group:hover::before {
  left: 100%;
}

/* 背景装饰增强 */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}

/* 微妙的玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* 提升按钮视觉效果 */
.group .relative.z-10 {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Avatar 增强效果 */
.ring-2 {
  box-shadow:
    0 0 0 2px hsl(var(--background)),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 悬停缩放的平滑过渡 */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02) translateZ(0);
  backface-visibility: hidden;
}

/* 图片缩放的平滑过渡 */
.group-hover\:scale-110 {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 内容区域的微妙背景 */
.bg-gradient-to-b {
  background: linear-gradient(to bottom, hsl(var(--card)), hsl(var(--muted) / 0.3));
}

/* 主题适应的文本颜色 */
.text-white\/80 {
  color: rgba(255, 255, 255, 0.8);
}
</style>
