-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pushToken" TEXT;

-- RenameIndex
ALTER INDEX "Inviter_userId_unique" RENAME TO "Inviter.userId_unique";
