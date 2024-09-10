// See https://kit.svelte.dev/docs/types#app

import type { CompositionEventHandler } from "svelte/elements";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:click_outside'?: CompositionEventHandler;
		}
	}
}

export {};
