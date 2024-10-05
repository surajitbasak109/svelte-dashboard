import { error } from '@sveltejs/kit';
import type { SinglePost } from './types.js';

export async function load({ params }): Promise<SinglePost> {
  try {
    const post = await import(`$/posts/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    console.error(404, 'Post not found', e);
    throw error(404, `Could not find post ${params.slug}`);
  }
}
