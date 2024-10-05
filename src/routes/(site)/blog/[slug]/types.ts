import type { Post } from '$/routes/api/posts/types';

export type SinglePost = {
  meta: Post;
  content: ConstructorOfATypedSvelteComponent;
};
