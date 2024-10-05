import type { Post } from '$/routes/api/posts/types';
import type { Load } from '@sveltejs/kit';
export const load: Load = async ({ fetch }) => {
  const response = await fetch('/api/posts');
  const posts: Post[] = await response.json();

  return { posts };
};
