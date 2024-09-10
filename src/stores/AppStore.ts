import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';

type storeType = {
	isSidebarHidden: boolean;
};

export const isSidebarHiddenStorageKey = 'is-sidebar-hidden';

let isSidebarHidden = false;
if (browser && window.localStorage.getItem(isSidebarHiddenStorageKey)) {
    isSidebarHidden = window.localStorage.getItem(isSidebarHiddenStorageKey) === 'true';
}

export const appStore: Writable<storeType> = writable({
	isSidebarHidden,
});
