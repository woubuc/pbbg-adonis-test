<script lang="ts">
import { goto } from '$app/navigation';
import Form from '$components/Form.svelte';
import { api } from '$lib/api';
import type { Game } from '$lib/models/Game';
import { user } from '$lib/store';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

onMount(() => {
	if (get(user) == null) {
		return goto('/login?to=/submit-game');
	}
});

function onSubmit(evt: CustomEvent<Game>) {
	return goto(`/games/${ evt.detail.slug }`);
}
</script>

{#if $user != null}
	<Form api={api.games.create} on:submit={onSubmit} class="py-6">
		<h2 class="text-lg font-semibold text-gray-700 text-center">Submit a new game</h2>

		<div class="md:flex gap-8 lg:gap-12">
			<div class="flex-1">
				<label class="block my-6">
					<span class="block h-4.5 px-6 text-sm font-medium">Name</span>
					<input type="text" name="name" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200"
						   autofocus required />
				</label>

				<label class="block my-6">
					<span class="block h-4.5 px-6 text-sm font-medium">
						Url <small class="px-1 text-xs font-normal text-gray-500">include https://</small>
					</span>
					<input type="text" name="url" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200"
						   required />
				</label>

				<label class="block my-6">
					<span class="block h-4.5 px-6 text-sm font-medium">Image</span>
					<input type="file" name="image"
						   class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200 bg-white"
						   accept=".png,.jpg,.jpeg,.webp" />
				</label>

				<label class="block my-6">
					<span class="block h-4.5 px-6 text-sm font-medium">
						Tags <small class="px-1 text-xs font-normal text-gray-500">separated by spaces</small>
					</span>
					<input type="text" name="tags"
						   class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200 bg-white" />
				</label>
			</div>
			<div class="flex-1">
				<label class="flex flex-col h-full my-6 md:my-0 md:py-6">
					<span class="flex-none block h-4.5 px-6 text-sm font-medium">Description</span>
					<textarea name="description"
							  class="flex-grow block w-full px-6 py-4 rounded-2xl leading-relaxed shadow shadow-gray-200"
							  required></textarea>
				</label>
			</div>
		</div>

		<button type="submit"
				class="px-6 py-1.5 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl text-white font-semibold">Submit game
		</button>
	</Form>
{/if}
