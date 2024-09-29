<script lang="ts">
  // @ts-ignore
  import RawMaterialSymbolsViewList from '~icons/material-symbols/view-list-sharp?raw&width=24px&height=24px';
  // @ts-ignore
  import RawMdiChevronDown from '~icons/mdi/chevron-down?raw&width=24px&height=24px';
  import BasicButton from '$lib/components/UI/BasicButton.svelte';
  import ProfileMenu from '$lib/components/admin/header/ProfileMenu.svelte';
  import { toggle_hide } from '$store/sidebar_status';
  import { get_initials } from '$/utilities/get_initials';
  import { getContext } from 'svelte';

  const user = getContext('user');

  const config = {
    appName: 'CRM App',
    user: {
      initial: get_initials($user?.name),
      name: $user?.name ?? 'Unnamed user'
    }
  };
  let isProfileMenuOpen = false;

  function setIsProfileMenuOpen(isOpen = true) {
    isProfileMenuOpen = isOpen;
  }
</script>

<header
  class="header ignore-me"
  style="left: 0; right: 0; margin-top: 0; transform: translateY(0px);">
  <div
    style="height: 70px;"
    class="toolbar-content flex items-center relative z-0 py-[4px] px-[16px]">
    <BasicButton class="ml-[-12px] h-12 w-12" on:click={() => toggle_hide()}>
      {@html RawMaterialSymbolsViewList}
    </BasicButton>
    <a href="/admin" class="text-xs sm:text-[18px] sm:mx-2">{config.appName}</a>
    <div class="flex-grow"></div>
    <div class="flex-grow"></div>
    <button
      class="user text-center border-l-[#d8d8d8] min-w-[160px] sm:min-w-[200px]"
      on:click={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
      <div class="flex items-center content-center flex-wrap m-[-12px] flex-[0_0_25%]">
        <div class="flex flex-row max-w-[25%]">
          <div
            style="width: 40px; height: 40px; min-width: 40px; background-color: rgba(112, 57, 70); border-color: rgb(112, 57, 70); border-radius: 500px; display: block;"
            class="relative m-auto overflow-hidden text-center align-middle shadow cursor-pointer">
            <h2 class="text-white text-[14px] caret-white font-[400] mt-[11px] mb-0">
              {config.user.initial}
            </h2>
          </div>
        </div>
        <div
          id="app-bar-role-and-name"
          class="app-bar px-0 mx-0 cursor-pointer flex-[0_0_75%] max-w-[75%]">
          <div class="text-xs sm:text-[18px] flex justify-end mt-1">
            <span class="mx-0 my-auto">{config.user.name}</span>
            <BasicButton class="min-w-0 min-h-0 p-0 my-auto ml-2 text-xs w-7 h-7">
              {@html RawMdiChevronDown}
            </BasicButton>
          </div>
        </div>
      </div>
    </button>
  </div>

  <ProfileMenu on:setIsOpen={() => setIsProfileMenuOpen(false)} isMenuOpen={isProfileMenuOpen} />
</header>
