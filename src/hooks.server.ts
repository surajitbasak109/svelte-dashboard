import { redirect, type Handle } from '@sveltejs/kit';
import { find_user_by_session_id } from './server/auth/users';
import { sequence } from '@sveltejs/kit/hooks';

// * HOOKS
// RUNS ON EVERY REQUEST

export const auth: Handle = async function ({ event, resolve }) {
  const sessionId = event.cookies.get('session_id');

  if (sessionId) {
    const user = await find_user_by_session_id(sessionId);
    if (user) {
      event.locals.user = user;
    }
  }

  const response = await resolve(event);
  return response;
};

export const alreadyLogged: Handle = async function ({ event, resolve }) {
  if (
    (event.route.id?.startsWith('/login') || event.route.id?.startsWith('/register')) &&
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
  if (event.route.id?.startsWith('/(site)/admin') && !event.locals?.user?.roles?.includes('admin')) {
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

// const db = new PrismaClient();
// const unProtectedRoutes = ['/', 'login', 'register', 'callback', 'microsoft'];
// export const handle: Handle = async ({ event, resolve }) => {
//   const sessionId = event.cookies.get('session_id');
//   if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
//     redirect(303, '/');
//   }

//   let currentUser = null;

//   try {
//     currentUser = await db.user.findUnique({ where: { id: sessionId } });
//   } catch (error) {
//     console.error('Database error: ', error);
//   } finally {
//     db.$disconnect();
//   }

//   if (currentUser) {
//     if (['/login', '/register'].includes(event.url.pathname)) {
//       redirect(303, '/protected');
//     }
//     event.locals.user = {
//       isAuthenticated: true,
//       email: currentUser.email,
//       id: currentUser.id
//     };
//   } else {
//     if (!unProtectedRoutes.includes(event.url.pathname)) {
//       redirect(303, '/');
//     }
//   }

//   return resolve(event);
// };
