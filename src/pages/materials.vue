<template>
  <div class="p-10 bg-[var(--color-bg-1)]">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-[28px] font-bold text-[var(--color-text-1)]">素材库</h1>
      <div>
        <a-space>
          <a-input-search
            placeholder="搜索素材"
            search-button
            style="width: 300px"
            @search="onSearch"
          />
          <a-select
            v-model="filter.type"
            placeholder="素材类型"
            style="width: 120px"
            allow-clear
          >
            <a-option value="all">全部类型</a-option>
            <a-option value="template">模板</a-option>
            <a-option value="image">图片</a-option>
            <a-option value="icon">图标</a-option>
            <a-option value="shape">形状</a-option>
            <a-option value="text">文字</a-option>
          </a-select>
        </a-space>
      </div>
    </div>

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="模板">
        <a-grid
          :col-gap="16"
          :row-gap="16"
          :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }"
        >
          <a-grid-item v-for="i in 12" :key="i">
            <div
              class="bg-[var(--color-bg-2)] rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col hover:translate-y-[-4px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="`https://picsum.photos/300/400?random=${i + 100}`"
                  alt="模板"
                  class="w-full aspect-[3/4] object-cover transition-transform duration-400 hover:scale-[1.05]"
                />
              </div>
              <div class="p-3 flex flex-col flex-1">
                <div
                  class="font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  精美模板 {{ i }}
                </div>
                <div class="flex gap-2 mb-3">
                  <a-tag size="small" color="blue">模板</a-tag>
                  <a-tag size="small" color="gray">海报</a-tag>
                </div>
                <div class="flex gap-2 mt-auto">
                  <a-button size="small" type="primary">使用</a-button>
                  <a-button size="small">预览</a-button>
                </div>
              </div>
            </div>
          </a-grid-item>
        </a-grid>
      </a-tab-pane>

      <a-tab-pane key="2" title="图片">
        <a-grid
          :cols="{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 8 }"
          :col-gap="16"
          :row-gap="16"
        >
          <a-grid-item v-for="i in 18" :key="i">
            <div class="card-base card-hover">
              <div class="relative overflow-hidden">
                <img
                  :src="`https://picsum.photos/300/300?random=${i + 200}`"
                  alt="图片"
                  class="aspect-[1/1]"
                />
                <div
                  class="absolute inset-0 bg-black/40 flex-center opacity-0 transition-opacity duration-300 hover:opacity-100"
                >
                  <a-button shape="circle" type="primary" size="mini">
                    <template #icon><icon-plus /></template>
                  </a-button>
                </div>
              </div>
            </div>
          </a-grid-item>
        </a-grid>
      </a-tab-pane>

      <a-tab-pane key="3" title="图标">
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-16px py-16px"
        >
          <div
            v-for="i in 30"
            :key="i"
            class="flex flex-col items-center cursor-pointer"
          >
            <div
              class="flex-center w-60px h-60px rounded-8px bg-[var(--color-bg-2)] text-24px text-[var(--color-primary)] transition-all duration-200 hover:scale-110 hover:bg-[var(--color-primary-light-1)]"
            >
              <component :is="`icon-${getRandomIcon(i)}`" />
            </div>
            <div class="mt-8px text-xs text-[var(--color-text-2)]">
              图标名称
            </div>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="4" title="形状">
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-16px py-16px"
        >
          <div
            v-for="i in 20"
            :key="i"
            class="flex flex-col items-center cursor-pointer"
          >
            <div
              class="w-80px h-80px flex-center bg-[var(--color-primary-light-4)] transition-transform duration-200 hover:scale-110"
              :class="{
                'rounded-0': i % 5 === 0,
                'rounded-8px': i % 5 === 1,
                'rounded-full': i % 5 === 2,
                'clip-path-[polygon(50%_0%,100%_50%,50%_100%,0%_50%)]':
                  i % 5 === 3,
                'clip-path-[polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]':
                  i % 5 === 4,
              }"
            ></div>
            <div class="mt-8px text-xs text-[var(--color-text-2)]">
              形状 {{ i }}
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <div class="flex justify-center mt-10">
      <a-pagination
        :total="100"
        show-total
        show-jumper
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const filter = reactive({
  type: "all",
});

const onSearch = (value: string) => {
  console.log("搜索:", value);
};

const onPageChange = (page: number) => {
  console.log("页码变化:", page);
};

const iconTypes = [
  "experiment",
  "apps",
  "robot",
  "share-alt",
  "heart",
  "star",
  "copy",
  "eye",
  "home",
  "user",
  "setting",
  "file",
  "cloud",
  "image",
  "calendar",
  "message",
  "notification",
  "search",
];

const getRandomIcon = (seed: number) => {
  return iconTypes[seed % iconTypes.length];
};
</script>
