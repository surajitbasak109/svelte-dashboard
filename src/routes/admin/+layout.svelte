<script lang="ts">
  import type { PageData } from './$types';

  import { getFlash } from 'sveltekit-flash-message';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  import '$/app.css';

  import Header from '$lib/components/admin/header/Header.svelte';
  import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';
  import Content from '$/lib/components/admin/content/Content.svelte';
  import Alert from '$/lib/components/UI/Alert.svelte';

  const flash = getFlash(page);

  export let data: PageData;

  const user = writable();
  $: user.set(data.user);

  setContext('user', user);
</script>

<Header />
<Sidebar />
<Content>
  {#if $flash}
    <div class="container flex items-center justify-center mx-auto mb-3">
      <Alert type={$flash.type} message={$flash.message} class="max-w-[80%] min-w-[300px]" />
    </div>
  {/if}
  <slot></slot>
</Content>
