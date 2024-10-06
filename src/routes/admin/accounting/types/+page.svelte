<script lang="ts">
  import AccountTypeForm from '$/lib/components/admin/forms/AccountTypeForm.svelte';
  import Pagination from '$/lib/components/Pagination.svelte';
  import ConfirmModal from '$/lib/components/UI/ConfirmModal.svelte';
  import formatDate from '$/utilities/format_date';
  import { page } from '$app/stores';
  import { getFlash } from 'sveltekit-flash-message';
  const flash = getFlash(page);

  let id: number | null = null;
  let deleteId: number | null = null;
  let name = '';
  let showConfirmModal = false;

  export let data;

  function onEdit(editId: number) {
    id = editId;
    const accountType = data.accountingTypes.records.find((type) => type.id === id);
    if (accountType) {
      name = accountType.name;
    }
  }

  function onDelete(id: number) {
    deleteId = id;
    showConfirmModal = true;
  }

  function onCancel() {
    id = null;
    name = '';
  }

  async function deleteAccountType() {
    if (deleteId) {
      try {
        const response = await fetch(`/admin/accounting/types`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: deleteId })
        });

        const result = await response.json();

        if (response.ok) {
          $flash = { type: 'success', message: result.message };
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          $flash = { type: 'error', message: result.message };

          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } catch (e) {
        console.error(e);
      } finally {
        deleteId = null;
        showConfirmModal = false;
      }
    }
  }
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div class="flex justify-between space-x-3">
    <div class="w-7/12">
      <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
          Account Types
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse a list of account types which contains id, name and created at fields.
          </p>
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Created at</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each data.accountingTypes.records as type}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {type.id}
              </th>
              <td class="px-6 py-4">{type.name}</td>
              <td class="px-6 py-4">{formatDate(type.createdAt.toDateString())}</td>
              <td class="px-6 py-4 text-right">
                <button
                  on:click={() => onEdit(type.id)}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </button>
                <span class="px-2">|</span>
                <button
                  on:click={() => onDelete(type.id)}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <Pagination totalPages={data.accountingTypes.pages} />
    </div>

    <div class="w-5/12">
      <AccountTypeForm {id} {name} on:cancel={() => onCancel()} />
    </div>
    <ConfirmModal
      title="Delete account type"
      body={'Are you sure you want to delete this item?'}
      confirmText={"Yes, I'm sure"}
      cancelText={'No, cancel'}
      on:close={() => {
        showConfirmModal = false;
      }}
      on:confirm={() => deleteAccountType()}
      bind:showModal={showConfirmModal}></ConfirmModal>
  </div>
</div>
