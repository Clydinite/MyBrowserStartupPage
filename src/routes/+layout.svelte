<script lang="ts">
	import '../app.pcss';
	import { onMount } from 'svelte';

	import { auth, db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authStore } from '@/stores/auth_store';

	const publicRoutes = ['/'];

	onMount(() => {
		console.log('mounted');

		// cached links
		$authStore.links = JSON.parse(localStorage.getItem('links') || '[]');
		console.log('cached data', $authStore.links);

		// called when the component is unmounted
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const path = window.location.pathname;

			if (!user && !publicRoutes.includes(path)) {
				window.location.href = '/';
				return;
			}

			if (!user) return;

			if (user && path === '/') {
				window.location.href = '/dashboard';
				return;
			}

			// check if the user exists in firestore, if not create it

			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// this is the data we'll get from the firestore and will be set to authStore
			let dataToSetToStore: { email: string; links: { title: string; href: string }[] };

			// if the user doesn't exist in firestore
			if (!docSnap.exists()) {
				console.log('creating user');

				// create a reference to the user doc in firestore
				const userRef = doc(db, 'users', user.uid);

				dataToSetToStore = {
					email: user.email!,
					links: []
				};

				await setDoc(userRef, dataToSetToStore, { merge: true });

				// if the user does exist in firestore
			} else {
				console.log('fetching user');

				// get the data from firestore
				const userData = docSnap.data();

				// set the data we'll set to the store to what we got from firestore
				dataToSetToStore = userData as typeof dataToSetToStore;
			}

			// update the auth store with the data we got from firestore
			authStore.update((current) => {
				return {
					...current,
					...dataToSetToStore,
					user: user
				};
			});

			console.log('fetched data', $authStore);
			localStorage.setItem('links', JSON.stringify($authStore.links));

		});

		return unsubscribe;
	});
</script>

<slot />
