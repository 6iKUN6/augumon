<template>
  <div class="w-full p-8">
    <div class="grid grid-cols-3 gap-6">
      <!-- 安全特性卡片 -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="aspect-[3/2] flex items-center justify-center p-8 bg-gray-50">
          <div class="relative">
            <div class="w-28 h-28 bg-white rounded-full flex items-center justify-center">
              <div class="text-4xl text-gray-800">
                <CheckCircle />
              </div>
            </div>
            <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
              <div
                class="border-2 border-dashed border-gray-200 rounded-full w-36 h-36 animate-spin-slow"
              ></div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-medium mb-2 text-center">安全</h3>
          <p class="text-sm text-gray-600 text-center">
            由Azure云服务提供支持，安全、持久且易于可视化的数据
          </p>
        </div>
      </div>

      <!-- 高效特性卡片 -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="aspect-[3/2] flex items-center justify-center p-8 bg-gray-50">
          <div class="relative">
            <div class="w-28 h-28 bg-white rounded-full flex items-center justify-center">
              <div class="text-4xl text-green-500">
                <Zap />
              </div>
            </div>
            <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
              <div class="border-2 border-dashed border-gray-200 rounded-full w-36 h-36"></div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-medium mb-2 text-center">高效</h3>
          <p class="text-sm text-gray-600 text-center">
            可即时访问历史文件，最大程度提高了工作效率
          </p>
        </div>
      </div>

      <!-- 多端协同特性卡片 -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="aspect-[3/2] flex items-center justify-center p-8 bg-gray-50">
          <div class="relative">
            <div class="w-28 h-28 bg-white rounded-full flex items-center justify-center">
              <div class="text-4xl text-gray-800">
                <File />
              </div>
            </div>
            <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
              <div class="border-2 border-dashed border-gray-200 rounded-full w-36 h-36"></div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-medium mb-2 text-center">多端协同</h3>
          <p class="text-sm text-gray-600 text-center">
            只需一个XTool账号，即可在各种设备上打开文件编辑
          </p>
        </div>
      </div>
    </div>

    <!-- 立即学习按钮 -->
    <div class="flex justify-center mt-8">
      <Button size="lg">立即学习</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Zap, File } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
// 这里可以添加页面逻辑
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
