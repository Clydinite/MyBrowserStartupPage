<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidate, invalidateAll } from '$app/navigation';

	import * as Popover from '$lib/components/ui/popover';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import { Button } from '$lib/components/ui/button';

	import Sortable from 'sortablejs';

	import DeleteIcon from '$lib/svg-icons/DeleteIcon.svelte';
	import AddIcon from '$lib/svg-icons/AddIcon.svelte';

	import { db } from '$lib/firebase';
	import { authHandlers, authStore } from '$lib/stores/auth_store';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import SettingsForm from './SettingsForm.svelte';

	export let data;
	export let form; // it will contain the settings data

	$: {
		if (form?.success) handleSettings();
	}

	//TODO: test
	authStore.subscribe((current) => {
		debugger;
		console.log('auth store update', current);
	})

	async function handleSettings() {
		if (!form) return;
		
		debugger;

		console.log('settings', form.form.data);
		$authStore.settings = form.form.data;

		console.log(localStorage)
		invalidateAll(); // the load function in +page.server.ts will be re-run, updating the pre-populated form data

		save();
	}

	// TODO: add white background if the image is transparent

	let sortable: HTMLElement;

	onMount(async () => {
		Sortable.create(sortable, {
			animation: 150,

			ghostClass: 'opacity-0',
			draggable: '.drag',

			delay: 100,
			delayOnTouchOnly: true,

			onEnd: (event) => {
				console.log(event.oldIndex, event.newIndex);
				const dragIndex = event.oldIndex;
				const dropIndex = event.newIndex;

				if (dragIndex === undefined || dropIndex === undefined) return;

				const linksCopy = [...$authStore.links];
				const draggedItem = linksCopy.splice(dragIndex, 1)[0]; // remove the dragged item
				linksCopy.splice(dropIndex, 0, draggedItem); // insert back
				$authStore.links = linksCopy;

				save();
			}
		});
	});

	let newTitle = '';
	let newHref = '';

	function createIcon() {
		if (newTitle && newHref) {
			// if the href doesn't start with http or https, add https:// to the front
			// otherwise it'll be treated as a relative link and be linked to somewhere in the app

			if (!newHref.startsWith('http://') && !newHref.startsWith('https://')) {
				newHref = 'https://' + newHref;
			}

			$authStore.links = [...$authStore.links, { title: newTitle, href: newHref }];

			newTitle = '';
			newHref = '';
		}

		save();
	}

	function updateIcon(index: number) {
		if (newTitle && newHref) {
			$authStore.links[index] = { title: newTitle, href: newHref };
		}
		newTitle = '';
		newHref = '';

		save();
	}

	function deleteIcon(index: number) {
		newTitle = '';
		newHref = '';

		// clear the data first. otherwise, when the context menu is closed (when clicking the delete button), updateIcon will also be called, adding the already-deleted data back into the array
		$authStore.links = $authStore.links.filter((_, i) => i !== index);

		save();
	}

	async function save() {
		console.log('saving', $authStore.links, $authStore.settings);

		try {
			if (!$authStore.user) return;

			if (browser) {
				localStorage.setItem('links', JSON.stringify($authStore.links));
				localStorage.setItem('settings', JSON.stringify($authStore.settings));
			}

			const userRef = doc(db, 'users', $authStore.user.uid);
			await setDoc(userRef, { links: $authStore.links, settings: $authStore.settings }, { merge: true });
		} catch (err) {
			console.error("there's an error saving", err);
		}
	}
</script>

<div class="flex h-full w-full flex-col p-4 sm:p-8">
	<div
		class="mb-4 flex w-full items-center justify-between rounded-xl bg-white/10 p-2 px-2 shadow-lg backdrop-blur-lg sm:mb-8"
	>
		<a href="https://github.com/Clydinite/MyBrowserStartupPage" class="flex items-center">
			<img src="browser-startup-page-logo.svg" alt="Logo" class="h-8 w-8" />
			<p class="ml-2 text-base font-bold md:text-lg">MyBrowserStartupPage</p>
		</a>

		<div class="flex items-center"><SettingsForm data={data.form}></SettingsForm></div>
	</div>

	<div
		class="grid flex-grow auto-rows-min grid-cols-4 gap-2 rounded-xl bg-white/5 px-2 pt-4 shadow-lg backdrop-blur-lg md:grid-cols-6"
		bind:this={sortable}
	>
		{#each $authStore.links as { title, href }, index (title + href)}
			<ContextMenu.Root
				onOpenChange={(open) => {
					if (open) {
						newTitle = title;
						newHref = href;
					} else {
						updateIcon(index);
					}
				}}
			>
				<!-- website icon -->
				<div class="drag">
					<div class="flex-initial">
						<a
							{href}
							target={$authStore.settings.linkOpenWay === 'current' ? '_self' : '_blank'}
							class="flex flex-col"
							draggable="false"
							on:contextmenu|preventDefault={() => false}
						>
							<!-- TODO: add bg-white/20 in this div -->
							<div
								class="mx-auto h-10 w-10 rounded-lg object-cover sm:h-12 sm:w-12 md:h-16 md:w-16"
							>
								<img
									src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
									alt="{title} logo"
									class="mx-auto h-10 w-10 rounded-lg object-cover sm:h-12 sm:w-12 md:h-16 md:w-16 md:rounded-xl"
								/>
							</div></a
						>
					</div>
					<ContextMenu.Trigger>
						<p
							class="h-10 select-none truncate text-wrap pt-2 text-center text-xs font-bold text-white sm:h-12 sm:text-sm"
						>
							{title}
						</p>
					</ContextMenu.Trigger>
				</div>
				<ContextMenu.Content class="rounded-xl border-0 bg-slate-500/25 p-4 backdrop-blur-md">
					<div>
						<p class="text-white">New Title</p>
						<input
							type="text"
							bind:value={newTitle}
							class="m-2 mx-auto h-10 w-full rounded-xl bg-stone-300/20 p-2 font-normal text-white"
						/>
					</div>
					<div>
						<p>New URL</p>
						<input
							type="text"
							bind:value={newHref}
							class="m-2 mx-auto h-10 w-full rounded-xl bg-stone-300/20 p-2 font-normal text-white"
						/>
					</div>
					<ContextMenu.Item
						class="mt-2 h-10 select-none items-center rounded-xl bg-slate-50/20 transition-colors"
						on:click={() => deleteIcon(index)}
					>
						<div class="flex items-center">
							<div class="mx-auto h-10 w-10">
								<DeleteIcon />
							</div>
							<p>Delete</p>
						</div>
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
		{/each}

		<!-- add icon -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex items-start justify-center">
			<Popover.Root onOutsideClick={createIcon}>
				<Popover.Trigger>
					<div class="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16">
						<AddIcon />
					</div>
					<p class="text-wrap py-2 text-center text-xs font-bold text-white sm:text-sm">
						New Link
					</p></Popover.Trigger
				>
				<Popover.Content class="rounded-xl border-0 bg-slate-500/25 backdrop-blur-md">
					<div>
						<p class="text-white">Title</p>
						<input
							type="text"
							bind:value={newTitle}
							class="m-2 mx-auto h-10 w-full rounded-xl bg-stone-300/20 p-2 font-normal text-white"
						/>
					</div>

					<div>
						<p class="text-white">URL</p>
						<input
							type="text"
							bind:value={newHref}
							class="m-2 mx-auto h-10 w-full rounded-xl bg-stone-300/20 p-2 font-normal text-white"
						/>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
</div>
