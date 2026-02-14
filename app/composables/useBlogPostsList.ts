import { AtUri } from '@atproto/syntax';
import { atpAgent } from "~/services/atp-agent.service";

export type PostEntry = {
  rkey: string
  title?: string
  content: string
  createdAt?: string
  visibility?: 'public' | 'url' | 'author'
  readingTime: string
}

export function useBlogPostsList() {
  return useAsyncData('posts-index', async () => {
    const { data } = await atpAgent.com.atproto.repo.listRecords({
      repo: 'sybers.fr',
      collection: 'com.whtwnd.blog.entry',
      limit: 10,
    })
    
    const posts = data.records.map((record) => {
      const uri = new AtUri(record.uri);

      return {
        title: record.value.title,
        content: record.value.content,
        createdAt: record.value.createdAt,
        visibility: record.value.visibility,
        readingTime: readingTime(record.value.content as string),
        rkey: uri.rkey,
      } as PostEntry;
    });

    return {
      posts,
      cursor: data.cursor,
    };
  });
}
