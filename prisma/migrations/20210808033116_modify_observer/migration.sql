/*
  Warnings:

  - Added the required column `userId` to the `Observer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Observer" ADD COLUMN     "userId" INTEGER NOT NULL;
