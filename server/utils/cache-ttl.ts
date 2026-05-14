import {
  DEFAULT_AVATAR_CACHE_TTL_SECONDS,
  DEFAULT_BLOG_CACHE_TTL_SECONDS,
} from '../../shared/cache-defaults';

function normalizeTtl(value: unknown, fallback: number): number {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) {
    return Math.floor(n);
  }
  return fallback;
}

/**
 * Resolves blog cache maxAge (seconds) for Nitro cached handlers.
 * Prefer `runtimeConfig` (Nuxt merges env + defaults); fall back to shared defaults.
 */
export function getBlogCacheMaxAge(runtime: { cache?: { blogTtlSeconds?: number } }): number {
  return normalizeTtl(
    runtime.cache?.blogTtlSeconds,
    DEFAULT_BLOG_CACHE_TTL_SECONDS,
  );
}

/**
 * Resolves avatar cache maxAge (seconds) for Nitro cached handlers.
 */
export function getAvatarCacheMaxAge(runtime: { cache?: { avatarTtlSeconds?: number } }): number {
  return normalizeTtl(
    runtime.cache?.avatarTtlSeconds,
    DEFAULT_AVATAR_CACHE_TTL_SECONDS,
  );
}
