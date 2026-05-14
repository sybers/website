import {
  bumpAvatarCacheVersion,
  bumpBlogCacheVersion,
  getAvatarCacheVersion,
  getBlogCacheVersion,
} from '../../utils/cache-version';

type PurgeScope = 'blog' | 'avatar' | 'all';

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST');

  const runtimeConfig = useRuntimeConfig(event);
  const token = getHeader(event, 'x-cache-token');

  if (!runtimeConfig.cachePurgeToken || token !== runtimeConfig.cachePurgeToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  let body: { scope?: PurgeScope } = {};
  try {
    body = await readBody(event);
  } catch {
    body = {};
  }

  const scope: PurgeScope = body.scope ?? 'blog';

  if (scope !== 'blog' && scope !== 'avatar' && scope !== 'all') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid scope',
    });
  }

  const versions: { blog: string; avatar: string } = {
    blog: await getBlogCacheVersion(),
    avatar: await getAvatarCacheVersion(),
  };

  if (scope === 'blog' || scope === 'all') {
    versions.blog = await bumpBlogCacheVersion();
  }
  if (scope === 'avatar' || scope === 'all') {
    versions.avatar = await bumpAvatarCacheVersion();
  }

  return {
    ok: true,
    scope,
    versions,
  };
});
