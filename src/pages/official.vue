<template>
  <div
    class="min-h-screen bg-background text-foreground overflow-hidden relative"
    @mousemove="handleMouseMove"
  >
    <!-- 跟随鼠标的光效 - 仅在桌面设备显示 -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDesktop"
        ref="mouseFollower"
        :class="[
          'fixed pointer-events-none z-50 rounded-full blur-md transition-all duration-200 ease-out',
          isHovering
            ? 'w-12 h-12 bg-gradient-to-r from-primary/50 to-accent/50 scale-125'
            : 'w-8 h-8 bg-gradient-to-r from-primary/30 to-accent/30',
        ]"
        :style="{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      ></div>
    </Transition>

    <!-- 鼠标光晕效果 - 仅在桌面设备显示 -->
    <Transition
      enter-active-class="transition-opacity duration-500"
      leave-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDesktop"
        :class="[
          'fixed pointer-events-none z-40 rounded-full blur-2xl transition-all duration-300 ease-out',
          isHovering
            ? 'w-40 h-40 bg-gradient-to-r from-primary/20 to-secondary/20'
            : 'w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10',
        ]"
        :style="{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      ></div>
    </Transition>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center">
      <!-- 背景装饰 -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 bg-[size:200%_200%] animate-gradient-shift"
      >
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 2000, ease: 'easeOut' },
          }"
          class="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow"
        ></div>
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 2000, delay: 500, ease: 'easeOut' },
          }"
          class="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse-glow"
        ></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 1000, ease: 'easeOut' },
            }"
            class="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            重新定义设计创作
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 1000, delay: 300, ease: 'easeOut' },
            }"
            class="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            专业的设计工具平台，让创意无限可能<br />
            体验前所未有的设计流畅度与创作自由
          </p>
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 800, delay: 600, ease: 'easeOut' },
            }"
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              @click="$router.push('/design-editor')"
            >
              开始创作
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="border-2 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              了解更多
            </Button>
          </div>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{
          opacity: 1,
          transition: { duration: 1000, delay: 1200, ease: 'easeOut' },
        }"
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div class="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div
            v-motion
            :initial="{ y: 0 }"
            :enter="{
              y: [0, 12, 0],
              transition: { duration: 2000, repeat: Infinity, ease: 'easeInOut' },
            }"
            class="w-1 h-3 bg-primary rounded-full mt-2"
          ></div>
        </div>
      </div>
    </section>

    <!-- 功能特色区域 -->
    <section class="py-20 bg-muted/30">
      <div class="container mx-auto px-6">
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">强大功能，简单操作</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            集成先进的设计工具，让每个人都能创造出专业级的作品
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 800, delay: index * 200, ease: 'easeOut' },
            }"
            class="group bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/20 backdrop-blur-sm cursor-pointer"
          >
            <div class="mb-6">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <component :is="feature.icon" class="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3
              class="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300"
            >
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示区域 -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-6">
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-foreground">产品展示</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            看看其他用户使用我们的平台创作的精彩作品
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(work, index) in showcase"
            :key="index"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :visible-once="{
              opacity: 1,
              scale: 1,
              transition: { duration: 600, delay: index * 100, ease: 'easeOut' },
            }"
            class="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm cursor-pointer"
          >
            <img
              :src="work.image"
              :alt="work.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-6 left-6 right-6 text-white">
                <h3 class="text-xl font-semibold mb-2">{{ work.title }}</h3>
                <p class="text-sm opacity-90">{{ work.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据区域 -->
    <section class="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: index * 150, ease: 'easeOut' },
            }"
            class="group"
          >
            <div
              class="text-4xl md:text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow"
            >
              {{ stat.number }}
            </div>
            <div class="text-xl font-semibold text-foreground mb-2">{{ stat.label }}</div>
            <div class="text-muted-foreground">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
      <div class="container mx-auto px-6 text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
          class="text-white"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-6">准备开始您的创作之旅？</h2>
          <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            加入数万名创作者，体验全新的设计创作体验
          </p>
          <Button
            size="lg"
            variant="secondary"
            class="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            @click="$router.push('/design-editor')"
          >
            立即开始创作
          </Button>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-card border-t border-border/50 py-12">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-bold text-foreground mb-4">设计创作平台</h3>
            <p class="text-muted-foreground mb-4 max-w-md">
              专业的设计工具平台，让创意无限可能。我们致力于为用户提供最优质的设计创作体验。
            </p>
            <div class="flex space-x-4">
              <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-foreground">
                关于我们
              </Button>
              <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-foreground">
                联系我们
              </Button>
              <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-foreground">
                隐私政策
              </Button>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-foreground mb-4">产品</h4>
            <div class="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                设计编辑器
              </Button>
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                模板库
              </Button>
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                素材中心
              </Button>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-foreground mb-4">支持</h4>
            <div class="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                帮助中心
              </Button>
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                使用教程
              </Button>
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground p-0 h-auto justify-start"
              >
                社区论坛
              </Button>
            </div>
          </div>
        </div>
        <div class="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 设计创作平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Palette, Zap, Users } from 'lucide-vue-next';

// 鼠标位置跟踪
const mousePosition = reactive({
  x: 0,
  y: 0,
});

// 鼠标悬停状态
const isHovering = ref(false);

// 检测是否为桌面设备
const isDesktop = ref(false);

// 鼠标移动处理函数
const handleMouseMove = (event: MouseEvent) => {
  if (!isDesktop.value) return;

  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;

  // 检测是否悬停在可交互元素上
  const target = event.target as HTMLElement;
  const isInteractive =
    target.tagName === 'BUTTON' ||
    target.tagName === 'A' ||
    target.closest('button') ||
    target.closest('a') ||
    target.classList.contains('cursor-pointer') ||
    target.closest('.group');

  isHovering.value = !!isInteractive;
};

// 检测设备类型
const checkDeviceType = () => {
  // 检测是否有鼠标指针
  const hasMousePointer = window.matchMedia('(pointer: fine)').matches;
  // 检测屏幕宽度
  const isWideScreen = window.innerWidth >= 768;
  // 检测是否支持hover
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  isDesktop.value = hasMousePointer && isWideScreen && supportsHover;
};

// 组件挂载时初始化
onMounted(() => {
  checkDeviceType();

  if (isDesktop.value) {
    // 设置初始位置到屏幕中心
    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;
  }

  // 监听屏幕尺寸变化
  window.addEventListener('resize', checkDeviceType);
});

// 组件卸载时清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', checkDeviceType);
});

