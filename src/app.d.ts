// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type MyData = {
		email: string;
		links: { title: string; href: string }[];
		settings: { background: "ethereal" | "black"; linkOpenWay: "new" | "current" };
	}	
}

export {};
