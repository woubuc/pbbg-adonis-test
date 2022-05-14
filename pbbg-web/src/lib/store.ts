import { derived, writable } from 'svelte/store';
import type { User } from './models/User';

export const user = writable<User | null>(null);
export const isAuthenticated = derived(user, u => u != null);
