import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { compareSync } from 'bcrypt';

const db = new PrismaClient();

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    let user = null;

    try {
      user = await db.user.findUnique({
        where: {
          email: email
        }
      });
    } catch (error) {
      console.error('error when trying to use db:', error);
      return fail(500, { message: 'Something went wrong' });
    } finally {
      await db.$disconnect();
    }

    if (!user) {
      return fail(400, { email, missing: true });
    }

    if (!compareSync(password, user?.password)) {
      return fail(400, { email, incorrect: true });
    }

    cookies.set('session_id', user.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7 // one week
    });

    redirect(302, '/protected');
  }
} satisfies Actions;
