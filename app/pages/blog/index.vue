<script setup lang="ts">
import { useBlogPostsList } from '~/composables/useBlogPostsList';

const { data } = await useBlogPostsList();
</script>

<template>
  <div class="posts">
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
</template>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
}

.post {
  display: block;
  padding: 12px 0;
  color: var(--text-main);
  text-decoration: none;
}

.post:after {
  content: '';
  display: block;
  width: 10%;
  height: 1px;
  background: var(--border);
  margin-top: 12px;
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
