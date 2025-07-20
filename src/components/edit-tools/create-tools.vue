<template>
  <div class="flex items-center gap-2 shadow-lg rounded-md p-2 bg-card border border-border z-10">
    <ToggleGroup v-model="activeTool" type="single">
      <ToggleGroupItem
        v-for="tool in tools"
        :key="tool.name"
        :value="tool.value"
        @click="handleToolClick(tool)"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover v-if="tool.value === 'image'">
                <PopoverTrigger>
                  <component :is="tool.icon" />
                </PopoverTrigger>
                <PopoverContent class="bg-card border border-border text-card-foreground m-5">
                  <CreateImage @select="handleSelectImage" />
                </PopoverContent>
              </Popover>
              <component :is="tool.icon" v-else />
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
// import { Canvas } from 'leafer-ui';
import { Pointer, MousePointer2, Type, Image, Bot, Square, Circle, Smile } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CreateImage from './create-image.vue';
import type Draw from '@/Render/draw';

const activeTool = ref('');

const props = defineProps<{
  canvasApp: Draw | null;
}>();
const emit = defineEmits(['user-tool']);

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
    click: () => {
      props.canvasApp?.addText({
        editable: true,
      });
    },
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
    click: () => {
      props.canvasApp?.addRect({
        editable: true,
      });
    },
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

const handleToolClick = (tool: any) => {
  if (tool.click) {
    tool.click();
  } else {
    emit('user-tool', tool.value);
  }
};

const handleSelectImage = (url: string) => {
  // if (url.endsWith('.gif')) {
  //   const canvas = new Canvas({ width: 100, url, editable: true });
  //   props.canvasApp?.getApp().tree.add(canvas);
  //   return;
  // }

  props.canvasApp?.addImage({
    url,
    editable: true,
  });
};
</script>
