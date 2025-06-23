<template>
  <div class="flex h-[calc(100vh-60px)]">
    <!-- 左侧工具栏 -->
    <LayoutSider
      title="设计工具"
      :menu-items="toolItems"
      :active-index="activeToolIndex"
      :collapsed="toolbarCollapsed"
      :show-add-button="false"
      @select-item="selectTool"
      @update:collapsed="toolbarCollapsed = $event"
    >
      <!-- <template #footer>
        <div class="flex gap-2">
          <Button class="flex-1">
            <Save class="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button variant="outline">
            <Eye class="w-4 h-4 mr-2" />
            预览
          </Button>
        </div>
      </template> -->
    </LayoutSider>

    <!-- 主编辑区域 -->
    <div class="flex-1 flex flex-col bg-muted/30 relative">
      <!-- 顶部操作区 -->
      <div class="h-12 flex items-center justify-between border-b px-4">
        <div class="flex items-center gap-4">
          <div class="flex gap-1">
            <Button variant="outline" size="sm">
              <Undo class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Redo class="w-4 h-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div class="flex gap-1">
            <Button variant="outline" size="sm">
              <ZoomIn class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div class="flex gap-2">
          <Button>
            <Bot class="w-4 h-4 mr-2" />
            AI优化
          </Button>
          <Button>
            <Download class="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      <!-- 设计画布区域 -->
      <div class="flex-1 overflow-auto flex items-center justify-center bg-muted/50">
        <div
          class="bg-white rounded-lg shadow-lg border size-full"
          style="resize: both; overflow: auto"
        >
          <!-- 画布内容 -->
          <ClientOnly>
            <Draw />
            <template #fallback>
              <div class="w-full h-full flex items-center justify-center">
                <span class="text-muted-foreground text-xl">加载画布中...</span>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  // Save,
  // Eye,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Bot,
  Download,
  MousePointer,
  Type,
  Shapes,
  Image,
  Copy,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LayoutSider from '../../layouts/sider.vue';
import Draw from './components/draw/index.vue';

// 工具栏状态
const toolbarCollapsed = ref(false);
const activeToolIndex = ref(0);
const toolItems = ref([
  { title: '选择工具', icon: MousePointer },
  { title: '文本工具', icon: Type },
  { title: '形状工具', icon: Shapes },
  { title: '图片工具', icon: Image },
  { title: '设计模板', icon: Copy },
  { title: '智能生成', icon: Bot },
]);

const selectTool = (index: number) => {
  activeToolIndex.value = index;
};
</script>
