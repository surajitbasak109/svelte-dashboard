<script>
  import Container from '$/lib/components/home/Container.svelte';
  import SectionHead from '$/lib/components/home/SectionHead.svelte';
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<Container>
  <SectionHead>
    <svelte:fragment slot="title">About</svelte:fragment>
    <svelte:fragment slot="desc">We're a small passionate team</svelte:fragment>
  </SectionHead>

  <div class="flex flex-col max-w-4xl gap-3 mx-auto mt-16">
    <h2 class="text-3xl font-bold text-gray-800">Empowering the world with CRM-App</h2>
    <p class="text-lg leading-relaxed text-slate-500">
      We're a multi-cultural team from around the world! We come from diverse backgrounds, bringing
      different personalities, experiences and skills to the job. This is what makes our team so
      special.
    </p>
  </div>
</Container>
