import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, {
				message:
					"Hi, you know that a password less than 6 characters ain't gonna defend yourself against a brute force attack, right?"
			})
			.max(30, {
				message:
					"Hi, you know that a password more than 30 characters is obviously too long, don't waste your time on that. We're trying to cut down database storage fees."
			}),
		confirm: z.string().min(6, {message: ''}).max(30, {message: ''})
	})
	.refine(({ password, confirm }) => password === confirm, {
		message: 'Passwords do not match',
		path: ['confirm']
	});

export type RegisterSchema = typeof registerSchema;

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

export type LoginSchema = typeof loginSchema

export const settingsSchema = z.object({
	background: z.enum(['ethereal', 'black']),
	linkOpenWay: z.enum(['new', 'current'])
})

export type SettingsSchema = typeof settingsSchema