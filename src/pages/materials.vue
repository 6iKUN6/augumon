<template>
  <div class="p-6">
    <div class="mb-6 flex items-center space-x-4">
      <Input v-model="filter.search" placeholder="搜索素材..." class="max-w-sm" />
      <Select v-model="filter.type" placeholder="素材类型">
        <option value="all">全部类型</option>
        <option value="template">模板</option>
        <option value="image">图片</option>
        <option value="icon">图标</option>
        <option value="shape">形状</option>
        <option value="text">文字</option>
      </Select>
    </div>

    <Tabs v-model="currentTab" class="w-full">
      <TabsList>
        <TabsTrigger value="1">模板</TabsTrigger>
        <TabsTrigger value="2">图片</TabsTrigger>
        <TabsTrigger value="3">图标</TabsTrigger>
        <TabsTrigger value="4">形状</TabsTrigger>
      </TabsList>

      <TabsContent value="1">
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <div
            v-for="i in 12"
            :key="i"
            class="group relative overflow-hidden rounded-lg border bg-card"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Template preview"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-4">
              <div class="mb-2 space-x-2">
                <Badge variant="default">模板</Badge>
                <Badge variant="secondary">海报</Badge>
              </div>
              <div class="flex items-center justify-between">
                <Button size="sm" variant="default">使用</Button>
                <Button size="sm" variant="outline">预览</Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="2">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <div
            v-for="i in 18"
            :key="i"
            class="group relative aspect-square overflow-hidden rounded-lg border"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="Image"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-2 right-2">
              <Button size="icon" variant="default" class="h-8 w-8">
                <span class="sr-only">Add to favorites</span>
                <i class="i-heroicons-heart-20-solid" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="3">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <!-- 图标内容 -->
        </div>
      </TabsContent>

      <TabsContent value="4">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <!-- 形状内容 -->
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const filter = ref({
  type: '',
  search: '',
});

const currentTab = ref('1');

// const iconTypes = [
//   'experiment',
//   'apps',
//   'robot',
//   'share-alt',
//   'heart',
//   'star',
//   'copy',
//   'eye',
//   'home',
//   'user',
//   'setting',
//   'file',
//   'cloud',
//   'image',
//   'calendar',
//   'message',
//   'notification',
//   'search',
// ];

//  const getRandomIcon = (seed: number) => {
//   return iconTypes[seed % iconTypes.length];
// };
</script>
