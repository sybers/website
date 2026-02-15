<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  description?: string;
  siteName: string;
}>(), {
  title: 'Stanyslas Bres',
  description: 'Software engineer',
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between bg-[#10151a] text-white p-16 relative font-mono">
    <div
      class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
      style="background: radial-gradient(circle at center, #41adff 0%, transparent 80%)"
    />

    <div class="flex flex-col gap-4 relative z-10">
      <h1 class="text-6xl font-bold">
        {{ title }}
      </h1>
      <p class="text-2xl text-gray-400">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-between items-end text-xl text-gray-500 relative z-10">
      <span>{{ siteName }}</span>
    </div>
  </div>
</template>
