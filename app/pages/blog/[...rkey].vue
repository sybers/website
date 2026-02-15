<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const { data } = await useAsyncData(
  () => `blog-post-${route.params.rkey}`,
  () => $fetch(`/api/post/${route.params.rkey}`),
);

if (!data.value) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Post not found',
  });
}

useSeoMeta({
  title: data.value?.title,
  description: data.value?.content,
  ogTitle: data.value?.title,
  ogDescription: data.value?.content,
  ogType: 'article',
});

const visibilityLabel = computed(() => {
  if (runtimeConfig.public.mode === 'production') {
    return undefined;
  }

  if (data.value?.visibility === 'public') {
    return 'Public';
  }
  if (data.value?.visibility === 'url') {
    return 'accessible via URL';
  }

  return 'only visible by the author';
});

const postLabels = computed(() => {
  const labels = [
    formatDate(data.value?.createdAt),
    data.value?.readingTime,
    visibilityLabel.value,
  ];

  return labels.filter(Boolean).join(' · ');
});

const editLink = computed(() => {
  if (runtimeConfig.public.mode === 'production') {
    return undefined;
  }

  return `https://whtwnd.com/${runtimeConfig.public.atproto.repo}/${route.params.rkey}/edit`;
});
</script>

<template>
  <RouterLink
    to="/blog"
    class="back-to-blog"
  >← Back to blog</RouterLink>
  <div>
    <h1 class="blog-post-title">
      {{ data?.title }}
    </h1>
    <p class="blog-post-labels">
      {{ postLabels }} <a
        v-if="editLink"
        :href="editLink"
        target="_blank"
        class="blog-post-edit"
      >(edit)</a>
    </p>
    <MDC
      v-if="data"
      :value="data.content"
      tag="article"
    />
  </div>
</template>

<style scoped>
.back-to-blog {
  color: var(--text-muted);
  font-size: 0.85em;
  padding-top: 2em;
  display: block;
  text-decoration: none;
}

.blog-post-title {
  margin-bottom: 0;
}

.blog-post-labels {
  margin-top: 0;
  color: var(--text-muted);
}
</style>
