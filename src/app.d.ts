// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client';
import type { CompositionEventHandler } from 'svelte/elements';
import type { UserWithRoles } from './server/auth/users';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      prisma: PrismaClient;
      form_data: Record<string, unknown>;
      user: UserWithRoles | null;
      session: {
        ip: string;
        country: string;
      };
    }
    interface PageData {
      flash?: { type: 'success' | 'error' | 'info' | 'warning'; message: string };
    }
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
