import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User
} from 'firebase/auth';
import { type Writable, writable } from 'svelte/store';
import { auth } from '$lib/firebase';

export const authStore: Writable<
	{
		user: User | null;
	} & MyData
> = writable({
	user: null,
	email: '',
	links: [],
	settings: {
		background: 'ethereal',
		linkOpenWay: 'current'
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
