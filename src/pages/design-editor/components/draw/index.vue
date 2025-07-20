<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center">
    <div class="size-full relative">
      <LocateTools class="absolute bottom-4 left-8" @locate-fixed="handleLocateFixed" />
      <CreateTools class="absolute bottom-4 right-4" :canvasApp="draw" />
      <div
        ref="miniMap"
        class="absolute top-6 right-6 z-10 w-[200px] h-[150px] border-2 border-blue-300 flex items-center justify-center bg-[#f0f0f0] rounded-md"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Draw from '@/Render/draw';
import CreateTools from '@/components/edit-tools/create-tools.vue';
import LocateTools from '@/components/locate-tools/index.vue';

const drawCanvas = ref<HTMLDivElement | null>(null);

const draw = shallowRef<Draw | null>(null);
const miniMap = useTemplateRef('miniMap');

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    if (miniMap.value) {
      draw.value.initMiniMap(miniMap.value);
    }
  }
});

const handleLocateFixed = () => {
  // 使用带动画效果的回到原点方法
  draw.value?.animateToOrigin(1, 'ease-out');
};

// const handleUserTool = (tool: string) => {
//   // console.log('tool', tool);
//   switch (tool) {
//     case 'pointer':
//       break;
//     case 'select':
//       break;
//     case 'text':
//       break;
//     case 'image':
//       break;
//     case 'rect':
//       break;
//   }
// };
</script>
