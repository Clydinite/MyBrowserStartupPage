<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { loginSchema, type LoginSchema } from '$lib/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Spinner from '$lib/svg-icons/Spinner.svelte';

	export let data: SuperValidated<Infer<LoginSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	export let authenticating: boolean;
</script>

<form method="POST" action="?/login" use:enhance>
	<Form.Field {form} name="email" class="my-4">
		<Form.Control let:attrs >
			<Form.Label class="font-bold">Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} class="bg-white/75 text-black"/>
		</Form.Control>
		<Form.Description
			>Enter your email. No SQL injections please, we use NoSQL here.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password" class="my-4">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Password</Form.Label>
			<Input type="password" {...attrs} bind:value={$formData.password} class="bg-white/75 text-black"/>
		</Form.Control>
		<Form.Description
			>Enter your password. If you have already forgotten it, we can't help you.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="my-5 w-full font-bold">
		{#if !authenticating}
			Submit
		{:else}
			<Spinner />
		{/if}
	</Form.Button>
</form>
