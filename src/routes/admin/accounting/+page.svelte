<script lang="ts">
  import AuthButton from '$/lib/components/UI/AuthButton.svelte';
  import Input from '$/lib/components/UI/Input.svelte';
  import Select from '$/lib/components/UI/Select.svelte';
  import { page } from '$app/stores';
  import { getFlash } from 'sveltekit-flash-message';
  const flash = getFlash(page);

  let accountTypeId = 0;
  let name = '';
  let description = '';
  let balance = 0;

  async function handleAccountSubmit() {
    console.log(name, accountTypeId, balance, description);

    try {
      const response = await fetch('/admin/accounting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ name, accountTypeId, balance, description })
      });

      const result = await response.json();

      if (response.ok) {
        $flash = { type: 'success', message: result.message };
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        $flash = { type: 'error', message: result.message };
      }
    } catch (e) {
      console.error(e);
    } finally {
      name = '';
      accountTypeId = 0;
      balance = 0;

      setTimeout(() => {
        $flash = undefined;
      }, 2000);
    }
  }

  export let data;
</script>

<svelte:head>
  <title>Accounting</title>
</svelte:head>

<form on:submit|preventDefault={handleAccountSubmit}>
  <Input
    label="Account name"
    id="name"
    type="text"
    name="name"
    bind:value={name}
    class="mb-3"
    required />

  <fieldset class="mb-3">
    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">
      Description
    </label>
    <textarea
      name="description"
      id="description"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      bind:value={description} />
  </fieldset>

  <Select
    class="mb-3"
    id="accounting-type"
    label="Accounting type"
    options={data.accountTypeSelect}
    bind:selected={accountTypeId}
    placeholder="Select an account type"
    name="type" />

  <Input
    label="Balance"
    id="balance"
    type="text"
    name="name"
    bind:value={balance}
    class="mb-3"
    required />

  <AuthButton type="submit">Save</AuthButton>
</form>
