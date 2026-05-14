declare module 'nuxt/schema' {
  interface RuntimeConfig {
    /**
     * Secret token for `POST /api/cache/purge` (header `x-cache-token`).
     * @default ""
     */
    cachePurgeToken: string;
    cache: {
      /**
       * Nitro cache TTL for blog ATProto responses (seconds).
       * @default 43200 (12 hours)
       */
      blogTtlSeconds: number;
      /**
       * Nitro cache TTL for Bluesky avatar API (seconds).
       * @default 86400 (24 hours)
       */
      avatarTtlSeconds: number;
    };
  }

  interface PublicRuntimeConfig {
    /**
     * Environment mode
     * @default "production"
     */
    mode: 'production' | 'development';
    social: {
      /**
       * GitHub username
       * @default undefined
       */
      github?: string;
      /**
       * Bluesky handle (without the @)
       * @default undefined
       */
      bluesky?: string;
      /**
       * LinkedIn username (the part after /in/)
       * @default undefined
       */
      linkedin?: string;
    };
    atproto: {
      /**
       * AT Protocol service URL
       * @default "https://bsky.social"
       */
      service: string;
      /**
       * AT Protocol repository
       * @default ""
       */
      repo: string;
      /**
       * AT Protocol collection for blog posts
       * @default "com.whtwnd.blog.entry"
       */
      postsCollection: string;
    };
  }
}

export {};
