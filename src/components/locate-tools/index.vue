<template>
  <div class="z-10 shadow-lg rounded-md p-2 bg-card border border-border">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <ToggleGroup>
            <ToggleGroupItem value="locate" @click="emit('locate-fixed')">
              <LocateFixed class="size-2" />
            </ToggleGroupItem>
          </ToggleGroup>
        </TooltipTrigger>
        <TooltipContent class="bg-card border border-border text-card-foreground">
          <p>定位原点</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<script setup lang="ts">
import { LocateFixed } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const emit = defineEmits(['locate-fixed']);
</script>
