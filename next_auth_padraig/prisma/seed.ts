import{ PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.upsert({
    where: { email: 'sajanghuman21@gmail.com' },
    update: {},
    create: {
      user_id: '323',
      email: 'sajanghuman21@gmail.com',
      name: 'sajan',
      role: 'ADMIN',
      password
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
