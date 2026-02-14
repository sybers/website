<script setup lang="ts">
const route = useRoute();
const isBlogPost = computed(() => route.name === 'blog-rkey');

</script>
<template>
  <div>
    <AppHeader />
    <template v-if="!isBlogPost">
      <h1>Blog</h1>
    </template>
    <template v-else>
      <RouterLink to="/blog" class="back-to-blog">← Back to blog</RouterLink>
    </template>
    <slot />
    <BlogFooter />
  </div>
</template>

<style scoped>
.blog-links {
  color: var(--text-muted);
  font-size: 0.85em;
  margin-top: 0;
}

.back-to-blog {
  color: var(--text-muted);
  font-size: 0.85em;
  padding-top: 2em;
  display: block;
  text-decoration: none;
}
</style>