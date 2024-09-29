<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let className = '';
  export { className as class };
  export let href: string;

  const dispatch = createEventDispatcher();
</script>

<a
  {href}
  class={`menu-list-item text-black/[.87] min-h-[40px] cursor-pointer select-none flex items-center tracking-normal outline-none px-4 relative ${className}`}
  role="menuitem" on:click={() => dispatch('click')}>
  <span>
    <slot></slot>
  </span>
</a>
