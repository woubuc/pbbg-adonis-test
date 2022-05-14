<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ url }) => ({
	props: { to: url.searchParams.get('to') },
});
</script>

<script lang="ts">
import { goto } from '$app/navigation';
import Form from '$components/Form.svelte';
import Link from '$components/Link.svelte';
import { api } from '$lib/api';
import { user } from '$lib/store';
import { onDestroy, onMount } from 'svelte';

export let to: string | null;

let unsubscribe = () => {};

onMount(() => {
	unsubscribe = user.subscribe(u => {
		if (u != null) {
			onLoggedIn();
		}
	});
});
onDestroy(unsubscribe);

function onLoggedIn() {
	return goto(to ?? '/');
}
</script>

<Form api={api.auth.login} on:submit={onLoggedIn} class="max-w-sm mx-auto py-6">
	<h2 class="text-lg font-semibold text-gray-700 text-center">Log in</h2>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Email</span>
		<input type="email" name="email" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200"
			   autofocus />
	</label>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Password</span>
		<input type="password" name="password" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200" />
	</label>

	<div class="flex items-center justify-between">
		<button type="submit"
				class="px-6 py-1.5 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl text-white font-semibold">Log in
		</button>

		<p class="text-sm text-right leading-4">No account yet?<br />
			<Link href="/register">Register</Link>
		</p>
	</div>
</Form>
