<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center">
    <div class="size-full relative">
      <LocateTools class="absolute bottom-4 left-8" @locate-fixed="handleLocateFixed" />
      <CreateTools class="absolute bottom-4 right-4" @user-tool="handleUserTool" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Draw from '@/Render/draw';
import CreateTools from '@/components/edit-tools/create-tools.vue';
import LocateTools from '@/components/locate-tools/index.vue';
const drawCanvas = ref<HTMLDivElement | null>(null);

const draw = ref<Draw | null>(null);

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    // console.log('app', draw.value);
  }
});

const handleLocateFixed = () => {
  // 使用带动画效果的回到原点方法
  draw.value?.animateToOrigin(1, 'ease-out');
};

const handleUserTool = (tool: string) => {
  // console.log('tool', tool);
  switch (tool) {
    case 'pointer':
      break;
    case 'select':
      break;
    case 'text':
      draw.value?.addText({
        editable: true,
      });
      break;
    case 'image':
      draw.value?.addImage({
        editable: true,
      });
      break;
    case 'rect':
      draw.value?.addRect({
        editable: true,
      });
      break;
  }
};
</script>
