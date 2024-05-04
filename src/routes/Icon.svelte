<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<a {href} target="_blank" class="flex flex-col">
		<div class="flex-initial">
			<img
				src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
				alt="{title} logo"
				class="mx-auto h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12 md:h-16 md:w-16"
			/>
		</div>
		<p class="text-wrap text-xs sm:text-sm py-2 text-center font-bold text-white">{title}</p>
	</a>
</div>
