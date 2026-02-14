<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const atpConfig = runtimeConfig.public.atproto;

const { data: avatarUrl } = await useAsyncData('bsky-avatar', async () => {
  const profile = await $fetch<{ avatar?: string }>('https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile', {
    params: { actor: atpConfig.repo },
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
        width="36"
        height="36"
      />
      <ul>
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
      <div class="spacer"/>
      <ul>
        <li>
          <a href="https://bsky.app/profile/sybers.fr" target="_blank">
            <Icon size="1.5rem" name="mingcute:bluesky-social-line" />
          </a>
        </li>
        <li>
          <a href="https://github.com/sybers" target="_blank">
            <Icon size="1.5rem" name="mingcute:github-line" />
          </a>
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
  transition: transform 175ms ease-in-out;
}

.avatar:hover {
  transform: scale(1.1);
}

.spacer {
  flex: 1;
}
</style>
