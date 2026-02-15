import { AtpAgent, AtUri } from '@atproto/api';
import { isPostListable } from '../../shared/utils/posts-visibility';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const isProduction = runtimeConfig.public.mode === 'production';

  const atpConfig = runtimeConfig.public.atproto;

  const agent = new AtpAgent({ service: atpConfig.service });

  const { limit = '10', cursor } = getQuery(event);

  const res = await agent.com.atproto.repo.listRecords({
    repo: atpConfig.repo,
    collection: atpConfig.postsCollection,
    limit: Number(limit),
    cursor: cursor as string | undefined,
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
});
