import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { SALT_ROUNDS } from '$/const';

const prisma = new PrismaClient();

async function create_default_user() {
  const hashedPassword = hashSync('password@123', SALT_ROUNDS);

  const userData = {
    name: 'CRM App',
    email: 'crm@app.ai',
    password: hashedPassword
  };

  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: userData
    });

    const adminRole = await prisma.role.findUnique({
      where: {
        name: 'admin'
      }
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: adminRole?.id
      }
    });
  } else {
    console.log('User already exist');
  }
}

export default create_default_user;
