/*
  Warnings:

  - You are about to drop the column `day` on the `Time` table. All the data in the column will be lost.
  - Added the required column `dayName` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Time" DROP COLUMN "day",
ADD COLUMN     "dayName" TEXT NOT NULL;
