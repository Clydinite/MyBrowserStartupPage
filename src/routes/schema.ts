import { z } from 'zod';

export const formSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, {
				message:
					"Hi, you know that a password less than 6 characters ain't gonna defend yourself against a Brute Force attack, right?"
			})
			.max(20, {
				message:
					"Hi, you know that a password more than 20 characters is obviously too long, don't waste your time on that. We're trying to cut down database storage fees."
			}),
		confirm: z.string().min(6).max(20).optional()
	})
	.refine(({ password, confirm }) => password === confirm, {
		message: 'Passwords do not match',
		path: ['confirm']
	});

export type FormSchema = typeof formSchema;
