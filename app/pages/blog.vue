<script setup lang="ts">
definePageMeta({ layout: 'blog' });

useSeoMeta({
  title: 'Blog',
  description: 'Blog posts by Stanyslas Bres.',
  ogTitle: 'Blog',
  ogDescription: 'Blog posts by Stanyslas Bres.',
  ogType: 'website',
});

defineOgImageComponent('Default', {
  title: 'Blog',
  description: 'Blog posts by Stanyslas Bres.',
}, {
  fonts: ['Space Mono:400', 'Space Mono:700'],
});
</script>

<template>
  <NuxtPage />
</template>
