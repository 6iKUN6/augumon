<template>
  <div class="p-40px bg-[var(--color-bg-1)]">
    <div class="flex-between mb-24px">
      <h1 class="text-28px font-bold text-[var(--color-text-1)]">设计广场</h1>
      <div>
        <a-space>
          <a-input-search
            placeholder="搜索设计作品"
            search-button
            style="width: 300px"
            @search="onSearch"
          />
          <a-select v-model="filter.category" placeholder="分类" style="width: 120px" allow-clear>
            <a-option value="all">全部分类</a-option>
            <a-option value="poster">海报</a-option>
            <a-option value="banner">横幅</a-option>
            <a-option value="social">社交媒体</a-option>
            <a-option value="print">印刷品</a-option>
          </a-select>
          <a-select v-model="filter.sort" placeholder="排序方式" style="width: 120px">
            <a-option value="newest">最新发布</a-option>
            <a-option value="popular">最受欢迎</a-option>
            <a-option value="trending">热门趋势</a-option>
          </a-select>
        </a-space>
      </div>
    </div>

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="推荐">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-24px mt-24px">
          <div v-for="i in 12" :key="i" class="card-base card-hover">
            <div class="relative h-200px overflow-hidden">
              <img
                class="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                :src="`https://picsum.photos/400/300?random=${i}`"
                alt="设计作品"
              />
              <div
                class="absolute top-10px right-10px flex gap-8px opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <a-button shape="circle" type="primary">
                  <template #icon><icon-heart /></template>
                </a-button>
                <a-button shape="circle" type="primary">
                  <template #icon><icon-star /></template>
                </a-button>
                <a-button shape="circle" type="primary">
                  <template #icon><icon-copy /></template>
                </a-button>
              </div>
            </div>
            <div class="p-16px">
              <div class="font-bold mb-8px overflow-hidden text-ellipsis whitespace-nowrap">
                精美设计作品 {{ i }}
              </div>
              <div class="flex items-center gap-8px text-14px text-[var(--color-text-2)] mb-8px">
                <a-avatar size="small" :style="{ backgroundColor: '#3370ff' }">
                  {{ String.fromCharCode(64 + (i % 26 || 26)) }}
                </a-avatar>
                <span>设计师 {{ i }}</span>
              </div>
              <div class="flex gap-16px text-14px text-[var(--color-text-3)]">
                <span><icon-heart /> {{ Math.floor(Math.random() * 100) }}</span>
                <span><icon-star /> {{ Math.floor(Math.random() * 50) }}</span>
                <span><icon-eye /> {{ Math.floor(Math.random() * 1000) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-40px">
          <a-pagination :total="100" show-total show-jumper show-page-size @change="onPageChange" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="最新">
        <div class="py-60px">
          <a-empty description="暂无数据" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" title="热门">
        <div class="py-60px">
          <a-empty description="暂无数据" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const filter = reactive({
  category: 'all',
  sort: 'newest',
});

const onSearch = (value: string) => {
  console.log('搜索:', value);
};

const onPageChange = (page: number) => {
  console.log('页码变化:', page);
};
</script>
