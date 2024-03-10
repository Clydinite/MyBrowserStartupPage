<script lang="ts">
	export let title: string;
	export let href: string;
	export let isPlus: boolean = false;
</script>

<div>
	{#if isPlus}
		<div class="h-12 w-12 md:h-16 md:w-16">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="rounded-md bg-slate-50/20 stroke-slate-200 p-2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</div>
		<p class="py-2 text-center text-white">New Link</p>
	{:else}
		<a {href} target="_blank">
			<div>
				<img
					src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
					alt="{title} logo"
					class="h-12 w-12 rounded-md object-cover md:h-16 md:w-16"
				/>
			</div>
			<p class="py-2 text-center text-white">{title}</p>
		</a>
	{/if}
</div>
