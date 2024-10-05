import { verify_email_address } from '$/server/auth/users.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ url }) {
  if (!url.searchParams.has('token')) {
    redirect(302, '/');
  }
  const token = url.searchParams.get('token') as string;

  let verified;

  try {
    verified = await verify_email_address(token);
  } catch (error) {
    console.error(error);
    redirect(302, '/?verified=false');
  }

  redirect(302, '/?verified=true&message=' + verified);
}
