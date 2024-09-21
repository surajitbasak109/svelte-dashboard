<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let className = '';
  export { className as class };
</script>

<button
  on:click={() => dispatch('click')}
  class={`btn relative transition-opacity rounded-[50%] inline-flex justify-center items-center flex-auto flex-grow-0 flex-shrink-0 font-[500] tracking-[0.0892857143em] select-none align-middle whitespace-nowrap ${className}`}>
  <span class="flex items-center flex-auto flex-grow-0 btn-cotnent">
    <slot></slot>
  </span>
</button>
