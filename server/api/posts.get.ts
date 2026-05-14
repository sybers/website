import { AtpAgent, AtUri } from '@atproto/api';
import { defineCachedEventHandler } from 'nitropack/runtime';
import { isPostListable } from '../../shared/utils/posts-visibility';
import { DEFAULT_BLOG_CACHE_TTL_SECONDS } from '../../shared/cache-defaults';
import { getBlogCacheMaxAge } from '../utils/cache-ttl';
import { getBlogCacheVersion } from '../utils/cache-version';

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

    const agent = new AtpAgent({ service: atpConfig.service });

    const res = await agent.com.atproto.repo.listRecords({
      repo: atpConfig.repo,
      collection: atpConfig.postsCollection,
      limit: 50,
    });

    const posts = res.data.records.map((record) => {
      const uri = new AtUri(record.uri);

      return {
        title: record.value.title,
        content: record.value.content,
        createdAt: record.value.createdAt,
        visibility: record.value.visibility,
        readingTime: readingTime(record.value.content as string),
        rkey: uri.rkey,
      } as PostEntry;
    }).filter((post) => isPostListable({ post, isProduction }));

    return {
      posts,
      cursor: res.data.cursor,
    };
  },
  {
    name: 'atproto-posts',
    group: 'nitro/handlers',
    maxAge: blogCacheMaxAge,
    swr: false,
    getKey: async (event) => {
      const runtimeConfig = useRuntimeConfig(event);
      const atp = runtimeConfig.public.atproto;
      const { limit = '10', cursor } = getQuery(event);
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
      ].join('');
    },
  },
);
