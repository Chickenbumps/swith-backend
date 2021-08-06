/*
  Warnings:

  - A unique constraint covering the columns `[inviterId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Group.inviterId_unique" ON "Group"("inviterId");

-- AlterIndex
ALTER INDEX "Inviter_userId_unique" RENAME TO "Inviter.userId_unique";
