import type { UserWithoutPassword } from '$/server/auth/users';
import { writable } from 'svelte/store';

export const user_state = writable<UserWithoutPassword | null>(null);

export function setUserToState(userData: UserWithoutPassword) {
  user_state.set(userData);
}
