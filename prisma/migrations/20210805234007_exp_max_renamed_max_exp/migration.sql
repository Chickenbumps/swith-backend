/*
  Warnings:

  - You are about to drop the column `expMax` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expMax",
ADD COLUMN     "maxExp" INTEGER DEFAULT 10;
