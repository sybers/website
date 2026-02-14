import { AtpAgent } from "@atproto/api";

type PostEntry = {
  title: string
  content: string
  createdAt: string
  visibility: 'public' | 'url' | 'author'
  readingTime: string
  rkey: string
}

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function shouldShowPost({ post, isProduction }: { post: PostEntry; isProduction: boolean }) {
  return post.visibility === 'public' || !isProduction;
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const isProduction = runtimeConfig.public.mode === 'production';

  const atpConfig = runtimeConfig.public.atproto;

  const atpAgent = new AtpAgent({ service: atpConfig.service })
  
    const rkey = getRouterParam(event, 'rkey')

    if (!rkey) {
      throw createError({
        status: 400,
        statusText: 'rkey is required',
      })
    }
  
    const { data } = await atpAgent.com.atproto.repo.getRecord({
      repo: atpConfig.repo,
      collection: atpConfig.collection,
      rkey,
    });

    const postEntry: PostEntry = {
      title: data.value.title as string,
      content: data.value.content as string,
      createdAt: data.value.createdAt as string,
      visibility: data.value.visibility as 'public' | 'url' | 'author',
      readingTime: readingTime(data.value.content as string),
      rkey: data.value.rkey as string,
    }

    if (!shouldShowPost({ post: postEntry, isProduction })) {
      return undefined;
    }

    return postEntry;
  })