<script lang="ts">
import type { Game } from '$lib/models/Game';

export let game: Game;

$: hasImage = game.imageUrl != null;
</script>

<a href="/games/{ game.slug }" class="group flex flex-col xs:flex-row items-center xs:items-stretch gap-4 px-4 xs:px-0 py-3 xs:py-6 my-2 border-b-2 border-gray-200 rounded-none xs:hocus:px-6 xs:hocus:-mx-6 hocus:bg-white hocus:border-white hocus:shadow-sm hocus:rounded-lg">

	<span class="flex-none block w-24 h-24 bg-white shadow-sm rounded-lg overflow-hidden group-hocus:shadow-none text-center leading-10">
		{#if hasImage}
		<img
			src="http://localhost:3333{ game.imageUrl }"
			role="presentation"
			alt="Game logo"
			class="w-full h-full object-contain" />
		{:else}
			<span class="flex items-center justify-center w-full h-full">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</span>
		{/if}
	</span>

	<span class="flex flex-col w-full">
		<span class="text-xl font-bold text-gray-700">{ game.name }</span>
		<span class="flex-grow text-gray-600">{ game.description }</span>

		<span class="flex items-center gap-x-2.5 gap-y-px flex-wrap pt-2">
			{#each game.tags as tag}
				<span class="text-sm font-medium text-gray-500"><span class="pr-px text-gray-400 font-light">#</span>{ tag }</span>
			{/each}
		</span>
	</span>
</a>

