import { redirect, type Handle } from '@sveltejs/kit';
import { find_user_by_session_id } from './server/auth/users';
import { sequence } from '@sveltejs/kit/hooks';

export const auth: Handle = async function ({ event, resolve }) {
  const sessionId = event.cookies.get('session_id');

  if (sessionId) {
    try {
      const user = await find_user_by_session_id(sessionId);
      if (user) {
        event.locals.user = user;
      }
    } catch (error) {
      console.error(error);
      event.cookies.delete('session_id', { path: '/' });
    }
  }

  const response = await resolve(event);
  return response;
};

export const alreadyLogged: Handle = async function ({ event, resolve }) {
  if (
    (event.route.id?.startsWith('/(site)/login') ||
      event.route.id?.startsWith('/(site)/register')) &&
    event.locals?.user
  ) {
    if (event.locals?.user.roles?.includes('admin')) {
      redirect(302, '/admin');
    } else {
      redirect(302, '/protected');
    }
  }

  return resolve(event);
};

export const admin: Handle = async function ({ event, resolve }) {
  if (
    event.route.id?.startsWith('/(site)/admin') &&
    !event.locals?.user?.roles?.includes('admin')
  ) {
    redirect(302, '/login');
  }
  return resolve(event);
};

export const protectedRoute: Handle = async function ({ event, resolve }) {
  if (event.route.id?.startsWith('/(site)/protected') && !event.locals?.user) {
    redirect(302, '/login');
  }
  return resolve(event);
};

export const document_policy: Handle = async function ({ event, resolve }) {
  const response = await resolve(event);
  response.headers.set('Document-Policy', 'js-profiling');
  return response;
};

export const handle: Handle = sequence(auth, document_policy, admin, alreadyLogged, protectedRoute);
