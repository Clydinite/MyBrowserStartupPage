import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { registerSchema, loginSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const registerForm = await superValidate(zod(registerSchema));
	const loginForm = await superValidate(zod(loginSchema));

	return { registerForm, loginForm };
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form, success: false });
		}

		console.log('register', form);

		return { form, success: true };
	},

	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form, success: false });
		}

		console.log('login', form);

		return { form, success: true };
	}
};
