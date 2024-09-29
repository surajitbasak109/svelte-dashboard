<script lang="ts">
  import '$/app.css';
  import Header from '$lib/components/admin/header/Header.svelte';
  import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';
  import Content from '$/lib/components/admin/content/Content.svelte';
  import type { PageData } from './$types';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let data: PageData;

  const user = writable();
  $: user.set(data.user);

  setContext('user', user);
</script>

<Header />
<Sidebar />
<Content>
  <slot></slot>
</Content>
