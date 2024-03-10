import { browser } from '$app/environment';
import { writable } from 'svelte/store';

class Link {
	title: string;
	href: string;

	constructor(title: string, href: string) {
		this.title = title;
		this.href = href;
	}
}

const initialValue = browser ? JSON.parse(localStorage.getItem('links') || "[]") : []

const links = writable<Link[]>(initialValue);

links.subscribe((updatedValue) => {
	if (browser) {
		localStorage.setItem('links', JSON.stringify(updatedValue));
	}
});

export { Link, links };
