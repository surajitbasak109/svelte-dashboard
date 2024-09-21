<script lang="ts">
  // @ts-ignore
  import RawMaterialSymbolsDashboard from '~icons/material-symbols/dashboard?raw&width=24&height=24&class=icon';
  // @ts-ignore
  import RawMaterialSymbolsSettings from '~icons/material-symbols/settings?raw&width=24&height=24&class=icon';
  // @ts-ignore
  import RawMdiAccountGroup from '~icons/mdi/account-group?raw&width=24px&height=24px&class=icon';
  // @ts-ignore
  import RawMdiSitemapOutline from '~icons/mdi/sitemap-outline?raw&width=24px&height=24px&class=icon';
  import SidebarAnchorMenuItem from './SidebarAnchorMenuItem.svelte';
  import SidebarMenuGroup from './SidebarMenuGroup.svelte';
  import { sidebar_status, sidebar_width } from '$/store/sidebar_status';

  $: sidebar_status_value = $sidebar_status;
  $: sidebar_width_value = $sidebar_width;
</script>

<nav
  class="navigation-drawer z-[4] bg-[#242939] fixed flex flex-col left-0 max-w-full overflow-hidden pointer-events-auto transition-[transform,visibility,width]"
  style={`height:100vh; top:70px; max-height:calc(100% - 70px); transform:${sidebar_status_value == 'HIDDEN' ? 'translateX(-100%)' : 'translateX(0%)'}; width:${sidebar_width_value}px`}>
  <div class="h-full overflow-x-hidden overflow-y-auto navigation-drawer-content">
    <div class="mt-2 text-white rounded-none menu-list border-[#1e1e1e]">
      <SidebarAnchorMenuItem href="/">
        <div slot="icon">
          {@html RawMaterialSymbolsDashboard}
        </div>
        <div slot="title">Dashboard</div>
      </SidebarAnchorMenuItem>
      <SidebarMenuGroup>
        <SidebarAnchorMenuItem href="/people" class="!pl-12">
          <div slot="icon">{@html RawMdiAccountGroup}</div>
          <div slot="title">Summary</div>
        </SidebarAnchorMenuItem>
        <SidebarAnchorMenuItem href="/people/org" class="!pl-12">
          <div slot="icon">{@html RawMdiSitemapOutline}</div>
          <div slot="title">Org Chart</div>
        </SidebarAnchorMenuItem>
      </SidebarMenuGroup>
      <SidebarAnchorMenuItem href="/settings">
        <div slot="icon">
          {@html RawMaterialSymbolsSettings}
        </div>
        <div slot="title">Settings</div>
      </SidebarAnchorMenuItem>
    </div>
  </div>
</nav>
