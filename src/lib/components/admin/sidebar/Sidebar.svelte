<script lang="ts">
  import SidebarAnchorMenuItem from './SidebarAnchorMenuItem.svelte';
  import SidebarMenuGroup from './SidebarMenuGroup.svelte';
  import { sidebar_status, sidebar_width } from '$/store/sidebar_status';

  import sidebarMenuItems from './sidebar-menu-items';

  $: sidebar_status_value = $sidebar_status;
  $: sidebar_width_value = $sidebar_width;

  
</script>

<nav
  class="navigation-drawer z-[4] bg-[#242939] fixed flex flex-col left-0 max-w-full overflow-hidden pointer-events-auto transition-[transform,visibility,width]"
  style={`height:100vh; top:70px; max-height:calc(100% - 70px); transform:${sidebar_status_value == 'HIDDEN' ? 'translateX(-100%)' : 'translateX(0%)'}; width:${sidebar_width_value}px`}>
  <div class="h-full overflow-x-hidden overflow-y-auto navigation-drawer-content">
    <div class="mt-2 text-white rounded-none menu-list border-[#1e1e1e]">
      {#each sidebarMenuItems as { title, icon, path, children }}
        {#if children.length > 0}
          <SidebarMenuGroup {title} {icon}>
            {#each children as { title, icon, path }}
              <SidebarAnchorMenuItem href={path} class="!pl-12">
                <div slot="icon">
                  {@html icon}
                </div>
                <div slot="title">{title}</div>
              </SidebarAnchorMenuItem>
            {/each}
          </SidebarMenuGroup>
        {:else}
          <SidebarAnchorMenuItem href={path}>
            <div slot="icon">
              {@html icon}
            </div>
            <div slot="title">{title}</div>
          </SidebarAnchorMenuItem>
        {/if}
      {/each}
    </div>
  </div>
</nav>
