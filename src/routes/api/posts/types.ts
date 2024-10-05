export type Categories = 'sveltekit' | 'svelte';

export type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  categories: Categories[];
  published: boolean;
  author: string;
  image: string;
};
