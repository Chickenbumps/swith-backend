-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DATA TYPE TEXT;