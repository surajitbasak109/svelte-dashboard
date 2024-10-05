<script>
  import Container from '$/lib/components/home/Container.svelte';
  import formatDate from '$/utilities/format_date';

  export let data;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>
<Container>
  <article class="max-w-3xl mx-auto mt-14">
    <hgroup class="text-center">
      <div class="flex justify-center gap-x-3">
        {#each data.meta.categories as category}
          <span class="text-sm font-medium tracking-wider text-blue-400 uppercase">
            #{category}
          </span>
        {/each}
      </div>
      <h1 class="mt-1 text-3xl font-bold lg:text-4xl lg:tracking-tight lg:leading-tight">
        {data.meta.title}
      </h1>
      <div class="max-w-3xl mx-auto mt-6 prose prose-headings:mb-2 prose-headings:mt-8">
        <span class="text-gray-400">{data.meta.author}</span>
        <span class="text-gray-400">•</span>
        <time class="text-gray-400" datetime={formatDate(data.meta.date)}>
          {formatDate(data.meta.date)}
        </time>
      </div>
    </hgroup>

    <div class="max-w-3xl mx-auto mt-6 prose prose-lg">
      <svelte:component this={data.content} />
    </div>

    <div class="mt-8 text-center">
      <a href="/blog" class="px-5 py-3 transition bg-gray-100 rounded-md hover:bg-gray-200">
        ← Back to Blog
      </a>
    </div>
  </article>
</Container>
