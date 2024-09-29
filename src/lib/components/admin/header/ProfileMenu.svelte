<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  // @ts-ignore
  import RawMaterialSymbolsPerson from '~icons/material-symbols/person?raw&width=24&height=24&class=icon';
  // @ts-ignore
  import RawMaterialSymbolsLogoutSharp from '~icons/material-symbols/logout-sharp?raw&width=24&height=24&class=icon';
  import ProfileMenuItem from './ProfileMenuItem.svelte';
  import clickOutside from '$lib/click-outside';
  import logout from '$/utilities/logout';
  import isPossiblyMobile from '$/utilities/is_possibly_mobile';

  const menuWidth = isPossiblyMobile ? 250 : 300;
  const leftSpacing = isPossiblyMobile ? 10 : 20;

  let menuStyle = {
    'min-width': `${menuWidth}px`,
    top: '73px',
    left: `calc(100vw - ${menuWidth + leftSpacing}px)`,
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

  function onLogoutClick() {
    clickOutise();
    logout();
  }

  export { isOpen as isMenuOpen };
</script>

{#if isOpen}
  <div
    class="fixed inline-block menu-content"
    role="menu"
    style={cssVarStyles}
    use:clickOutside={'.ignore-me'}
    on:click_outside={() => clickOutise()}>
    <div class="bg-white rounded-none menu-list text-black/[.87] border-white">
      <ProfileMenuItem href="/admin/profile" on:click={clickOutise}>
        {@html RawMaterialSymbolsPerson} &emsp; Profile
      </ProfileMenuItem>
      <ProfileMenuItem href="#" class="!text-[#f44336] !:caret-[#f44336]" on:click={onLogoutClick}>
        {@html RawMaterialSymbolsLogoutSharp} &emsp; Logout
      </ProfileMenuItem>
    </div>
  </div>
{/if}
