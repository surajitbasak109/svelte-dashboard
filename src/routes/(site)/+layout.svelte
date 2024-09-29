<script lang="ts">
  import Navbar from '$/lib/components/home/navbar/Navbar.svelte';
  import '$/app.css';
  import Footer from '$/lib/components/home/footer/Footer.svelte';
  import type { PageData } from './$types';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import type { UserWithoutPassword } from '$/server/auth/users';

  export let data: PageData;

  const user = writable<null | UserWithoutPassword>(null);
  $: user.set(data?.user || null);

  setContext('user', user);
</script>

<Navbar />
<slot></slot>
<Footer />

<style>
  :global(html) {
    font-family:
      Bricolage Grotesque,
      Inter Variable,
      Inter,
      ui-sans-serif,
      system-ui,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
  }
  :global(img) {
    content-visibility: auto;
  }
</style>
