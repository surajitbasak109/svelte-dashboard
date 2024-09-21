import { SALT_ROUNDS } from '$/const';
import { prisma_client } from '$/server/prisma_client';
import type { User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { add_user_to_role } from '../roles';

export type RegsiteredUser = Pick<User, 'email' | 'password'>;

export interface UserWithRoles extends User {
  roles: string[];
}

export async function create_user(user: RegsiteredUser) {
  const hashedPassword = hashSync(user.password, SALT_ROUNDS);
  const newUser = await prisma_client.user.create({
    data: {
      email: user.email,
      password: hashedPassword
    }
  });

  const roleName = [
    'surajitbasak109@gmail.com',
    'freshtechbloggers@gmail.com',
    'techcetblog@gmail.com',
    'sanju.das.here@gmail.com'
  ].includes(newUser.email)
    ? 'admin'
    : 'user';

  add_user_to_role(newUser.id, roleName);

  return {
    ...newUser,
    roles: [roleName]
  };
}

export async function find_user_by_email(email: string) {
  return prisma_client.user.findUnique({
    where: {
      email
    }
  });
}

export async function find_user_by_session_id(session_id: string) {
  const userWithRoles = await prisma_client.user.findUnique({
    where: {
      id: session_id
    },
    include: {
      roles: {
        select: {
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!userWithRoles) {
    throw new Error('User not found');
  }

  const user = {
    ...userWithRoles,
    roles: userWithRoles.roles.map((user_role) => user_role.role.name)
  };

  return user;
}
