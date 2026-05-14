// https://nuxt.com/docs/api/configuration/nuxt-config

import {
  DEFAULT_AVATAR_CACHE_TTL_SECONDS,
  DEFAULT_BLOG_CACHE_TTL_SECONDS,
} from './shared/cache-defaults';

function createUmamiScript(env: Record<string, string | undefined>) {
  if (env.NODE_ENV !== 'production') return undefined;

  if (!env.UMAMI_SCRIPT_SRC || !env.UMAMI_WEBSITE_ID) {
    console.log('Missing Umami script src or website ID, skipping...');
    return undefined;
  }

  return {
    'src': env.UMAMI_SCRIPT_SRC,
    'async': true,
    'data-website-id': env.UMAMI_WEBSITE_ID,
  };
}

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@nuxtjs/seo',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    'nuxt-og-image',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Stanyslas Bres',
      titleTemplate: '%s — Stanyslas Bres',
      htmlAttrs: {
        lang: 'en',
      },
      script: [createUmamiScript(process.env)],
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/shiki.css'],

  mdc: {
    highlight: {
      theme: {
        default: 'rose-pine-dawn',
        dark: 'aurora-x',
      },
      wrapperStyle: true,
      langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'bash', 'md', 'mdc', 'yaml', 'dotenv'],
    },
  },

  runtimeConfig: {
    cachePurgeToken: '',
    cache: {
      blogTtlSeconds: DEFAULT_BLOG_CACHE_TTL_SECONDS,
      avatarTtlSeconds: DEFAULT_AVATAR_CACHE_TTL_SECONDS,
    },
    public: {
      mode: 'production',
      atproto: {
        service: 'https://bsky.social',
        repo: '',
        postsCollection: 'com.whtwnd.blog.entry',
      },
      social: {
        github: '',
        bluesky: '',
        linkedin: '',
      },
    },
  },

  nitro: {
    storage: {
      siteMeta: {
        driver: 'memory',
      },
    },
  },
  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        arrowParens: true,
        braceStyle: '1tbs',
      },
    },
  },
});
