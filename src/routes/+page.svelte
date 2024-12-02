<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import RightArrow from '@/svg-icons/RightArrow.svelte';
</script>

<div class="container flex min-h-screen max-w-xl flex-col justify-center gap-4 py-5">
	<img src="browser-startup-page-logo.svg" alt="Logo" class="mx-auto h-48 w-48" />

	<h1 class="scroll-m-20 py-5 text-center text-3xl font-bold tracking-tight md:text-5xl">
		MyBrowserStartupPage
	</h1>

	<a href="/login">
		<Button class="bg-white/75 font-bold w-full flex gap-3 rounded-lg"> <RightArrow /> Get Started</Button>
	</a>

	<p class="rounded-lg bg-white/20 p-4">
		Hey there, fellow human! Ever wished your browser's startup page could just get straight to the
		point? Say no more – we've got you covered.
	</p>

	<p class="rounded-lg bg-white/20 p-4">
		The minimalist startup page is all about keeping things simple. No more waking up to a chaotic
		mess of news articles and ads. Instead, picture this: a clean slate, ready for your favorite
		links and nothing else. It's like your own little corner of the internet, just the way you like
		it.
	</p>

	<p class="rounded-lg bg-white/20 p-4">
		Also, you can submit a pull request if you have any improvements or new features in mind!
	</p>
</div>
