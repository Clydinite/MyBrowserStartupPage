<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<a {href} target="_blank">
		<div>
			<img
				src="https://www.google.com/s2/favicons?sz=64&domain_url={href}"
				alt="{title} logo"
				class="mx-auto h-8 w-8 rounded-md object-cover sm:h-12 sm:w-12 md:h-16 md:w-16"
			/>
		</div>
		<p class="text-nowrap text-sm sm:text-base py-2 text-center font-bold text-white">{title}</p>
	</a>
</div>
