<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import { settingsSchema, type SettingsSchema } from '$lib/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SettingsSchema>>;

	const form = superForm(data, {
		validators: zodClient(settingsSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex h-full w-full flex-col p-4 sm:p-8">
	<div class="flex-grow gap-2 rounded-lg bg-white/10 px-2 pt-4 shadow-lg backdrop-blur-lg">
		<form method="POST" action="?/settings" use:enhance>
			<Form.Fieldset {form} name="background" class="space-y-3">
				<Form.Legend>Background</Form.Legend>
				<RadioGroup.Root bind:value={$formData.background} class="flex flex-col space-y-1">
					<div class="flex items-center space-x-3 space-y-0">
						<Form.Control let:attrs>
							<RadioGroup.Item value="1" {...attrs} />
							<Form.Label class="font-normal">Dark</Form.Label>
						</Form.Control>
					</div>
					<div class="flex items-center space-x-3 space-y-0">
						<Form.Control let:attrs>
							<RadioGroup.Item value="2" {...attrs} />
							<Form.Label class="font-normal">Light</Form.Label>
						</Form.Control>
					</div>
					<div class="flex items-center space-x-3 space-y-0">
						<Form.Control let:attrs>
							<RadioGroup.Item value="3" {...attrs} />
							<Form.Label class="font-normal">System</Form.Label>
						</Form.Control>
					</div>
					<RadioGroup.Input name="background" />
				</RadioGroup.Root>
				<Form.FieldErrors />
			</Form.Fieldset>

			<Form.Field {form} name="linkOpenWay" class="space-y-3">
				<Form.Legend>Open links in</Form.Legend>
				<RadioGroup.Root bind:value={$formData.linkOpenWay} class="flex flex-col space-y-1">
					<div class="flex items-center space-x-3 space-y-0">
						<Form.Control let:attrs>
							<RadioGroup.Item value="tab" {...attrs} />
							<Form.Label class="font-normal">New tab</Form.Label>
						</Form.Control>
					</div>
					<div class="flex items-center space-x-3 space-y-0">
						<Form.Control let:attrs>
							<RadioGroup.Item value="window" {...attrs} />
							<Form.Label class="font-normal">New window</Form.Label>
						</Form.Control>
					</div>
					<RadioGroup.Input name="linkOpenWay" />
				</RadioGroup.Root>
				<Form.FieldErrors />
			</Form.Field>
		</form>
	</div>
</div>
