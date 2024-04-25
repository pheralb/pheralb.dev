import { getPosts } from '@/server';
import { json } from '@sveltejs/kit';

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
