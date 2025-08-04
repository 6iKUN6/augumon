<template>
  <div class="flex items-center gap-2 shadow-lg rounded-md p-3 bg-card border border-border z-20">
    <!-- 透明度 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground min-w-[30px]">透明</label>
      <Input
        v-model="opacity"
        type="range"
        class="w-20 h-8"
        min="0"
        max="1"
        step="0.1"
        @input="updateOpacity"
      />
      <span class="text-xs text-muted-foreground min-w-[30px]">
        {{ Math.round(opacity * 100) }}%
      </span>
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 圆角 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground min-w-[30px]">圆角</label>
      <Input
        v-model="cornerRadius"
        type="number"
        class="w-16 h-8 text-xs"
        min="0"
        max="50"
        @input="updateCornerRadius"
      />
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 旋转 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground min-w-[30px]">旋转</label>
      <Input
        v-model="rotation"
        type="number"
        class="w-16 h-8 text-xs"
        min="0"
        max="360"
        @input="updateRotation"
      />
      <span class="text-xs text-muted-foreground">°</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { UI } from 'leafer-ui';

interface Props {
  selectedNode: UI | null;
}

const props = defineProps<Props>();

// 响应式数据
const opacity = ref(1);
const cornerRadius = ref(0);
const rotation = ref(0);

// 监听选中节点变化，更新表单数据
watch(
  () => props.selectedNode,
  (newNode) => {
    if (newNode && newNode.tag === 'Image') {
      // 从选中的图片节点获取当前属性
      opacity.value = (newNode as any).opacity || 1;
      cornerRadius.value = Number((newNode as any).cornerRadius) || 0;
      rotation.value = (newNode as any).rotation || 0;
    }
  },
  { immediate: true }
);

// 更新方法
const updateOpacity = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Image') {
    (props.selectedNode as any).opacity = opacity.value;
  }
};

const updateCornerRadius = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Image') {
    (props.selectedNode as any).cornerRadius = cornerRadius.value;
  }
};

const updateRotation = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Image') {
    (props.selectedNode as any).rotation = rotation.value;
  }
};
</script>
