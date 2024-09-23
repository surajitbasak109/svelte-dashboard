<script lang="ts">
  import Link from '../../UI/Link.svelte';
  import Container from '../Container.svelte';
  import MenuIcon from './MenuIcon.svelte';

  let crmAppMenu: HTMLElement;

  function toggleHide() {
    if (crmAppMenu.classList.contains('hidden')) {
      crmAppMenu.classList.remove('hidden');
    } else {
      crmAppMenu.classList.add('hidden');
    }
  }

  const menuItems = [
    { title: 'Blog', path: '/blog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'FAQs', path: '/faqs' },
    { title: 'Features', path: '/features' },
    { title: 'Career', path: '/career' }
  ];
</script>

<Container>
  <header class="flex flex-col items-center justify-between my-5 lg:flex-row">
    <div class="flex items-center justify-between w-full lg:w-auto">
      <a href="/" class="text-lg">
        <span class="font-bold text-slate-800">CRM</span>
        <span class="text-slate-500">App</span>
      </a>
      <div class="block lg:hidden">
        <MenuIcon class="w-4 h-4 text-gray-800" on:click={() => toggleHide()} />
      </div>
    </div>
    <nav class="hidden w-full mt-2 lg:flex lg:w-auto lg:mt-0" bind:this={crmAppMenu}>
      <ul class="flex flex-col lg:flex-row lg:gap-3">
        {#each menuItems as { title, path }, i (title)}
          <li>
            <a class="flex items-center py-2 text-gray-600 lg:px-3 hover:text-gray-900" href={path}>
              <span>{title}</span>
            </a>
          </li>
        {/each}
      </ul>
      <div class="flex items-center gap-4 mt-3 lg:hidden">
        <Link href="/login" style="muted" block={true} size="md">Log in</Link>
        <Link href="/register" size="md" block={true}>Sign up</Link>
      </div>
    </nav>
    <div class="items-center hidden gap-4 lg:flex">
      <a href="/login">Login</a>
      <Link href="/register" size="md">Sign up</Link>
    </div>
  </header>
</Container>
