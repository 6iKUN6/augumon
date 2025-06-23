<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center">
    <!-- <span class="text-muted-foreground text-xl">画布区域</span> -->
  </div>
</template>

<script setup lang="ts">
import Draw from '@/Render/draw';

const drawCanvas = ref<HTMLDivElement | null>(null);

const draw = ref<Draw | null>(null);

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    draw.value.testAdd();
    // console.log('app', draw.value.getApp());
  }
});
</script>
