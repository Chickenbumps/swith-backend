/*
  Warnings:

  - The `monthTime` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `todayTime` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalTime` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weekTime` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "exp" INTEGER DEFAULT 0,
ADD COLUMN     "expMax" INTEGER DEFAULT 10,
DROP COLUMN "monthTime",
ADD COLUMN     "monthTime" INTEGER DEFAULT 0,
ALTER COLUMN "rank" SET DEFAULT E'Bronze',
DROP COLUMN "todayTime",
ADD COLUMN     "todayTime" INTEGER DEFAULT 0,
DROP COLUMN "totalTime",
ADD COLUMN     "totalTime" INTEGER DEFAULT 0,
DROP COLUMN "weekTime",
ADD COLUMN     "weekTime" INTEGER DEFAULT 0;
