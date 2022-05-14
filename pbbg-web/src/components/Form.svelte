<script lang="ts">
import Link from '$components/Link.svelte';
import type { RequestError } from '$lib/api/request';
import { createEventDispatcher } from 'svelte';
import Loader from './Loader.svelte';

export let api: (body: FormData) => Promise<any>;

let loading = false;
let error: RequestError | null = null;

let dispatch = createEventDispatcher<{ submit: any }>();

async function submit(evt: SubmitEvent) {
	loading = true;

	let data = new FormData(evt.target as HTMLFormElement);

	try {
		let response = await api(data);
		dispatch('submit', response);
	} catch (e) {
		error = e;
	}

	loading = false;
}
</script>

{#if loading}
	<div class="py-16">
		<Loader />
	</div>
{:else}
	<form on:submit|preventDefault={submit} let:error={error} {...$$restProps}>
		<slot />
	</form>
{/if}
