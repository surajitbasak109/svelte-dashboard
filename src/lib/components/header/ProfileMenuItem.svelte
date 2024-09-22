<script lang="ts">
  let className = '';
  export { className as class };
  export let href: string;
</script>

<a
  {href}
  class={`menu-list-item text-black/[.87] min-h-[40px] cursor-pointer select-none flex items-center tracking-normal outline-none px-4 relative ${className}`}
  role="menuitem">
  <span>
    <slot></slot>
  </span>
</a>
