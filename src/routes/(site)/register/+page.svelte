<script lang="ts">
  import AuthButton from '$/lib/components/UI/AuthButton.svelte';
  import Input from '$/lib/components/UI/Input.svelte';
  import logo from '$assets/logo.png';
  import type { PageData, ActionData } from './$types.js';
  export let form: ActionData;

  let email = '';
  let password = '';
  let confirmPassword = '';

  if (form?.email) {
    email = form?.email;
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
  <header class="sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <img class="mx-auto" src={logoSvg} width="200" alt="CRM App" /> -->
    <img src={logo} alt="CRM App" class="w-auto h-10 mx-auto" />
    <h1 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
      Create an account
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
      <Input
        label="Confirm password"
        id="confirm-password"
        type="password"
        bind:value={confirmPassword}
        autocomplete="current-password"
        name="confirm-password"
        required />

      <div class="mt-2">
        <AuthButton type="submit">Create an account</AuthButton>
      </div>

      <div class="flex items-center justify-start mt-10 text-sm gap-x-1">
        <p class="text-sm text-center text-gray-500">
          Already a member?
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login here
          </a>
        </p>
      </div>
    </form>
  </section>
</div>
