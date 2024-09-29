import { SALT_ROUNDS } from '$/const';
import { prisma_client } from '$/server/prisma_client';
import type { User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { add_user_to_role } from '../roles';

export type RegsiteredUser = Pick<User, 'email' | 'password'>;
export type UpdateProfileData = Pick<User, 'name' | 'avatar_url' | 'username'>;

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserWithRoles extends UserWithoutPassword {
  roles: string[];
}

export async function create_user(user: RegsiteredUser) {
  const hashedPassword = hashSync(user.password, SALT_ROUNDS);
  const newUser = await prisma_client.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      userVerify: {
        create: {
          token: crypto.randomUUID()
        }
      }
    },
    include: {
      userVerify: true
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
}

export async function update_profile(userId: string, profile: UpdateProfileData) {
  return await prisma_client.user.update({
    where: {
      id: userId
    },
    data: {
      name: profile.name,
      avatar_url: profile.avatar_url,
      username: profile.username
    }
  });
}

export async function find_user_by_session_id(session_id: string | undefined) {
  if (!session_id) return null;
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
      },
      userVerify: true
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

export async function verify_email_address(token: string): Promise<string> {
  const userVerify = await prisma_client.userVerify.findFirst({
    where: {
      token
    }
  });

  if (!userVerify) {
    return 'Verification token is not valid';
  }

  if (userVerify.verified_at) {
    return 'User is already verified';
  }

  const verified = await prisma_client.userVerify.update({
    where: {
      id: userVerify.id
    },
    data: {
      verified_at: new Date()
    }
  });

  if (verified) {
    return 'User has been verified';
  } else {
    // Add a return statement or throw an error here
    // For example:
    throw new Error('Failed to verify user');
  }
}
