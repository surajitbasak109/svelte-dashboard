<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="error">
  <h1>{$page.status}: {$page.error?.message}</h1>
  <p class="text-center">
    <a href="/">Go back</a>
  </p>
</div>

<style>
  * {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }
  .error {
    height: 100vh;
    display: grid;
    place-content: center;
  }
  .text-center {
    text-align: center;
  }
</style>
