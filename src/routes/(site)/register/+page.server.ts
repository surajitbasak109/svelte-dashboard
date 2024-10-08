import { CRM_QUEUE_TYPES } from '$/const';
import crmQueue from '$/jobs/job-queue';
import { create_user, find_user_by_email } from '$/server/auth/users';
import { generateVerificationLink } from '$/utilities/generate_verification_link';
import { dev } from '$app/environment';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirm-password') as string;

    if (password !== confirmPassword) {
      return fail(400, { email, incorrect: true });
    }

    const isExist = await find_user_by_email(email);

    if (isExist) {
      return fail(400, { email, emailExist: true });
    }

    const user = await create_user({
      email,
      password
    });

    cookies.set('session_id', user.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7 // one week
    });

    if (user.userVerify && !user.userVerify.verified_at) {
      crmQueue.add({
        type: CRM_QUEUE_TYPES.SEND_VERIFICATION_LINK,
        data: {
          email: user.email,
          verificationLInk: generateVerificationLink(user.userVerify.token)
        }
      });
    }

    if (user.roles.includes('admin')) {
      redirect(302, '/admin/profile');
    } else {
      redirect(302, '/protected');
    }
  }
} satisfies Actions;
