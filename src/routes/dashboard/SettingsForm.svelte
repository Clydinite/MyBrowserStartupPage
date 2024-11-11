<script lang="ts">
	import { mediaQuery } from 'svelte-legos';

	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	import SettingsIcon from '$lib/svg-icons/SettingsIcon.svelte';

	import { authStore, authHandlers } from '$lib/stores/auth_store';

	// TODO: add other backgrounds

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

</script>

{#if $isDesktop}
	<Dialog.Root>
		<Dialog.Trigger><SettingsIcon class="h-6 w-6" /></Dialog.Trigger>
		<Dialog.Content class="max-w-md rounded-xl bg-white/10 shadow-lg backdrop-blur-md">
			<Dialog.Header>
				<Dialog.Title class="mx-auto">Settings</Dialog.Title>
			</Dialog.Header>
			<Dialog.Description>
				<div class="flex h-full w-full flex-col">
					<div class="flex-grow gap-2 rounded-lg bg-white/5 p-6 shadow-lg backdrop-blur-lg">
						<legend class="mb-3 font-bold">Background</legend>
						<RadioGroup.Root
							bind:value={$authStore.settings.background}
							class="flex flex-col space-y-1"
						>
							<div class="flex items-center space-x-3 space-y-0">
								<RadioGroup.Item value="ethereal" />
								<Label>Ethereal</Label>
							</div>

							<div class="flex items-center space-x-3 space-y-0">
								<RadioGroup.Item value="black" />
								<Label>Pitch black</Label>
							</div>

							<RadioGroup.Input name="background" />
						</RadioGroup.Root>

						<legend class="my-3 font-bold">Open links in...</legend>
						<RadioGroup.Root
							bind:value={$authStore.settings.linkOpenWay}
							class="flex flex-col space-y-1"
						>
							<div class="flex items-center space-x-3 space-y-0">
								<RadioGroup.Item value="current" />
								<Label>Current tab</Label>
							</div>

							<div class="flex items-center space-x-3 space-y-0">
								<RadioGroup.Item value="new" />
								<Label>New tab</Label>
							</div>

							<RadioGroup.Input name="linkOpenWay" />
						</RadioGroup.Root>
					</div>

					<Button variant="destructive" class="mt-3 w-full font-bold" on:click={authHandlers.logout}
						>Logout</Button
					>
				</div>
			</Dialog.Description>
			<Dialog.Footer></Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<SettingsIcon class="h-6 w-6" />
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Settings</Drawer.Title>
			</Drawer.Header>
			<form class="grid items-start gap-4 p-4">
				<div class="grid gap-2">
					<legend class="mb-3 font-bold">Background</legend>
					<RadioGroup.Root
						bind:value={$authStore.settings.background}
						class="flex flex-col space-y-1"
					>
						<div class="flex items-center space-x-3 space-y-0">
							<RadioGroup.Item value="ethereal" />
							<Label>Ethereal</Label>
						</div>

						<div class="flex items-center space-x-3 space-y-0">
							<RadioGroup.Item value="black" />
							<Label>Pitch black</Label>
						</div>

						<RadioGroup.Input name="background" />
					</RadioGroup.Root>
				</div>

				<div class="grid gap-2">
					<legend class="my-3 font-bold">Open links in...</legend>
					<RadioGroup.Root
						bind:value={$authStore.settings.linkOpenWay}
						class="flex flex-col space-y-1"
					>
						<div class="flex items-center space-x-3 space-y-0">
							<RadioGroup.Item value="current" />
							<Label>Current tab</Label>
						</div>

						<div class="flex items-center space-x-3 space-y-0">
							<RadioGroup.Item value="new" />
							<Label>New tab</Label>
						</div>

						<RadioGroup.Input name="linkOpenWay" />
					</RadioGroup.Root>
				</div>

				<Button variant="destructive" class="my-3 mb-5 w-full font-bold" on:click={authHandlers.logout}
					>Logout</Button
				>
			</form>
		</Drawer.Content>
	</Drawer.Root>
{/if}
