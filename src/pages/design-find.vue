<template>
  <div class="w-full p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-medium mb-4">DesignFind</h1>
      <div class="flex items-center gap-4 mb-6">
        <div class="relative w-96">
          <Input placeholder="搜索设计模板和素材..." class="w-full pr-10" />
          <Button
            variant="ghost"
            size="sm"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
          >
            <Search class="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Filter class="mr-2 h-4 w-4" />
          筛选
        </Button>
      </div>

      <!-- 分类标签 -->
      <div class="flex gap-2 mb-6">
        <Badge variant="default" class="cursor-pointer hover:bg-primary/80">全部</Badge>
        <Badge variant="secondary" class="cursor-pointer hover:bg-secondary/80">海报</Badge>
        <Badge variant="secondary" class="cursor-pointer hover:bg-secondary/80">UI设计</Badge>
        <Badge variant="secondary" class="cursor-pointer hover:bg-secondary/80">插画</Badge>
        <Badge variant="secondary" class="cursor-pointer hover:bg-secondary/80">3D模型</Badge>
        <Badge variant="secondary" class="cursor-pointer hover:bg-secondary/80">动效</Badge>
      </div>

      <!-- 设计项目列表 -->
      <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        <div
          v-for="i in 8"
          :key="i"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="`https://picsum.photos/400/300?random=${i + 10}`"
              :alt="`设计项目${i}`"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-base font-medium mb-2">设计项目标题 {{ i }}</h3>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <Avatar class="w-6 h-6">
                  <AvatarFallback :style="{ backgroundColor: getRandomColor(i) }">
                    {{ ['D', 'X', 'A', 'T', 'M'][i % 5] }}
                  </AvatarFallback>
                </Avatar>
                <span class="ml-2 text-xs text-gray-500">{{
                  ['设计师A', 'XTool团队', 'Atomm', '创意工作室', '用户作品'][i % 5]
                }}</span>
              </div>
              <div class="flex items-center text-xs text-gray-500">
                <Star class="mr-1 h-3 w-3" /> {{ Math.floor(Math.random() * 500) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center mt-8">
      <Pagination
        v-model:page="currentPage"
        :total="100"
        :items-per-page="10"
        :sibling-count="1"
        show-edges
      >
        <PaginationContent>
          <PaginationItem :value="currentPage - 1">
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem
            v-for="(page, index) in pages"
            :key="index"
            :value="typeof page === 'number' ? page : 0"
            :is-active="typeof page === 'number' && page === currentPage"
          >
            <template v-if="typeof page === 'number'">
              {{ page }}
            </template>
            <PaginationEllipsis v-else />
          </PaginationItem>

          <PaginationItem :value="currentPage + 1">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, Filter, Star } from 'lucide-vue-next';

// 分页相关状态
const currentPage = ref(1);
const totalPages = ref(10);

// 生成页码数组（简化版本）
const pages = computed(() => {
  const result = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    // 如果总页数少于等于7页，显示所有页数
    for (let i = 1; i <= total; i++) {
      result.push(i);
    }
  } else {
    // 复杂分页逻辑
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        result.push(i);
      }
      result.push('...');
      result.push(total);
    } else if (current >= total - 3) {
      result.push(1);
      result.push('...');
      for (let i = total - 4; i <= total; i++) {
        result.push(i);
      }
    } else {
      result.push(1);
      result.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        result.push(i);
      }
      result.push('...');
      result.push(total);
    }
  }

  return result;
});

// 生成随机颜色
const getRandomColor = (index: number) => {
  const colors = ['#165DFF', '#00B42A', '#F5319D', '#F7BA1E', '#722ED1'];
  return colors[index % colors.length];
};
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
