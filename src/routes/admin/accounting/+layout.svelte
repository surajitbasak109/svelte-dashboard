<script lang="ts">
  import { page } from '$app/stores';
  const activeTabClass =
    'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 dark:border-blue-500';
  const inactiveTabClass =
    'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
  const tabs = [
    { id: 'accounting', name: 'Accounts', path: '/admin/accounting' },
    { id: 'accounting-types', name: 'Account Types', path: '/admin/accounting/types' },
    { id: 'transactions', name: 'Transactions', path: '/admin/accounting/transactions' }
  ];
</script>

<div class="box-border flex justify-center flex-auto px-5 m-0 gap-x-3">
  <section class="w-full">
    <div class="p-4 mb-3 bg-white rounded-sm shadow-lg">
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist">
          {#each tabs as tab}
            <li class="me-2" role="presentation">
              <a
                href={tab.path}
                class={tab.path === $page.url.pathname ? activeTabClass : inactiveTabClass}
                id="{tab.id}-tab"
                data-tabs-target="#{tab.id}"
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected="false">
                {tab.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="accounting"
          role="tabpanel"
          aria-labelledby="accounting-tab">
          <slot />
        </div>
      </div>
    </div>
  </section>
</div>
