<script setup lang="ts">
const { data: avatarUrl } = await useAsyncData('bsky-avatar', async () => {
  const profile = await $fetch<{ avatar?: string }>('https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile', {
    params: { actor: 'sybers.fr' },
  });
  return profile.avatar ?? null;
});

const links = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
];
</script>

<template>
  <header>
    <nav>
      <NuxtImg
        v-if="avatarUrl"
        :src="avatarUrl"
        alt="Profile picture"
        class="avatar"
        width="32"
        height="32"
      />
      <ul>
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

nav > ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav > ul > li {
  display: inline-block;
}

nav > ul > li > a {
  text-decoration: none;
}

nav > ul > li > a:hover {
  font-weight: bold;
}

nav > ul > li > a.router-link-active {
  text-decoration: underline;
}

.avatar {
  border-radius: 50%;
  display: block;
}
</style>
