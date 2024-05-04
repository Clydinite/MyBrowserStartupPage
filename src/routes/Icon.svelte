<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<div class="flex-initial">
		<a {href} target="_blank" class="flex flex-col">
			<img
				src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
				alt="{title} logo"
				class="mx-auto h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12 md:h-16 md:w-16"
			/></a
		>
	</div>
	<p class="text-wrap py-2 text-center text-xs font-bold text-white sm:text-sm">{title}</p>
</div>
