/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Inviter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inviter.id_userId_unique" ON "Inviter"("id", "userId");
