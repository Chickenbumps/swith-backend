/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[observerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Inviter" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inviter_userId_unique" ON "Inviter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment.userId_unique" ON "Comment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.observerId_unique" ON "User"("observerId");

-- AddForeignKey
ALTER TABLE "Inviter" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
