<script lang="ts">
  import AuthButton from '$/lib/components/UI/AuthButton.svelte';
  import Input from '$/lib/components/UI/Input.svelte';
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  import { getFlash } from 'sveltekit-flash-message';
  const flash = getFlash(page);

  const dispatch = createEventDispatcher();

  export let id: number | null = null;
  export let name = '';

  async function handleAccountSubmit() {
    const formData = id ? { id, name } : { name };
    try {
      const response = await fetch('/admin/accounting/types', {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        $flash = { type: 'success', message: result.message };

        setTimeout(() => {
          $flash = undefined;
        }, 2000);
      } else {
        $flash = { type: 'error', message: result.message };
        setTimeout(() => {
          $flash = undefined;
        }, 2000);
        console.error('Account type could not be created');
      }
    } catch (error) {
      console.log(error);
    }
  }

  $: formTitle = id ? 'Update account type' : 'Create new account type';
</script>

<div class="p-4 mb-3 bg-white rounded-sm shadow-lg">
  <div class="flex items-center justify-between">
    <h2 class="my-2 text-lg font-semibold">{formTitle}</h2>
    {#if id}
      <button class="text-sm text-red-700" on:click={() => dispatch('cancel')}>Cancel</button>
    {/if}
  </div>
  <form on:submit|preventDefault={handleAccountSubmit}>
    <Input
      id="name"
      label="Name"
      name="name"
      type="text"
      placeholder="Account type name"
      required
      bind:value={name}
      class="mb-3" />

    <AuthButton type="submit">Save</AuthButton>
  </form>
</div>
