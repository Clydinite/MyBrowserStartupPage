<script lang="ts">
	import { fade } from 'svelte/transition';
	
	import RegisterForm from './RegisterForm.svelte';
	import LoginForm from './LoginForm.svelte';

	export let data;
	export let form; // form will be what ever is returned from the server (login or register)

	import { authHandlers } from '$lib/stores/auth_store';

	$: {
		if (form?.success) handleAuthenticate();
	}

	let register = false;
	let error = false;
	let authenticating = false;

	async function handleAuthenticate() {
		if (!form) return;
		authenticating = true;

		const email = form.form.data.email;
		const password = form.form.data.password;

		try {
			if (register) {
				await authHandlers.signup(email, password);
			} else {
				await authHandlers.login(email, password);
			}
		} catch (err) {
			console.error(err);
			error = true;
		} finally {
			authenticating = false;
		}
	}
</script>

<div class="container flex min-h-screen overflow-y-auto max-w-md flex-col items-center justify-center py-5">
	<!-- <SuperDebug data={$formData}></SuperDebug> -->

	<h1 class="mb-5 text-5xl font-bold">{register ? 'Register' : 'Login'}</h1>

	{#if error}
		<p class="text-sm font-medium text-destructive" transition:fade>
			There's something wrong with email or password.
		</p>
	{/if}

	{#if register}
		<RegisterForm data={data.registerForm} {authenticating} />
	{:else}
		<LoginForm data={data.loginForm} {authenticating} />
	{/if}

	<div class="mb-4 inline-flex w-full items-center justify-center gap-2">
		<div class="h-px flex-grow bg-slate-200"></div>
		<p class="text-white">or</p>
		<div class="h-px flex-grow bg-slate-200"></div>
	</div>

	<div class="flex gap-2">
		{#if register}
			<p>Already have an account?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="font-bold text-blue-500">Login</button
			>
		{:else}
			<p>Don't have an account?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="font-bold text-blue-500">Register</button
			>
		{/if}
	</div>
</div>
