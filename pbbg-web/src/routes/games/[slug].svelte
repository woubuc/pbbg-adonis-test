<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => ({
	props: { slug: params.slug },
});
</script>

<script lang="ts">
import { api } from '$lib/api';
import Loader from '$components/Loader.svelte';

export let slug: string;
</script>

{#await api.game(slug).get()}
	<div class="py-16">
		<Loader />
	</div>
{:then game}
	<div class="flex flex-col xs:flex-row items-center xs:items-stretch gap-4 px-4 xs:px-0 py-3 xs:py-6">

		<span
			class="flex-none block w-24 h-24 bg-white shadow-sm rounded-lg overflow-hidden group-hocus:shadow-none text-center leading-10">
			{#if game.imageUrl != null}
			<img
				src="http://localhost:3333{ game.imageUrl }"
				role="presentation"
				alt="Game logo"
				class="w-full h-full object-contain" />
			{:else}
				<span class="flex items-center justify-center w-full h-full">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none"
						 viewBox="0 0 24 24"
						 stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</span>
			{/if}
		</span>

		<span class="flex flex-col w-full">
			<span class="text-xl font-bold text-gray-700">{ game.name }</span>
			<span class="flex-grow text-gray-600">{ game.description }</span>

			<span class="flex items-center gap-x-2.5 gap-y-px flex-wrap pt-2">
				{#each game.tags as tag}
					<span class="text-sm font-medium text-gray-500"><span
						class="pr-px text-gray-400 font-light">#</span>{ tag }</span>
				{/each}
			</span>
		</span>
	</div>
{/await}
