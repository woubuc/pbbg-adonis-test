<script lang="ts">
import { api } from '$lib/api';
import { user } from '$lib/store';
import { onMount } from 'svelte';
import Loader from './Loader.svelte';
import NavLink from './NavLink.svelte';

let loading = true;
onMount(async () => {
	await api.auth.me();
	loading = false;
});

async function logout(evt: MouseEvent) {
	evt.preventDefault();

	loading = true;
	await api.auth.logout();
	loading = false;
}
</script>

{#if loading}
	<div class="px-12">
		<Loader />
	</div>
{:else if $user != null}
	<nav class="flex flex-col sm:flex-row justify-center items-center gap-2 sm:mt-2 md:mt-0">
		<div class="flex items-center gap-1.5 mt-4 sm:mt-0">
			<div class="h-8 w-8 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full"></div>
			<div class="leading-4">
				<p class="font-semibold text-gray-700">{ $user.name }</p>
				<p class="text-sm text-gray-400">{ $user.email }</p>
			</div>
		</div>
		<NavLink href="#" on:click={logout}>Log out</NavLink>
	</nav>
{:else}
	<nav class="flex flex-col sm:flex-row justify-center items-center">
		<NavLink href="/login">Log in</NavLink>
		<NavLink href="/register">Register</NavLink>
	</nav>
{/if}
