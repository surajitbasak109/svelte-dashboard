<script lang="ts">
  const yearWhenWriting = 2024;
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear > yearWhenWriting ? currentYear : null;

  $: yearText = `${yearWhenWriting}${nextYear ? `- ${nextYear}` : ''}`;
</script>

<footer class="my-20">
  <p class="text-sm text-center text-slate-500">
    Copyright &copy; {yearText} CRM App. All rights reserved
  </p>
</footer>
