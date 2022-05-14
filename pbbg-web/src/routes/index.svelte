<script lang="ts">
import GameTile from '$components/GameTile.svelte';
import Link from '$components/Link.svelte';
import algoliasearch from 'algoliasearch/lite';
import { onMount } from 'svelte';
import Loader from '../components/Loader.svelte';

let client = algoliasearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_SEARCH_KEY);
let index = client.initIndex(import.meta.env.VITE_ALGOLIA_INDEX);

let query = '';
let results = null;
let loading = true;

onMount(async () => {
	await search();
	loading = false;
});

async function search() {
	let result = await index.search(query);
	results = result.hits;
}

</script>

<div class="sm:flex items-end gap-4 lg:w-2/3 mx-auto py-12">
	<label class="flex-grow block">
		<span class="block h-4.5 px-4 sm:px-6 text-sm font-medium">Search games, tags, descriptions, &hellip;</span>
		<input type="search" bind:value={query} on:input={search}
			   class="block w-full px-2.5 py-1.5 rounded-2xl shadow shadow-gray-200" />
	</label>

	<div class="p-2.5 sm:px-0">
		<Link href="/game/random">Random game</Link>
	</div>
</div>

{#if loading}
	<div class="py-16">
		<Loader />
	</div>
{:else}
	<div class="lg:w-2/3 mx-auto py-4">
		{#each results as game}
			<GameTile {game} />
		{/each}
	</div>
{/if}
