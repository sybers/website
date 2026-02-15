<script setup lang="ts">
const { data } = await useAsyncData('blog-posts', () => {
  return $fetch('/api/posts', { query: { limit: 50 } });
});

const posts = ref(data.value?.posts ?? []);
const cursor = ref(data.value?.cursor);
const loading = ref(false);

const runtimeConfig = useRuntimeConfig();
const isProduction = runtimeConfig.public.mode === 'production';
const hasBlogPosts = computed(() => posts.value.length > 0);

useInfiniteScroll(document, loadMore, {
  distance: 100,
  canLoadMore: () => cursor.value !== undefined,
});

async function loadMore() {
  if (!cursor.value || loading.value) return;

  loading.value = true;
  try {
    const res = await $fetch('/api/posts', {
      query: { limit: 50, cursor: cursor.value },
    });
    posts.value.push(...res.posts);
    cursor.value = res.cursor;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="blog-header">
    <h1>Latest Posts</h1>
    <a
      v-if="!isProduction"
      :href="`https://whtwnd.com/${runtimeConfig.public.atproto.repo}/edit`"
      target="_blank"
    >
      (create)
    </a>
  </div>
  <div
    v-if="hasBlogPosts"
    class="posts"
  >
    <RouterLink
      v-for="post in data?.posts"
      :key="post.rkey"
      :to="`/blog/${post.rkey}`"
      class="post"
    >
      <h2>{{ post.title }}</h2>
      <time>{{ formatDate(post.createdAt) }} · {{ post.readingTime }}</time>
    </RouterLink>
  </div>
  <div v-else>
    <p
      v-if="!isProduction"
      key="dev"
    >
      No posts found
      <br>
      To see the blog posts, you need to set the <code>NUXT_PUBLIC_MODE</code> environment variable to <code>development</code> in your <code>.env</code> file.
    </p>
    <p
      v-else
      key="prod"
    >
      No posts found
    </p>
  </div>
</template>

<style scoped>
.blog-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  justify-content: space-between;
}

.posts {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.post {
  display: block;
  padding: 12px 0;
  color: var(--text-main);
  text-decoration: none;
}

.post:hover {
  color: var(--text-bright);
  text-decoration: none;
}

.post:hover time {
  color: var(--text-bright);
  text-decoration: none;
}

.post time {
  display: block;
  font-size: 0.85em;
  background: none;
  padding: 0;
  margin-top: 2px;
  color: var(--text-muted);
}

.post h2 {
  margin: 0;
  font-size: 1.15em;
  color: inherit;
  font-weight: normal;
}
</style>
