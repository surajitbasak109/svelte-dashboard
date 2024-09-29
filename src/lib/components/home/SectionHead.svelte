<script lang="ts">
  export const align: 'center' | null = 'center';
  $: classList = ['mt-16', align === 'center' && 'text-center', $$props?.class ?? ''].join(' ');
</script>

<div class={classList}>
  <h1 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">
    <slot name="title">Title</slot>
  </h1>
  <p class="mt-4 text-lg text-slate-600">
    <slot name="desc">Some description goes here</slot>
  </p>
</div>
