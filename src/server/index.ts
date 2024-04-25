import type { Post } from '@/types/post.type';

export async function getPosts(): Promise<Post[]> {
  let posts: Post[] = [];

  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return posts;
}

export async function getSinglePost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();

  for (const post of posts) {
    if (post.slug === slug) {
      return post;
    }
  }

  return undefined;
}
