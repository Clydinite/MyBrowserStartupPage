<script lang="ts">
	import { type PageData } from './$types';

	// auth
	import { authHandlers } from '$lib/stores/auth_store';

	// form
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let submittedForm: PageData;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	let register = false;

	function toggleRegisterAndLogin() {
		register = !register;
	}

	if (submittedForm?.form.valid) {
		const { email, password } = submittedForm.form.data;
		if (register) {
			authHandlers.signup(email, password);
		} else {
			authHandlers.login(email, password);
		}
	}
</script>

<div class="container flex h-full max-w-md flex-col items-center justify-center">
	<!-- <SuperDebug data={$formData}></SuperDebug> -->

	<h1 class="mb-5 text-5xl font-bold">{register ? 'Register' : 'Login'}</h1>

	<form method="POST" use:enhance>
		<Form.Field {form} name="email" class="my-4">
			<Form.Control let:attrs>
				<Form.Label class="font-bold">Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.Description
				>Enter your email. No SQL injections please, we use NoSQL here.</Form.Description
			>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password" class="my-4">
			<Form.Control let:attrs>
				<Form.Label class="font-bold">Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.Description>Enter your password. Don't tell anyone, though.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		{#if register}
			<Form.Field {form} name="confirm" class="my-4">
				<Form.Control let:attrs>
					<Form.Label class="font-bold">Confirm</Form.Label>
					<Input type="password" {...attrs} bind:value={$formData.confirm} />
				</Form.Control>
				<Form.Description
					>Enter your password, but again. Why? I don't know, but it's the standard, right?</Form.Description
				>
				<Form.FieldErrors />
			</Form.Field>
		{/if}

		<Form.Button class="my-5 w-full font-bold">Submit</Form.Button>
	</form>

	<div class="mb-4 inline-flex w-full items-center justify-center gap-2">
		<div class="h-px flex-grow bg-slate-200"></div>
		<p class="text-white">or</p>
		<div class="h-px flex-grow bg-slate-200"></div>
	</div>

	<div class="flex gap-2">
		{#if register}
			<p>Don't have an account?</p>
			<button on:click={toggleRegisterAndLogin} class="font-bold text-blue-500">Login</button>
		{:else}
			<p>Already have an account?</p>
			<button on:click={toggleRegisterAndLogin} class="font-bold text-blue-500">Register</button>
		{/if}
	</div>
</div>
