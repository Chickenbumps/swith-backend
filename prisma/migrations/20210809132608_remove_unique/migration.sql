-- DropIndex
DROP INDEX "Inviter.id_userId_unique";

-- AlterIndex
ALTER INDEX "Inviter_userId_unique" RENAME TO "Inviter.userId_unique";
