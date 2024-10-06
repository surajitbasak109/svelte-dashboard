<script lang="ts">
  import { page } from '$app/stores';
  let currentPage = 0;
  export let totalPages: number;

  let unsbuscribe = page.subscribe((value) => {
    currentPage = Number(value.url.searchParams.get('page')) || 1;
  });

  function handlePrevious() {
    if (currentPage > 1) {
      $page.url.searchParams.set('page', String(currentPage - 1));
      window.location.href = $page.url.href;
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      $page.url.searchParams.set('page', String(currentPage + 1));
      window.location.href = $page.url.href;
    }
  }

  unsbuscribe();
</script>

<div class="px-1 py-3 my-3 bg-white rounded-lg pagination">
  <div class="flex flex-col items-center">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Page <span class="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
    </span>
    <!-- Buttons -->
    <div class="inline-flex mt-2 xs:mt-0">
      <button on:click={handlePrevious} class="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg me-3 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Previous
      </button>
      <button on:click={handleNext} class="flex items-center justify-center h-8 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
  </div>
</div>
