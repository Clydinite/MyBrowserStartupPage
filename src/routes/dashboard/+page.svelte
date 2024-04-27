<script lang="ts">
	import Icon from '../Icon.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import { db } from '$lib/firebase';
	import { authHandlers, authStore } from '$lib/stores/auth_store';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	let newTitle = '';
	let newHref = '';

	// TODO: add a way to reorder the links by dragging
	// TODO: store data into a database
	// TODO: authentication, create accounts, and store user data

	function createNewIcon() {
		if (newTitle && newHref) {
			$authStore.links.push({ title: newTitle, href: newHref });
			$authStore.links = $authStore.links; // update

			newTitle = '';
			newHref = '';
		}
	}

	function updateIcon(index: number) {
		if (newTitle && newHref) {
			$authStore.links[index] = { title: newTitle, href: newHref };
		}
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
		console.log(current.links);
		saveLinks();
	});
</script>

<div class="h-full w-full bg-gray-950">
	<div class="h-full w-full p-5 sm:p-10 md:p-20">
		
		<div
			class="grid h-full w-full grid-cols-4 grid-rows-6 place-items-center gap-3 rounded-lg transition-transform md:grid-cols-6 md:grid-rows-5"
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
						<Icon {title} {href}></Icon>
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
							on:click={() => {
								$authStore.links.splice(index, 1);
								$authStore.links = $authStore.links; // update
							}}
						>
							<div>
								<div class="flex items-center">
									<div class="mx-auto h-14 w-14">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="stroke-slate-200 p-3"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</div>
									<p class="text-white">Delete</p>
								</div>
							</div>
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			{/each}

			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div>
				<Popover.Root onOutsideClick={createNewIcon}>
					<Popover.Trigger>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="mx-auto h-12 w-12 md:h-16 md:w-16">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="rounded-md bg-slate-50/20 stroke-slate-200 object-cover p-3"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</div>
						<p class="text-nowrap py-2 text-center font-bold text-white">
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
</div>
