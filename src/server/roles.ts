import { prisma_client } from './prisma_client';

export const add_user_to_role = async (userId: string, roleName: string) => {
  console.log({ roleName });
  const role = await prisma_client.role.findUnique({
    where: {
      name: roleName
    }
  });

  console.log(role);

  if (!role) {
    throw new Error(`Role with name ${roleName} not found.`);
  }

  const userRole = await prisma_client.userRole.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      role: {
        connect: {
          id: role.id
        }
      }
    }
  });

  return userRole;
};
