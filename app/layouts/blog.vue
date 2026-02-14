<template>
  <div>
    <AppHeader />
    <h1>Blog</h1>
    <p class="blog-links">
      <a href="https://bsky.app/profile/sybers.fr" target="_blank">Bluesky</a>
      ·
      <a href="https://whtwnd.com/sybers.fr" target="_blank">WhTwnd</a>
    </p>
    <slot />
  </div>
</template>

<style scoped>
.blog-links {
  color: var(--text-muted);
  font-size: 0.85em;
  margin-top: 0;
}
</style>