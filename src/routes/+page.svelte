<script lang="ts">
	import Icon from './Icon.svelte';

	class Link {
		title: string;
		href: string;

		constructor(title: string, href: string) {
			this.title = title;
			this.href = href;
		}
	}

	const links: Link[] = [
		new Link('GitHub', 'https://github.com/'),
		new Link('Twitter', 'https://twitter.com/'),
		new Link('Discord', 'https://discord.com/'),
		new Link('YouTube', 'https://youtube.com/')
	];
</script>

<div class="h-full w-full bg-slate-950">
	<div class="h-full w-full p-20">
		<div class="grid h-full w-full grid-cols-4 place-items-center gap-3 md:grid-cols-6">
			{#each links as { title, href }}
				<Icon {title} {href}></Icon>
			{/each}
            <Icon title='' href='' isPlus={true}></Icon>
		</div>
	</div>
</div>
