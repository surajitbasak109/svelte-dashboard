import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { SALT_ROUNDS } from '$/const';

const prisma = new PrismaClient();

async function create_default_user() {
  const hashedPassword = hashSync('password@123', SALT_ROUNDS);

  const userData = {
    name: 'Surajit Basak',
    email: 'surajitbasak109@gmail.com',
    password: hashedPassword
  };

  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (!existingUser) {
    await prisma.user.create({
      data: userData
    });
  } else {
    console.log("User already exist");
  }
}

export default create_default_user;
