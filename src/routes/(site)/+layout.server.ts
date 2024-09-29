import { find_user_by_session_id } from '$/server/auth/users';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, route }) => {
  const sessionId = cookies.get('session_id');

  console.log(route.id);

  if (['/(site)/protected'].includes(route.id)) {
    if (!sessionId) {
      return redirect(302, '/login');
    }
  }
  
  const user = await find_user_by_session_id(sessionId);
  return { user };
};
