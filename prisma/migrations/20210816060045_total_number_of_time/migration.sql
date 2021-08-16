/*
  Warnings:

  - You are about to drop the column `numberPerTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timePerNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "numberPerTime",
DROP COLUMN "timePerNumber",
ADD COLUMN     "totalNumberOfTime" DOUBLE PRECISION DEFAULT 0;
