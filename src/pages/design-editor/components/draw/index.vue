<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center relative">
    <CreateTools class="absolute bottom-4 right-4" />
  </div>
</template>

<script setup lang="ts">
import Draw from '@/Render/draw';
import CreateTools from '@/components/edit-tools/create-tools.vue';
const drawCanvas = ref<HTMLDivElement | null>(null);

const draw = ref<Draw | null>(null);

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    console.log('app', draw.value);
    draw.value.addTestNode();
  }
});
</script>
