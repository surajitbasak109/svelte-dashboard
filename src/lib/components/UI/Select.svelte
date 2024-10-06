<script lang="ts">
  export let options: { text: string; value: string | number }[] = [];
  export let selected: string | number = '';
  export let placeholder = "Select an option";
  export let id = '';
  export let label = '';
  export let name = '';
</script>

<fieldset class={$$props.class}>
  <label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
  <select
    {id}
    {name}
    bind:value={selected}
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option disabled value="">{placeholder}</option>
    {#each options as { value, text }}
      <option {value}>{text}</option>
    {/each}
  </select>
</fieldset>
