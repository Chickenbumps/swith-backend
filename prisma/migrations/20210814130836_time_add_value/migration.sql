/*
  Warnings:

  - Added the required column `timeValue` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Time" ADD COLUMN     "timeValue" INTEGER NOT NULL;
