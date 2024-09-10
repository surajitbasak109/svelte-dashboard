<script lang="ts">
	// @ts-ignore
	import RawMaterialSymbolsViewList from '~icons/material-symbols/view-list-sharp?raw&width=24px&height=24px';
	// @ts-ignore
	import RawMdiChevronDown from '~icons/mdi/chevron-down?raw&width=24px&height=24px';
	import BasicButton from '$lib/components/UI/BasicButton.svelte';
	import ProfileMenu from '$lib/components/header/ProfileMenu.svelte';
	import { appStore, isSidebarHiddenStorageKey } from '$stores/AppStore';

	export const config = {
		appName: 'Dashboard',
		user: {
			initial: 'SB',
			organization: {
				name: 'New Horizon',
				imageLink: 'https://placehold.co/80x60'
			}
		}
	};
	let isProfileMenuOpen = false;

	function setIsProfileMenuOpen(isOpen = true) {
		isProfileMenuOpen = isOpen;
	}

	function toggleSidebar() {
		appStore.update((value) => {
			localStorage.setItem(isSidebarHiddenStorageKey, String(!value.isSidebarHidden));
			return {
				...value,
				isSidebarHidden: !value.isSidebarHidden,
			};
		});
	}
</script>

<header class="header" style="left: 0; right: 0; margin-top: 0; transform: translateY(0px);">
	<div
		style="height: 70px;"
		class="toolbar-content flex items-center relative z-0 py-[4px] px-[16px]"
	>
		<BasicButton class="ml-[-12px] h-12 w-12" on:click={() => toggleSidebar()}>
			{@html RawMaterialSymbolsViewList}
		</BasicButton>
		<a href="/" target="_blank" class="sm:mx-2">{config.appName}</a>
		<div class="flex-grow"></div>
		<div class="flex-grow"></div>
		<div class="user text-center border-l-[#d8d8d8] min-w-[340px]">
			<div class="flex items-center content-center flex-wrap m-[-12px] flex-[0_0_25%] gap-x-3">
				<div class="flex flex-row max-w-[25%]">
					<div
						style="width: 40px; height: 40px; min-width: 40px; background-color: rgba(112, 57, 70); border-color: rgb(112, 57, 70); border-radius: 500px; display: block;"
						class="relative m-auto overflow-hidden text-center align-middle shadow cursor-pointer"
					>
						<h2 class="text-white text-[14px] caret-white font-[400] mt-[11px] mb-0">
							{config.user.initial}
						</h2>
					</div>
				</div>
				<div
					id="app-bar-role-and-name"
					class=" app-bar px-0 mx-0 cursor-pointer flex-[0_0_75%] max-w-[75%]"
				>
					<div class="flex mt-1">
						<span class="mx-0 my-auto">{config.user.organization.name}</span>
						<div class="flex items-center p-0 mx-2">
							<img src={config.user.organization.imageLink} alt="User's Organization" />
						</div>
						<BasicButton
							on:click={() => setIsProfileMenuOpen(true)}
							class="min-w-0 min-h-0 p-0 my-auto ml-2 text-xs w-7 h-7"
						>
							{@html RawMdiChevronDown}
						</BasicButton>
					</div>
				</div>
			</div>
		</div>
	</div>

	<ProfileMenu on:setIsOpen={() => setIsProfileMenuOpen(false)} isMenuOpen={isProfileMenuOpen} />
</header>
