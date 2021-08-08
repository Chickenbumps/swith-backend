/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Observer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Observer.userId_unique" ON "Observer"("userId");
