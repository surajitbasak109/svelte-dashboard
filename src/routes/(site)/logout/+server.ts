import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
  cookies.delete('session_id', { path: '/' });
  return json({
    success: true,
    message: 'Successfully logged out'
  });
};
