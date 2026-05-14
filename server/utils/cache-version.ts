const BLOG_KEY = 'blogVersion';
const AVATAR_KEY = 'avatarVersion';

function metaStorage() {
  return useStorage('siteMeta');
}

export async function getBlogCacheVersion(): Promise<string> {
  const v = await metaStorage().getItem<string>(BLOG_KEY);
  return v ?? '0';
}

export async function bumpBlogCacheVersion(): Promise<string> {
  const storage = metaStorage();
  const next = String(Date.now());
  await storage.setItem(BLOG_KEY, next);
  return next;
}

export async function getAvatarCacheVersion(): Promise<string> {
  const v = await metaStorage().getItem<string>(AVATAR_KEY);
  return v ?? '0';
}

export async function bumpAvatarCacheVersion(): Promise<string> {
  const storage = metaStorage();
  const next = String(Date.now());
  await storage.setItem(AVATAR_KEY, next);
  return next;
}
