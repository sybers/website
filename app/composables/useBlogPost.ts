import { atpAgent } from "~/services/atp-agent.service";

export type PostEntry = {
  uri: string
  title?: string
  content: string
  createdAt?: string
  visibility?: 'public' | 'url' | 'author'
  readingTime: string
}

export async function useBlogPost(rkey: MaybeRefOrGetter<string>) {
  return await useAsyncData(() => `post-${toValue(rkey)}`, async () => {
    const { data } = await atpAgent.com.atproto.repo.getRecord({
      repo: 'sybers.fr',
      collection: 'com.whtwnd.blog.entry',
      rkey: toValue(rkey),
    });

    return {
      title: data.value.title,
      content: data.value.content,
      createdAt: data.value.createdAt,
      visibility: data.value.visibility,
      readingTime: readingTime(data.value.content as string),
    } as PostEntry;
  });
}
