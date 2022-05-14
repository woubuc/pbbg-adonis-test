<script lang="ts">
import '../index.css';
import Link from '$components/Link.svelte';
import NavLink from '$components/NavLink.svelte';
import UserNav from '$components/UserNav.svelte';
</script>

<svelte:head>
	<title>PBBG - Persistent Browser-Based Games</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="bg-white shadow-xl shadow-gray-200">
		<div class="md:flex items-center gap-2 lg:gap-4 max-w-screen-lg mx-auto pb-4 md:pb-0 md:pr-4">
			<h1 class="block py-2 bg-gradient-to-b from-green-500 to-teal-500 bg-clip-text text-transparent text-2xl text-center font-extrabold">
				<a href="/" class="block px-4 py-1.5 -rotate-3 hocus:rotate-0 transition-transform duration-75">PBBG</a>
			</h1>
			<nav class="flex-grow flex flex-col sm:flex-row justify-center md:justify-start items-center">
				<NavLink href="/about">About</NavLink>
				<NavLink href="/submit-game">Submit a game</NavLink>

				<NavLink href="https://discourse.pbbg.com" target="_blank" rel="noreferrer noopener">Forum</NavLink>
				<NavLink href="https://discord.gg/KvwaEqC" target="_blank" rel="noreferrer noopener">Discord</NavLink>
			</nav>

			<UserNav />
		</div>
	</header>

	<main class="flex-grow w-full max-w-screen-lg mx-auto px-4 py-12">
		<slot />
	</main>

	<footer class="max-w-screen-lg mx-auto px-4 py-2.5 text-center opacity-75">
		<p class="text-sm">
			Built by
			<Link href="https://foohonpie.com" target="_blank" rel="noreferrer noopener">Foohon Pie LLC</Link>
			&amp;
			<Link href="https://www.woubuc.be" target="_blank" rel="noreferrer noopener">@woubuc</Link>
			with help from
			<Link href="/humans.txt">friends and supporters</Link>.
		</p>
	</footer>
</div>
