// https://nuxt.com/docs/api/configuration/nuxt-config

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

  site: {
    name: 'Stanyslas Bres',
    url: 'https://sybers.fr',
  },

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
    public: {
      mode: 'production' as 'production' | 'development',
      atproto: {
        service: 'https://bsky.social',
        repo: '',
        collection: 'com.whtwnd.blog.entry',
      },
      social: {
        github: ''
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
