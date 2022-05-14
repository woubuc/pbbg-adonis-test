<script lang="ts">
import { goto } from '$app/navigation';
import Form from '$components/Form.svelte';
import Link from '$components/Link.svelte';
import { api } from '$lib/api';
</script>

<Form api={api.auth.register} on:submit={() => goto('/')} let:error class="max-w-sm mx-auto py-6">
	<h2 class="text-lg font-semibold text-gray-700 text-center">Register</h2>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Name</span>
		<input type="text" name="name" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200"
			   autofocus />
	</label>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Email</span>
		<input type="email" name="email" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200"
			   autofocus />
	</label>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Password</span>
		<input type="password" name="password" class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200" />
	</label>

	<label class="block my-6">
		<span class="block h-4.5 px-6 text-sm font-medium">Confirm password</span>
		<input type="password" name="passwordConfirm"
			   class="block w-full px-6 py-1.5 rounded-2xl shadow shadow-gray-200" />
	</label>

	<div class="flex items-center justify-between">
		<button type="submit"
				class="px-6 py-1.5 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl text-white font-semibold">Create account
		</button>

		<p class="text-sm text-right leading-4">Already have an account?<br />
			<Link href="/login">Log in</Link>
		</p>
	</div>
</Form>
