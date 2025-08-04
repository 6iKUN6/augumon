<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">添加图片</h2>
      <label class="cursor-pointer">
        <input type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
        <Button variant="outline" size="sm">
          <span class="i-lucide-upload mr-2" />
          上传图片
        </Button>
      </label>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="(image, index) in imageList"
        :key="index"
        class="relative aspect-square rounded-lg overflow-hidden border hover:border-primary cursor-pointer group"
        @click="handleSelectImage(image)"
      >
        <img :src="image" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span class="i-lucide-plus-circle text-2xl text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';

const emit = defineEmits<{
  (e: 'select', url: string): void;
}>();

const images = import.meta.glob<string>('@/assets/images/maodie/*.(webp|jpg|gif)', {
  eager: true,
  import: 'default',
});

const imageList = Object.values(images) as string[];

const handleSelectImage = (imageUrl: string) => {
  emit('select', imageUrl);
};

// 处理本地文件上传
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    emit('select', url);
    input.value = '';
  }
};
</script>
