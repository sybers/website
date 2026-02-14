<script setup lang="ts">
import { useBlogPost } from '~/composables/useBlogPost';

const route = useRoute();

const { data } = await useBlogPost(route.params.rkey as string);
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}
</script>

<template>
  <div>
    <h1>{{ data?.title }}</h1>
    <p>{{ formatDate(data?.createdAt) }} · {{ data?.readingTime }}</p>
    <MDC :value="data!.content" tag="article" />
  </div>
</template>