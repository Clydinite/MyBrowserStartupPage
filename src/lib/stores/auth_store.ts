import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User
} from 'firebase/auth';
import { type Writable, writable } from 'svelte/store';
import { auth } from '$lib/firebase';

export const authStore: Writable<{
	user: User | null;
	links: { title: string; href: string }[];
	settings: { background: number; linkOpenWay: string };
}> = writable({
	user: null,
	links: [],
	settings: {
		background: 0,
		linkOpenWay: 'new'
	}
});

export const authHandlers = {
	signup: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},

	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},

	logout: async () => {
		await signOut(auth);
	}
};
