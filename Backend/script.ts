import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: "skm@gmail.com", 
    },
  });
  
  console.log(user);
}

main()
  .catch((e) => {
    console.log("something went wrong " + e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

 