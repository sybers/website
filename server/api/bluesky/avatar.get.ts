import { defineCachedEventHandler } from 'nitropack/runtime';
import { DEFAULT_AVATAR_CACHE_TTL_SECONDS } from '../../../shared/cache-defaults';
import { getAvatarCacheMaxAge } from '../../utils/cache-ttl';
import { getAvatarCacheVersion } from '../../utils/cache-version';

function resolveAvatarCacheMaxAge(): number {
  try {
    return getAvatarCacheMaxAge(useRuntimeConfig());
  } catch {
    return DEFAULT_AVATAR_CACHE_TTL_SECONDS;
  }
}

const avatarCacheMaxAge = resolveAvatarCacheMaxAge();

export default defineCachedEventHandler(
  async (event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const repo = runtimeConfig.public.atproto.repo;

    const profile = await $fetch<{ avatar?: string }>(
      'https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile',
      {
        params: { actor: repo },
      },
    );

    return { avatar: profile.avatar ?? null };
  },
  {
    name: 'bluesky-avatar',
    group: 'nitro/handlers',
    maxAge: avatarCacheMaxAge,
    swr: false,
    getKey: async (event) => {
      const runtimeConfig = useRuntimeConfig(event);
      const repo = runtimeConfig.public.atproto.repo;
      const version = await getAvatarCacheVersion();
      return ['v', version, '_actor', repo].join('');
    },
  },
);
