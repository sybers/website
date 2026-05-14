import { AtpAgent } from '@atproto/api';
import { defineCachedEventHandler } from 'nitropack/runtime';
import { isPostAccessible } from '../../../shared/utils/posts-visibility';
import { DEFAULT_BLOG_CACHE_TTL_SECONDS } from '../../../shared/cache-defaults';
import { getBlogCacheMaxAge } from '../../utils/cache-ttl';
import { getBlogCacheVersion } from '../../utils/cache-version';

function resolveBlogCacheMaxAge(): number {
  try {
    return getBlogCacheMaxAge(useRuntimeConfig());
  } catch {
    return DEFAULT_BLOG_CACHE_TTL_SECONDS;
  }
}

const blogCacheMaxAge = resolveBlogCacheMaxAge();

export default defineCachedEventHandler(
  async (event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const isProduction = runtimeConfig.public.mode === 'production';

    const atpConfig = runtimeConfig.public.atproto;

    const atpAgent = new AtpAgent({ service: atpConfig.service });

    const rkey = getRouterParam(event, 'rkey');

    if (!rkey) {
      throw createError({
        status: 400,
        statusText: 'rkey is required',
      });
    }

    const { data } = await atpAgent.com.atproto.repo.getRecord({
      repo: atpConfig.repo,
      collection: atpConfig.postsCollection,
      rkey,
    });

    const postEntry: PostEntry = {
      title: data.value.title as string,
      content: data.value.content as string,
      createdAt: data.value.createdAt as string,
      visibility: data.value.visibility as 'public' | 'url' | 'author',
      readingTime: readingTime(data.value.content as string),
      rkey: data.value.rkey as string,
    };

    if (!isPostAccessible({ post: postEntry, isProduction })) {
      return undefined;
    }

    return postEntry;
  },
  {
    name: 'atproto-post',
    group: 'nitro/handlers',
    maxAge: blogCacheMaxAge,
    swr: false,
    getKey: async (event) => {
      const runtimeConfig = useRuntimeConfig(event);
      const atp = runtimeConfig.public.atproto;
      const rkey = getRouterParam(event, 'rkey') ?? 'missing';
      const version = await getBlogCacheVersion();
      return [
        'v',
        version,
        '_repo',
        atp.repo,
        '_coll',
        atp.postsCollection,
        '_mode',
        runtimeConfig.public.mode,
        '_rkey',
        rkey,
      ].join('');
    },
  },
);
