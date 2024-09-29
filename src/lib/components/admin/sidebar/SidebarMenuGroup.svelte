<script lang="ts">
  // @ts-ignore
  import RawMdiChevronDown from '~icons/mdi/chevron-down?raw&width=24px&height=24px&class=icon';
  // @ts-ignore
  import RawMdiChevronUp from '~icons/mdi/chevron-up?raw&width=24px&height=24px&class=icon';

  // components
  import SidebarMenuItem from './SidebarMenuItem.svelte';

  let isExpanded = false;

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }

  export let title: string;
  export let icon: string;

  $: cssVarStyle = `${isExpanded ? '' : 'display: none'}`;
</script>

<div class="px-0 menu-list-group">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class={`menu-list-group-header menu-list-item ${isExpanded && 'darken'}`}
    tabindex="0"
    role="button"
    aria-expanded={isExpanded}
    on:click={() => toggleExpanded()}>
    <SidebarMenuItem class="!p-0 -mr-4">
      <div slot="icon">{@html icon}</div>
      <div slot="title">{title}</div>
    </SidebarMenuItem>
    <div
      class="inline-flex self-center justify-end h-6 m-0 menu-list-group-header-append-icon min-w-12">
      {#if isExpanded}
        {@html RawMdiChevronUp}
      {:else}
        {@html RawMdiChevronDown}
      {/if}
    </div>
  </div>
  <div class="menu-list-group-items" style={cssVarStyle}>
    <slot></slot>
  </div>
</div>

<style>
  .menu-list-group-header {
    color: #fff;
    min-height: 40px;
    cursor: pointer;
    user-select: none;
  }

  .darken {
    background-color: #0f1523 !important;
  }
</style>
