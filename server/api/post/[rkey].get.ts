import { AtpAgent } from '@atproto/api';
import { isPostAccessible } from '../../../shared/utils/posts-visibility';

export default defineEventHandler(async (event) => {
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
});
