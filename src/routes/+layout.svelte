<script lang="ts">
	import '../app.pcss';
	import { onMount } from 'svelte';

	import { auth, db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authStore } from '@/stores/auth_store';

	const publicRoutes = ['/', '/login'];

	onMount(() => {
		console.log('mounted');

		// cached links
		$authStore.links = JSON.parse(localStorage.getItem('links') || '[]');
		console.log('cached data', $authStore.links);

		// called when the component is unmounted
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const path = window.location.pathname;

			if (!user && !publicRoutes.includes(path)) {
				window.location.href = '/login';
				return;
			}

			if (!user) return;

			if (user && path === '/login') {
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

<div class="h-full w-full bg-cover bg-fixed bg-no-repeat">
	<div class="particle -z-10"></div>
	<slot />
</div>

<style>
	.particle {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #191b1f;
		overflow: clip;
	}

	.particle::after,
	.particle::before {
		content: '';
		display: inline-block;
		position: absolute;
		background: hsl(199, 56%, 18%);
		width: 300px;
		height: 300px;
		border-radius: 50%;
		filter: blur(70px);
		mix-blend-mode: lighten;
	}

	.particle::before {
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.particle::after {
		top: 50%;
		left: 0px;
		transform: translateX(-50%);
	}
	/*With gradient background*/
	.particle {
		background: radial-gradient(
				circle closest-corner at center 125px,
				hsl(199, 56%, 18%),
				#0f172a 70%
			)
			no-repeat;
	}
</style>

