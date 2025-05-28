<template>
  <div class="w-full">
    <!-- 顶部横幅 -->
    <div class="relative p-6 bg-black text-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-bold mb-2">Your Crafting Journey,<br />Now Reimagined.</h1>
            <p class="text-lg mb-4">
              Meet Atomm, your next all-in-one design platform for crafting.
            </p>
            <Button variant="outline" class="w-36 text-white border-white">Visit Now</Button>
          </div>
          <div class="flex justify-end items-center">
            <div class="relative">
              <div class="absolute -inset-10 opacity-70">
                <div class="w-full h-full bg-red-600 rounded-full blur-xl"></div>
              </div>
              <img src="" alt="Atomm Logo" class="relative w-32 h-32" />
              <!-- /public/logo.svg -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近打开区域 -->
    <div class="p-6">
      <h2 class="text-lg font-medium mb-4">最近打开</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-100 aspect-square flex items-center justify-center flex-col cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="text-3xl text-gray-300 mb-2">
            <icon-plus />
          </div>
          <p class="text-sm text-gray-500">新建项目</p>
        </div>
        <!-- 这里可以添加更多最近打开的项目 -->
      </div>
    </div>

    <!-- 趋势区域 -->
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium">Trending Now</h2>
        <Button variant="ghost" size="sm" class="text-sm">
          查看更多
          <icon-right class="ml-1" />
        </Button>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        <div
          v-for="(item, index) in trendingItems"
          :key="index"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-3">
            <h3 class="text-sm font-medium mb-1">{{ item.title }}</h3>
            <div class="flex items-center text-xs text-gray-500">
              <Avatar
                :size="20"
                :fallback="item.avatarText"
                :style="{ backgroundColor: item.avatarColor || '#165DFF' }"
              />
              <span class="ml-2">{{ item.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

// 趋势项目数据
const trendingItems = ref([
  {
    title: 'Surprise Colored Egg with Cute Chicks',
    image: 'https://picsum.photos/400/300?random=1',
    author: 'XLaser',
    avatarText: 'X',
    avatarColor: '#1D72FC',
  },
  {
    title: 'Personalized Easter Gift Package',
    image: 'https://picsum.photos/400/300?random=2',
    author: 'Atomm',
    avatarText: 'A',
    avatarColor: '#F5319D',
  },
  {
    title: 'Easter tea light candle holder',
    image: 'https://picsum.photos/400/300?random=3',
    author: '@flythyme',
    avatarText: 'F',
    avatarColor: '#7BC616',
  },
  {
    title: 'Gold Laser Foil',
    image: 'https://picsum.photos/400/300?random=4',
    author: 'Atomm',
    avatarText: 'A',
    avatarColor: '#F5319D',
  },
  {
    title: "Mother's day pen holder",
    image: 'https://picsum.photos/400/300?random=5',
    author: 'design-people',
    avatarText: 'D',
    avatarColor: '#00B42A',
  },
]);
</script>

<style scoped>
/* 为了使阴影更加明显 */
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
