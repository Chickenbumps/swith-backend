/*
  Warnings:

  - You are about to drop the column `observerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Observer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_observerId_fkey";

-- DropIndex
DROP INDEX "User.observerId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "observerId";

-- CreateIndex
CREATE UNIQUE INDEX "Observer_userId_unique" ON "Observer"("userId");

-- AddForeignKey
ALTER TABLE "Observer" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
