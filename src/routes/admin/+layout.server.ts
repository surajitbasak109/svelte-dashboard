import { loadFlash } from 'sveltekit-flash-message/server';
import { find_user_by_session_id } from '$/server/auth/users';
import { redirect } from '@sveltejs/kit';

export const load = loadFlash(async (event) => {
  const sessionId = event.cookies.get('session_id');

  if (!sessionId) {
    return redirect(302, '/login');
  }

  const user = await find_user_by_session_id(sessionId);

  return { user };
});
