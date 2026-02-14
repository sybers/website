import { AtpAgent, AtUri } from '@atproto/api'

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function shouldShowPost({ post, isProduction }: { post: PostEntry; isProduction: boolean }) {
  return post.visibility === 'public' || !isProduction;
}

type PostEntry = {
  title: string
  content: string
  createdAt: string
  visibility: 'public' | 'url' | 'author'
  readingTime: string
  rkey: string
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const isProduction = runtimeConfig.public.mode === 'production';

  const atpConfig = runtimeConfig.public.atproto;

  const agent = new AtpAgent({ service: atpConfig.service })
  
  const { limit = '10', cursor } = getQuery(event)

  const res = await agent.com.atproto.repo.listRecords({
    repo: atpConfig.repo,
    collection: atpConfig.collection,
    limit: Number(limit),
    cursor: cursor as string | undefined,
  })

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
  }).filter((post) => shouldShowPost({ post, isProduction }));

  return {
    posts,
    cursor: res.data.cursor,
  }
})
