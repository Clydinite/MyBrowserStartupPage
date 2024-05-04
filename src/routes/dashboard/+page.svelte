<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import * as Popover from '$lib/components/ui/popover';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import { Button } from '$lib/components/ui/button';

	import DeleteIcon from '$lib/svg-icons/DeleteIcon.svelte';
	import AddIcon from '$lib/svg-icons/AddIcon.svelte';

	import { db } from '$lib/firebase';
	import { authHandlers, authStore } from '$lib/stores/auth_store';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	let newTitle = '';
	let newHref = '';

	function createIcon() {
		if (newTitle && newHref) {
			$authStore.links = [...$authStore.links, { title: newTitle, href: newHref }];

			newTitle = '';
			newHref = '';
		}
	}

	function updateIcon(index: number) {
		if (newTitle && newHref) {
			$authStore.links[index] = { title: newTitle, href: newHref };
		}
		newTitle = '';
		newHref = '';
	}

	function deleteIcon(index: number) {
		newTitle = '';
		newHref = '';

		// clear the data first. otherwise, when the context menu is closed (when clicking the delete button), updateIcon will also be called, adding the already-deleted data back into the array
		$authStore.links = $authStore.links.filter((_, i) => i !== index);
	}

	function handleDragStart(event: DragEvent, dragIndex: number) {
		if (!event.dataTransfer) return;

		event.dataTransfer.setData('text/plain', dragIndex.toString());
		event.dataTransfer.dropEffect = 'move';
	}

	function handleDrop(event: DragEvent, dropIndex: number) {
		if (!event.dataTransfer) return;

		const dragIndex = parseInt(event.dataTransfer?.getData('text/plain'));

		// Make a copy of the links array
		const linksCopy = [...$authStore.links];

		// Remove the dragged item from its original position
		const draggedItem = linksCopy.splice(dragIndex, 1)[0];

		// Insert the dragged item at the drop position
		linksCopy.splice(dropIndex, 0, draggedItem);

		// Update the links array with the new order
		$authStore.links = linksCopy;
	}

	async function saveLinks() {
		try {
			if (!$authStore.user) return;

			const userRef = doc(db, 'users', $authStore.user.uid);
			await setDoc(userRef, { links: $authStore.links }, { merge: true });
		} catch (err) {
			console.error("there's an error saving", err);
		}
	}

	authStore.subscribe((current) => {
		console.log(current);

		if (current.user) {
			saveLinks();
			if (browser) {
				localStorage.setItem('links', JSON.stringify($authStore.links));
			}
		}
	});
</script>

<div class="md:p-15 flex h-full w-full flex-col p-5 sm:p-8">
	<div class="mb-5 flex w-full items-center justify-between">
		<a href="https://github.com/Clydinite/MyBrowserStartupPage" class="font-bold"
			>MyBrowserStartupPage</a
		>
		<Button class="bg-slate-500/25 font-bold text-white" on:click={authHandlers.logout}
			>Logout</Button
		>
	</div>

	<div
		class="grid flex-grow auto-rows-min grid-cols-4 gap-3 rounded-lg transition-transform md:grid-cols-6"
	>
		{#each $authStore.links as { title, href }, index}
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
				<ContextMenu.Trigger>
					<!-- website icon -->
					<div>
						<div class="flex-initial">
							<a {href} target="_blank" class="flex flex-col" draggable="false">
								<img
									src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
									alt="{title} logo"
									class="mx-auto h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12 md:h-16 md:w-16"
									draggable="true"
									on:dragstart={(event) => handleDragStart(event, index)}
									on:dragover|preventDefault
									on:drop|preventDefault={(event) => handleDrop(event, index)}
									on:touchstart={(event) => handleDragStart(event, index)}
									on:touchmove|preventDefault
								/></a
							>
						</div>
						<p
							class="select-none text-wrap py-2 text-center text-xs font-bold text-white sm:text-sm"
						>
							{title}
						</p>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content class="border-0 bg-slate-500/25 p-4 backdrop-blur-md">
					<div>
						<p class="text-white">New Title</p>
						<input
							type="text"
							bind:value={newTitle}
							class="m-2 mx-auto h-10 w-full rounded-md bg-stone-300/20 p-2 text-white"
						/>
					</div>

					<div>
						<p class="text-white">New URL</p>
						<input
							type="text"
							bind:value={newHref}
							class="m-2 mx-auto h-10 w-full rounded-md bg-stone-300/20 p-2 text-white"
						/>
					</div>

					<ContextMenu.Item
						class="rounded-button mt-2 select-none items-center rounded-md bg-slate-50/20"
						on:click={() => deleteIcon(index)}
					>
						<div>
							<div class="flex items-center">
								<div class="mx-auto h-14 w-14">
									<DeleteIcon />
								</div>
								<p class="text-white">Delete</p>
							</div>
						</div>
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
		{/each}

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- add icon -->
		<div class="flex items-start justify-center">
			<Popover.Root onOutsideClick={createIcon}>
				<Popover.Trigger>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16">
						<AddIcon />
					</div>
					<p class="text-wrap py-2 text-center text-xs font-bold text-white sm:text-sm">
						New Link
					</p></Popover.Trigger
				>
				<Popover.Content class="border-0 bg-slate-500/25 backdrop-blur-md">
					<div>
						<p class="text-white">Title</p>
						<input
							type="text"
							bind:value={newTitle}
							class="m-2 mx-auto h-10 w-full rounded-md bg-stone-300/20 p-2 text-white"
						/>
					</div>

					<div>
						<p class="text-white">URL</p>
						<input
							type="text"
							bind:value={newHref}
							class="m-2 mx-auto h-10 w-full rounded-md bg-stone-300/20 p-2 text-white"
						/>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
</div>
