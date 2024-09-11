import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const sidebar_status = writable<'HIDDEN' | 'ACTIVE'>('ACTIVE');
export const sidebar_width = writable<number>(256);

const LC_SIDEBAR_STATUS_KEY = 'sidebar-status';

const shouldUseLocalStorage = false;

if (shouldUseLocalStorage && browser && window.localStorage != undefined) {
	const status = localStorage.getItem(LC_SIDEBAR_STATUS_KEY);
	if (status) {
		sidebar_status.set(status === 'ACTIVE' ? 'ACTIVE' : 'HIDDEN');
	}
}

export function hide() {
	sidebar_status.set('HIDDEN');
}

export function toggle_hide() {
	sidebar_status.update((value) => {
		const newValue = value === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE';
		if (newValue === 'HIDDEN') {
			sidebar_width.set(0);
		} else {
			sidebar_width.set(256);
		}
		if (shouldUseLocalStorage && browser && window.localStorage != undefined) {
			window.localStorage.setItem(LC_SIDEBAR_STATUS_KEY, newValue);
		}

		return newValue;
	});
}
