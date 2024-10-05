<script lang="ts">
  export let type: 'success' | 'info' | 'warning' | 'error' = 'info';
  const types = {
    success: 'text-teal-900 bg-teal-100 border-teal-500',
    info: 'text-blue-900 bg-blue-100 border-blue-500',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-900',
    error: 'bg-red-100 border-red-500 text-red-900'
  };
  export let message: string;

  $: className = [
    'px-4 py-3 border-t-4 rounded-b shadow-md',
    types[type],
    $$props.class ?? ''
  ].join(' ');
</script>

<div class={className} role="alert">
  <div class="flex">
    <div class="py-1">
      <svg
        class="w-6 h-6 mr-4 text-teal-500 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
    </div>
    <div>
      <p class="text-sm">{message}</p>
    </div>
  </div>
</div>
