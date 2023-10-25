import { PrismaClient } from "@prisma/client";
import { USER } from "../src/interfaces/user";
import { JOBS } from "../src/constants/jobs";
import { encryptData } from "../src/helpers/encryptionHelpers";
import { Job } from "../src/interfaces/job";

const prisma = new PrismaClient();

const userData: USER = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "abcd1234",
};

const addUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (!user) {
    const encryptedPassword = encryptData(userData.password);
    const userObj = await prisma.user.create({
      data: { ...userData, password: encryptedPassword },
    });
    console.log(`Created new user: ${userObj.email}`);
    JOBS.forEach(async (postData: Job) => {
      await prisma.job.create({
        data: postData,
      });
    });
    console.log(`Created dummy jobs`);
  }
};

async function main() {
  await addUser();
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
