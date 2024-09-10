<script lang="ts">
	// @ts-ignore
	import RawMaterialSymbolsDashboard from '~icons/material-symbols/dashboard?raw&width=24&height=24&class=icon';
	import SidebarAnchorMenuItem from './SidebarAnchorMenuItem.svelte';
	import SidebarMenuGroup from './SidebarMenuGroup.svelte';
	import { appStore } from '$stores/AppStore';
	import { onDestroy } from 'svelte';

	let isSidebarHidden = false;

	const unsubscribe = appStore.subscribe((value) => {
		isSidebarHidden = value.isSidebarHidden;
	});

	onDestroy(unsubscribe);
</script>

<nav
	class="navigation-drawer z-[4] bg-[#242939] fixed flex flex-col left-0 max-w-full overflow-hidden pointer-events-auto transition-[transform,visibility,width]"
	style={`height:100vh; top:70px; max-height:calc(100% - 70px); transform:${isSidebarHidden ? 'translateX(-100%)' : 'translateX(0%)'}; width:256px`}
>
	<div class="h-full overflow-x-hidden overflow-y-auto navigation-drawer-content">
		<div class="mt-2 text-white rounded-none menu-list border-[#1e1e1e]">
			<SidebarAnchorMenuItem href="/" isActive={true}>
				<div slot="icon">
					{@html RawMaterialSymbolsDashboard}
				</div>
				<div slot="title">Dashboard</div>
			</SidebarAnchorMenuItem>
			<SidebarMenuGroup></SidebarMenuGroup>
		</div>
	</div>
</nav>
