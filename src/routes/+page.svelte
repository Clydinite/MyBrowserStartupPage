<script lang="ts">
	import RegisterForm from './RegisterForm.svelte';
	import LoginForm from './LoginForm.svelte';

	export let data;
	export let form; // form will be what ever is returned from the server (login or register)

	import { authHandlers } from '$lib/stores/auth_store';

	$: {
		console.log(data);
		if (form?.success) handleAuthenticate();
	}

	let register = false;

	async function handleAuthenticate() {
		if (!form) return;

		const email = form.form.data.email;
		const password = form.form.data.password;

		if (register) {
			await authHandlers.signup(email, password);
		} else {
			await authHandlers.login(email, password);
		}
	}
</script>

<div class="container flex h-full max-w-md flex-col items-center justify-center">
	<!-- <SuperDebug data={$formData}></SuperDebug> -->

	<h1 class="mb-5 text-5xl font-bold">{register ? 'Register' : 'Login'}</h1>

	{#if register}
		<RegisterForm data={data.registerForm} />
	{:else}
		<LoginForm data={data.loginForm} />
	{/if}

	<div class="mb-4 inline-flex w-full items-center justify-center gap-2">
		<div class="h-px flex-grow bg-slate-200"></div>
		<p class="text-white">or</p>
		<div class="h-px flex-grow bg-slate-200"></div>
	</div>

	<div class="flex gap-2">
		{#if register}
			<p>Don't have an account?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="font-bold text-blue-500">Login</button
			>
		{:else}
			<p>Already have an account?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="font-bold text-blue-500">Register</button
			>
		{/if}
	</div>
</div>
