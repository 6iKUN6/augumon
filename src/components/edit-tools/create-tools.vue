<template>
  <div class="flex items-center gap-2 shadow-lg rounded-md p-2 bg-card border border-border z-10">
    <ToggleGroup v-model="activeTool" type="single">
      <ToggleGroupItem v-for="tool in tools" :key="tool.name" :value="tool.value">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <component :is="tool.icon" />
            </TooltipTrigger>
            <TooltipContent class="bg-card border border-border text-card-foreground">
              <p>{{ tool.desc }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

<script setup lang="ts">
import { Pointer, MousePointer2, Type, Image, Bot, Square, Circle, Smile } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const activeTool = ref('');

const tools = [
  {
    name: '移动',
    icon: Pointer,
    value: 'pointer',
    desc: '移动工具',
  },
  {
    name: '选择',
    icon: MousePointer2,
    value: 'select',
    desc: '选择工具',
  },
  {
    name: '文本',
    icon: Type,
    value: 'text',
    desc: '文本工具',
  },
  {
    name: '图片',
    icon: Image,
    value: 'image',
    desc: '图片工具',
  },
  {
    name: '矩形',
    icon: Square,
    value: 'rect',
    desc: '矩形工具',
  },
  {
    name: '圆形',
    icon: Circle,
    value: 'circle',
    desc: '圆形工具',
  },
  {
    name: '表情',
    icon: Smile,
    value: 'smile',
    desc: '表情工具',
  },
  {
    name: 'AI',
    icon: Bot,
    value: 'ai',
    desc: 'AI工具',
  },
];
</script>