// 功能特色数据
const features = ref([
  {
    icon: Palette,
    title: '专业设计工具',
    description: '提供完整的设计工具集，从基础图形到高级效果，满足各种创作需求。',
  },
  {
    icon: Zap,
    title: '实时协作',
    description: '支持多人实时协作，团队成员可以同时编辑，提高工作效率。',
  },
  {
    icon: Users,
    title: '智能助手',
    description: 'AI驱动的设计建议，帮助您快速找到最佳的设计方案。',
  },
]);

// 作品展示数据
const showcase = ref([
  {
    title: '品牌标识设计',
    author: 'XLaser',
    image: 'https://picsum.photos/400/400?random=1',
  },
  {
    title: '海报设计',
    author: 'Atomm',
    image: 'https://picsum.photos/400/400?random=2',
  },
  {
    title: 'UI界面设计',
    author: 'Designer',
    image: 'https://picsum.photos/400/400?random=3',
  },
  {
    title: '插画创作',
    author: 'Artist',
    image: 'https://picsum.photos/400/400?random=4',
  },
  {
    title: '包装设计',
    author: 'Creative',
    image: 'https://picsum.photos/400/400?random=5',
  },
  {
    title: '网页设计',
    author: 'WebDesigner',
    image: 'https://picsum.photos/400/400?random=6',
  },
]);

// 统计数据
const stats = ref([
  {
    number: '50K+',
    label: '活跃用户',
    description: '遍布全球的创作者',
  },
  {
    number: '100K+',
    label: '设计作品',
    description: '高质量创作内容',
  },
  {
    number: '99.9%',
    label: '系统稳定性',
    description: '7x24小时稳定运行',
  },
  {
    number: '24/7',
    label: '技术支持',
    description: '全天候客户服务',
  },
]);
</script>
