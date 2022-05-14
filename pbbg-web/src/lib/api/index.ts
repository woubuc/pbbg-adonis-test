import type { Game } from '$lib/models/Game';
import type { User } from '$lib/models/User';
import { user } from '$lib/store';

import { request } from './request';

export const api = {
	auth: {
		me: () => request
			.get<User>('auth/me')
			.optional()
			.set(user)
			.exec(),
		login: (body: FormData) => request
			.post<User>('auth/login')
			.body(body)
			.set(user)
			.exec(),
		register: (body: FormData) => request
			.post<User>('auth/register')
			.body(body)
			.set(user)
			.exec(),
		logout: () => request
			.post<User>('auth/logout')
			.optional()
			.set(user)
			.exec(),
	},

	games: {
		create: (body: FormData) => request
			.post<Game>('games')
			.body(body)
			.exec(),
	},
	game: (slug: string) => ({
		get: () => request.get<Game>('games', slug).exec(),
	}),
};
