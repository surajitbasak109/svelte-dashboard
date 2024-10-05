<script>
  import Container from '$/lib/components/home/Container.svelte';
  import SectionHead from '$/lib/components/home/SectionHead.svelte';
  import formatDate from '$/utilities/format_date';

  export let data;
</script>

<svelte:head>
  <title>Blogs</title>
  <meta name="description" content="Blogs for CRM-App" />
</svelte:head>

<Container>
  <SectionHead>
    <svelte:fragment slot="title">Blog</svelte:fragment>
    <svelte:fragment slot="desc">We're a small passionate team</svelte:fragment>
  </SectionHead>

  <main class="mt-16">
    <ul class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
      {#each data.posts as post}
        <li>
          <a href={`/blog/${post.slug}`}>
            <div>
              <img
                src={post.image}
                alt={post.title}
                sizes="(max-width: 800px) 100vw, 800px"
                loading="eager"
                decoding="sync"
                class="object-cover w-full rounded-md"
                width="800"
                height="600" />
              <div class="mt-4">
                <span class="text-xs font-medium tracking-wider text-blue-400 uppercase">
                  {post.categories.join(', ')}
                </span>
                <h2 class="mt-1 text-xl font-semibold leading-snug tracking-tight">
                  {post.title}
                </h2>
                <div class="flex gap-2 mt-3 text-sm">
                  <span class="text-gray-400">
                    {post.author}
                  </span>
                  <span class="text-gray-400">•</span>
                  <time class="text-gray-400" datetime={formatDate(post.date)}>
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </main>
</Container>
