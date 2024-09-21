// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import create_default_user from './create_default_user';

// node --loader ts-node/esm prisma/seed.ts

const prisma = new PrismaClient();

async function main() {
  const existingRoles = await prisma.role.findMany();
  if (existingRoles.length === 0) {
    await prisma.role.createMany({
      data: [{ name: 'admin' }, { name: 'user' }, { name: 'author' }]
    });
    console.log('Roles Loaded.');
  } else {
    console.log('Roles already exist. No action taken.');
  }

  await create_default_user();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
