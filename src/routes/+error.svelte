<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
    <h1>{$page.status}: {$page.error?.message}</h1>
    
    {#if $page.status === 404}
        <p>Page not found, try directly copy the url from the browser.</p>
    {/if}
</div>
