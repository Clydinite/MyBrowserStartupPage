import type { PageServerLoad } from './$types.js';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { settingsSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { get } from 'svelte/store';
import { authStore } from '$lib/stores/auth_store.js';

export const load: PageServerLoad = async ({ depends }) => {
	// depends('data:settings');

	console.log('auth store data from load', get(authStore));

	return {
		form: await superValidate(get(authStore).settings, zod(settingsSchema)) // populate the form with the current settings
	};
};

export const actions: Actions = {
	settings: async (event) => {
		const form = await superValidate(event, zod(settingsSchema));

		if (!form.valid) {
			return fail(400, { form, success: false });
		}

		console.log('settings', form);

		return { form, success: true };
	}
};
