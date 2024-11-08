<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	import SettingsIcon from '$lib/svg-icons/SettingsIcon.svelte';

	import { settingsSchema, type SettingsSchema } from '$lib/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authHandlers } from '$lib/stores/auth_store';

	export let data: SuperValidated<Infer<SettingsSchema>>;

	const form = superForm(data, {
		validators: zodClient(settingsSchema),
		dataType: 'json',
		invalidateAll: 'force',
		resetForm: false // TODO
	});

	const { form: formData, enhance } = form;
	
	// TODO: add other backgrounds
	// TODO: redesign the settings panel
</script>

<Dialog.Root>
	<Dialog.Trigger><SettingsIcon class="h-6 w-6"></SettingsIcon></Dialog.Trigger>
	<Dialog.Content class="max-w-md rounded-xl bg-white/10 shadow-lg backdrop-blur-md">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<div class="flex h-full w-full flex-col p-4 sm:p-8">
				<form method="POST" action="?/settings" use:enhance>
					<div class="flex-grow gap-2 rounded-lg bg-white/5 p-6 shadow-lg backdrop-blur-lg">
						<Form.Fieldset {form} name="background" class="space-y-3">
							<Form.Legend class="font-bold">Background</Form.Legend>
							<RadioGroup.Root bind:value={$formData.background} class="flex flex-col space-y-1">
								<div class="flex items-center space-x-3 space-y-0">
									<Form.Control let:attrs>
										<RadioGroup.Item value="ethereal" {...attrs} />
										<Form.Label>Ethereal</Form.Label>
									</Form.Control>
								</div>

								<div class="flex items-center space-x-3 space-y-0">
									<Form.Control let:attrs>
										<RadioGroup.Item value="black" {...attrs} />
										<Form.Label>Pitch black</Form.Label>
									</Form.Control>
								</div>

								<RadioGroup.Input name="background" />
							</RadioGroup.Root>
							<Form.FieldErrors />
						</Form.Fieldset>

						<Form.Fieldset {form} name="linkOpenWay" class="space-y-3">
							<Form.Legend class="font-bold">Open links in...</Form.Legend>
							<RadioGroup.Root bind:value={$formData.linkOpenWay} class="flex flex-col space-y-1">
								<div class="flex items-center space-x-3 space-y-0">
									<Form.Control let:attrs>
										<RadioGroup.Item value="current" {...attrs} />
										<Form.Label>Current tab</Form.Label>
									</Form.Control>
								</div>

								<div class="flex items-center space-x-3 space-y-0">
									<Form.Control let:attrs>
										<RadioGroup.Item value="new" {...attrs} />
										<Form.Label>New tab</Form.Label>
									</Form.Control>
								</div>

								<RadioGroup.Input name="linkOpenWay" />
							</RadioGroup.Root>
							<Form.FieldErrors />
						</Form.Fieldset>
					</div>

					<SuperDebug data={$formData} />

					<Form.Button class="my-5 w-full font-bold">Save changes</Form.Button>
				</form>
			</div>
		</Dialog.Description>
		<Dialog.Footer></Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
