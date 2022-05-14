<script lang="ts">
export let href: string;

$: isExternal = href.startsWith('http');
</script>

<a on:click class="group flex items-center px-8 md:px-4 lg:px-5 py-2 font-medium hocus:font-semibold text-gray-600 hocus:text-gray-800" {...$$props}>
	<slot />

	{#if isExternal}
	<svg xmlns="http://www.w3.org/2000/svg" title="External link" class="h-3.5 w-3.5 ml-0.5 mt-0.5 -mr-4 text-gray-300 group-hocus:text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
		<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
		<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
	</svg>
	{/if}
</a>
