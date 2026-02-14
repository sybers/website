// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
    'nuxt-og-image'
  ],

  app: {
    head: {
      title: 'Stanyslas Bres',
      titleTemplate: '%s — Stanyslas Bres',
      htmlAttrs: {
        lang: 'en',
      },
    }
  },

  runtimeConfig: {
    public: {
      mode: 'production' as 'production' | 'development',
      atproto: {
        service: 'https://bsky.social',
        repo: '',
        collection: 'com.whtwnd.blog.entry',
      }
    }
  }
})
