<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';

  let className = '';
  export let disabled = false;
  export { className as class };
</script>

<button
  on:click={() => dispatch('click')}
  {type}
  class={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-600 ${className}`}
  {disabled}
  >
  <slot></slot>
</button>
