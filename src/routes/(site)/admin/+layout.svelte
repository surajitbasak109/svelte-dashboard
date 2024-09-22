<script lang="ts">
  import '$/app.css';
  import Header from '$lib/components/header/Header.svelte';
  import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  import Content from '$/lib/components/content/Content.svelte';
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
