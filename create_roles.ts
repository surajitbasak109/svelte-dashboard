import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.createMany({
    data: [{ name: 'author' }, { name: 'admin' }, { name: 'user' }],
    skipDuplicates: true
  });

  console.log(role);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
