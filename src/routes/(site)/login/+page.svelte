<script lang="ts">
  import AuthButton from '$/lib/components/UI/AuthButton.svelte';
  import Input from '$/lib/components/UI/Input.svelte';
  import logo from '$assets/logo.png';
  import type { PageData, ActionData } from './$types.js';
  export let data: PageData;
  export let form: ActionData;

  let email = '';
  let password = '';

  if (form?.email) {
    email = form?.email;
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    {#if form?.success}
      <p>Successfully logged in, welcome back {data.email}!</p>
    {/if}
  </div>
  <header class="sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <img class="mx-auto" src={logoSvg} width="200" alt="CRM App" /> -->
    <img src={logo} alt="CRM App" class="w-auto h-10 mx-auto" />
    <h1 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
      Sign in to your account
    </h1>
    {#if form?.incorrect}
      <p class="mt-3 font-semibold text-center text-red-500">Invalid email/password</p>
    {/if}
  </header>

  <section class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="post">
      <Input
        class={form?.incorrect ? 'field-error' : ''}
        label="Email address"
        id="email"
        type="email"
        bind:value={email}
        autocomplete="email"
        name="email"
        required />
      <Input
        label="Password"
        id="password"
        type="password"
        bind:value={password}
        autocomplete="current-password"
        name="password"
        required />

      <div class="mt-2">
        <AuthButton type="submit">Sign in</AuthButton>
      </div>

      <div class="flex items-center justify-between mt-10 text-sm gap-x-1">
        <p class="text-sm text-center text-gray-500">
          Not a member?
          <a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up today
          </a>
        </p>
        <a href="/forgot-password" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Forgot password?
        </a>
      </div>
    </form>
  </section>
</div>
