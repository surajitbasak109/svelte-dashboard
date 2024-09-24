<script lang="ts">
  let className: string | null = '';
  export { className as class };

  const classList = [`crm-nav-items crm-nav-toggle`, className].join(` `);
</script>

<nav class={classList} {...$$props}>
  <slot />
</nav>
