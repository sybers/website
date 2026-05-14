# sybers.fr

[sybers](https://sybers.fr) personal space on the internet.

Built with [Nuxt](https://nuxt.com/), blog posts are fetched from the [AT Protocol](https://atproto.com/) and written using the [WhiteWind](https://whtwnd.com/) lexicons.

## Setup

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in the values:

```bash
cp .env.example .env
```

Add your own configuration values to the `.env` file to customize the website.

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## ATProto cache

Blog list/detail responses and the Bluesky avatar are cached with Nitro (`defineCachedEventHandler`). Defaults: **12h** for blog, **24h** for avatar. Configure via `runtimeConfig.cache` in [`nuxt.config.ts`](./nuxt.config.ts) or env vars in [`.env.example`](./.env.example).

After publishing a post, invalidate the blog cache immediately:

```bash
curl -X POST "https://your-domain/api/cache/purge" \
  -H "content-type: application/json" \
  -H "x-cache-token: $NUXT_CACHE_PURGE_TOKEN" \
  -d '{"scope":"blog"}'
```

Use `"scope":"avatar"` or `"scope":"all"` when needed. Set `NUXT_CACHE_PURGE_TOKEN` in production; without it, purge returns `401`.

Preview the production build locally:

```bash
pnpm preview
```

## License

[MIT](./LICENSE.md)
