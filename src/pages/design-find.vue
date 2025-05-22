<template>
  <div class="w-full p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-medium mb-4">DesignFind</h1>
      <div class="flex items-center gap-4 mb-6">
        <a-input-search
          placeholder="搜索设计模板和素材..."
          search-button
          class="w-96"
          allow-clear
        />
        <a-button type="primary">
          <template #icon><icon-filter /></template>
          筛选
        </a-button>
      </div>

      <!-- 分类标签 -->
      <div class="flex gap-2 mb-6">
        <a-tag checkable color="arcoblue" checked>全部</a-tag>
        <a-tag checkable>海报</a-tag>
        <a-tag checkable>UI设计</a-tag>
        <a-tag checkable>插画</a-tag>
        <a-tag checkable>3D模型</a-tag>
        <a-tag checkable>动效</a-tag>
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
                <a-avatar :size="24" :style="{ backgroundColor: getRandomColor(i) }">
                  {{ ['D', 'X', 'A', 'T', 'M'][i % 5] }}
                </a-avatar>
                <span class="ml-2 text-xs text-gray-500">{{
                  ['设计师A', 'XTool团队', 'Atomm', '创意工作室', '用户作品'][i % 5]
                }}</span>
              </div>
              <div class="flex items-center text-xs text-gray-500">
                <icon-star class="mr-1" /> {{ Math.floor(Math.random() * 500) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center mt-8">
      <a-pagination :total="100" show-total show-jumper />
    </div>
  </div>
</template>

<script setup lang="ts">
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
