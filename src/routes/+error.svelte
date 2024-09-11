<script lang="ts">
    import {page} from '$app/stores';
</script>

<div>
    <h2 class="text-4xl font-[600]">Oh ohh!</h2>
    {#if $page?.error?.message}
        <p class="error">{$page?.error?.message}</p>
    {:else}
        <p class="error">Something went wrong. Don't worry, we use Sentry!</p>
    {/if}
</div>

<style>
    .error {
        color: #f90000;
        text-align: center;
        margin-top: 1rem;
    }
</style>
