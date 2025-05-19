<template>
  <div>
    <button @click="count++">点击</button>
    <p class="text-[blue]">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "test",
  },
});

const count = ref(0);
</script>
