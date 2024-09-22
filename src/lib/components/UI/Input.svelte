<script lang="ts">
  export let value = '';
  export let id;
  export let label;
  export let type = 'text';
  export let name;
  export let autocomplete: string | null = null;
  export let required = false;
  export let inputRef = null;
  export let placeholder: string | null = null;

  function setType(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<fieldset class={$$props.class}>
  <label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
  <div class="mt-2">
    <input
      use:setType
      {id}
      {name}
      {autocomplete}
      {required}
      bind:this={inputRef}
      bind:value
      {placeholder}
      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none sm:text-sm sm:leading-6" />
  </div>
</fieldset>
