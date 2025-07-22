import app from './app';
import config from './config/config';
import connectDB, { prisma } from './db/connectDB';

// ConnectDB
connectDB()

async function main() {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
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