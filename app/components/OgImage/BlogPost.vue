<script setup lang="ts">
defineProps<{
  title: string;
  readingTime: string;
  date: string;
}>();
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between bg-[#10151a] text-white p-16 relative font-mono">
    <div
      class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
      style="background: radial-gradient(circle at center, #41adff 0%, transparent 80%)"
    />

    <div class="flex flex-col gap-4 relative z-10">
      <p class="text-2xl text-gray-500">
        Blog
      </p>
      <h1 class="text-6xl font-bold leading-tight">
        {{ title }}
      </h1>
    </div>
    <div class="flex justify-between items-end text-xl text-gray-500 relative z-10">
      <span>sybers.fr</span>
      <span>{{ date }} · {{ readingTime }}</span>
    </div>
  </div>
</template>
