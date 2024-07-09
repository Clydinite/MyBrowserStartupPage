<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { registerSchema, type RegisterSchema } from '$lib/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Spinner from '$lib/svg-icons/Spinner.svelte';

	export let data: SuperValidated<Infer<RegisterSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	export let authenticating: boolean;
</script>

<form method="POST" action="?/register" use:enhance>
	<Form.Field {form} name="email" class="my-4">
		<Form.Control let:attrs>
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
		<Form.Description>Enter your password. Don't tell anyone, though.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="confirm" class="my-4">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Confirm</Form.Label>
			<Input type="password" {...attrs} bind:value={$formData.confirm} class="bg-white/75 text-black"/>
		</Form.Control>
		<Form.Description
			>Enter your password, but again. Why? I don't know, but it's the standard, right?</Form.Description
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
