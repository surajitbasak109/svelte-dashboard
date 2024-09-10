<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// @ts-ignore
	import RawMaterialSymbolsPerson from '~icons/material-symbols/person?raw&width=24&height=24&class=icon';
	// @ts-ignore
	import RawMaterialSymbolsLogoutSharp from '~icons/material-symbols/logout-sharp?raw&width=24&height=24&class=icon';
	import ProfileMenuItem from './ProfileMenuItem.svelte';
	import clickOutside from '$lib/click-outside';
	let menuStyle = {
		'min-width': '388px',
		top: '73px',
		left: 'calc(100vw - 400px)',
		'transform-origin': 'left top',
		'z-index': 8
	};

    const dispatch = createEventDispatcher();

	$: cssVarStyles = Object.entries(menuStyle)
		.map(([key, value]) => `${key}:${value}`)
		.join('; ');

	let isOpen = false;

	function clickOutise() {
		dispatch('setIsOpen');
	}

	export { isOpen as isMenuOpen };
</script>

{#if isOpen}
	<div
		class="fixed inline-block menu-content"
		role="menu"
		style={cssVarStyles}
		use:clickOutside
		on:click_outside={() => clickOutise()}
	>
		<div class="bg-white rounded-none menu-list text-black/[.87] border-white">
			<ProfileMenuItem>
				{@html RawMaterialSymbolsPerson} &emsp; Profile
			</ProfileMenuItem>
			<ProfileMenuItem class="[&&]:text-[#f44336] [&&]:caret-[#f44336]">
				{@html RawMaterialSymbolsLogoutSharp} &emsp; Logout
			</ProfileMenuItem>
		</div>
	</div>
{/if}
