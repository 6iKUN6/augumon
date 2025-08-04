<template>
  <div class="flex items-center gap-2 shadow-lg rounded-md p-3 bg-card border border-border z-20">
    <!-- 填充颜色 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground">填充</label>
      <Input
        v-model="fillColor"
        type="color"
        class="w-10 h-8 p-1 cursor-pointer"
        @input="updateFillColor"
      />
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 描边颜色 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground">描边</label>
      <Input
        v-model="strokeColor"
        type="color"
        class="w-10 h-8 p-1 cursor-pointer"
        @input="updateStrokeColor"
      />
    </div>

    <!-- 描边宽度 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground min-w-[30px]">粗细</label>
      <Input
        v-model="strokeWidth"
        type="number"
        class="w-16 h-8 text-xs"
        min="0"
        max="20"
        step="0.5"
        @input="updateStrokeWidth"
      />
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
const fillColor = ref('#ff0000');
const strokeColor = ref('#000000');
const strokeWidth = ref(0);
const cornerRadius = ref(0);
const opacity = ref(1);

// 监听选中节点变化，更新表单数据
watch(
  () => props.selectedNode,
  (newNode) => {
    if (newNode && newNode.tag === 'Rect') {
      // 从选中的矩形节点获取当前属性
      const fillValue = (newNode as any).fill;
      fillColor.value = typeof fillValue === 'string' ? fillValue : '#ff0000';
      const strokeValue = (newNode as any).stroke;
      strokeColor.value = typeof strokeValue === 'string' ? strokeValue : '#000000';
      strokeWidth.value = Number((newNode as any).strokeWidth) || 0;
      cornerRadius.value = Number((newNode as any).cornerRadius) || 0;
      opacity.value = (newNode as any).opacity || 1;
    }
  },
  { immediate: true }
);

// 更新方法
const updateFillColor = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Rect') {
    (props.selectedNode as any).fill = fillColor.value;
  }
};

const updateStrokeColor = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Rect') {
    (props.selectedNode as any).stroke = strokeColor.value;
  }
};

const updateStrokeWidth = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Rect') {
    (props.selectedNode as any).strokeWidth = strokeWidth.value;
  }
};

const updateCornerRadius = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Rect') {
    (props.selectedNode as any).cornerRadius = cornerRadius.value;
  }
};

const updateOpacity = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Rect') {
    (props.selectedNode as any).opacity = opacity.value;
  }
};
</script>
