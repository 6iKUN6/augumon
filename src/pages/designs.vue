<template>
  <div class="p-10 bg-background">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">设计广场</h1>
      <div class="flex gap-4">
        <Input placeholder="搜索设计作品" class="w-80" @input="onSearch" />
        <select v-model="filter.category" class="px-3 py-2 border rounded-md">
          <option value="all">全部分类</option>
          <option value="poster">海报</option>
          <option value="banner">横幅</option>
          <option value="social">社交媒体</option>
          <option value="print">印刷品</option>
        </select>
        <select v-model="filter.sort" class="px-3 py-2 border rounded-md">
          <option value="newest">最新发布</option>
          <option value="popular">最受欢迎</option>
          <option value="trending">热门趋势</option>
        </select>
      </div>
    </div>

    <div class="border-b mb-6">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.key
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
          @click="activeTab = tab.key"
        >
          {{ tab.title }}
        </button>
      </nav>
    </div>

    <div v-if="activeTab === '1'">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-6 mt-6">
        <div
          v-for="i in 12"
          :key="i"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="relative h-48 overflow-hidden group">
            <img
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              :src="`https://picsum.photos/400/300?random=${i}`"
              alt="设计作品"
            />
            <div
              class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button size="sm" variant="secondary" class="h-8 w-8 p-0">
                <Heart class="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" class="h-8 w-8 p-0">
                <Star class="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" class="h-8 w-8 p-0">
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div class="p-4">
            <div class="font-bold mb-2 truncate">精美设计作品 {{ i }}</div>
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Avatar size="sm" :fallback="String.fromCharCode(64 + (i % 26 || 26))" />
              <span>设计师 {{ i }}</span>
            </div>
            <div class="flex gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <Heart class="h-4 w-4" /> {{ Math.floor(Math.random() * 100) }}
              </span>
              <span class="flex items-center gap-1">
                <Star class="h-4 w-4" /> {{ Math.floor(Math.random() * 50) }}
              </span>
              <span class="flex items-center gap-1">
                <Eye class="h-4 w-4" /> {{ Math.floor(Math.random() * 1000) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <div class="text-sm text-gray-500">共 100 条数据</div>
      </div>
    </div>

    <div v-else class="py-16 text-center">
      <div class="text-gray-500">暂无数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Heart, Star, Copy, Eye } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

const activeTab = ref('1');
const tabs = [
  { key: '1', title: '推荐' },
  { key: '2', title: '最新' },
  { key: '3', title: '热门' },
];

const filter = reactive({
  category: 'all',
  sort: 'newest',
});

const onSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  console.log('搜索:', value);
};
</script>
