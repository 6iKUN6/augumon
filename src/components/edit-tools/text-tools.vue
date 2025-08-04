<template>
  <div class="flex items-center gap-2 shadow-lg rounded-md p-3 bg-card border border-border z-20">
    <!-- 字体大小 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground min-w-[30px]">大小</label>
      <Input
        v-model="fontSize"
        type="number"
        class="w-16 h-8 text-xs"
        min="8"
        max="200"
        @input="updateFontSize"
      />
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 字体颜色 -->
    <div class="flex items-center gap-1">
      <label class="text-xs text-muted-foreground">颜色</label>
      <Input
        v-model="fontColor"
        type="color"
        class="w-10 h-8 p-1 cursor-pointer"
        @input="updateFontColor"
      />
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 字体粗细 -->
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-2"
        :class="{ 'bg-accent': isBold }"
        @click="toggleBold"
      >
        <Bold class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-2"
        :class="{ 'bg-accent': isItalic }"
        @click="toggleItalic"
      >
        <Italic class="w-4 h-4" />
      </Button>
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- 文本对齐 -->
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-2"
        :class="{ 'bg-accent': textAlign === 'left' }"
        @click="setTextAlign('left')"
      >
        <AlignLeft class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-2"
        :class="{ 'bg-accent': textAlign === 'center' }"
        @click="setTextAlign('center')"
      >
        <AlignCenter class="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-2"
        :class="{ 'bg-accent': textAlign === 'right' }"
        @click="setTextAlign('right')"
      >
        <AlignRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { UI } from 'leafer-ui';

interface Props {
  selectedNode: UI | null;
}

const props = defineProps<Props>();

// 响应式数据
const fontSize = ref(16);
const fontColor = ref('#000000');
const fontWeight = ref('normal');
const isItalic = ref(false);
const textAlign = ref('left');

// 计算属性
const isBold = computed(() => fontWeight.value === 'bold' || fontWeight.value === '700');

// 监听选中节点变化，更新表单数据
watch(
  () => props.selectedNode,
  (newNode) => {
    if (newNode && newNode.tag === 'Text') {
      // 从选中的文本节点获取当前属性
      fontSize.value = (newNode as any).fontSize || 16;
      const fillValue = (newNode as any).fill;
      fontColor.value = typeof fillValue === 'string' ? fillValue : '#000000';
      fontWeight.value = (newNode as any).fontWeight || 'normal';
      isItalic.value = (newNode as any).italic || false;
      textAlign.value = (newNode as any).textAlign || 'left';
    }
  },
  { immediate: true }
);

// 更新方法
const updateFontSize = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Text') {
    (props.selectedNode as any).fontSize = fontSize.value;
  }
};

const updateFontColor = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Text') {
    (props.selectedNode as any).fill = fontColor.value;
  }
};

const toggleBold = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Text') {
    fontWeight.value = isBold.value ? 'normal' : 'bold';
    (props.selectedNode as any).fontWeight = fontWeight.value;
  }
};

const toggleItalic = () => {
  if (props.selectedNode && props.selectedNode.tag === 'Text') {
    isItalic.value = !isItalic.value;
    (props.selectedNode as any).italic = isItalic.value;
  }
};

const setTextAlign = (align: 'left' | 'center' | 'right') => {
  if (props.selectedNode && props.selectedNode.tag === 'Text') {
    textAlign.value = align;
    (props.selectedNode as any).textAlign = align;
  }
};
</script>
