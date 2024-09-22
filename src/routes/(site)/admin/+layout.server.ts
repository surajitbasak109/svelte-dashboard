import { find_user_by_session_id } from '$/server/auth/users';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const sessionId = cookies.get('session_id');
  const user = await find_user_by_session_id(sessionId);

  return { user };
};
