import prisma from '../../server/utils/prisma'

// function createUsers() {}

async function main() {
  // Users
  // await createUsers()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
