<script lang="ts">
  import '$/app.css';
  import Header from '$lib/components/admin/header/Header.svelte';
  import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';
  import Content from '$/lib/components/admin/content/Content.svelte';
  import type { PageData } from './$types';
  import { setUserToState } from '$/store/user';

  export let data: PageData;

  if (data.user) {
    setUserToState(data.user);
  }
</script>

<Header />
<Sidebar />
<Content>
  <slot></slot>
</Content>
