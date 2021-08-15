/*
  Warnings:

  - You are about to drop the column `friday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `monday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `saturday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sunday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "friday",
DROP COLUMN "monday",
DROP COLUMN "saturday",
DROP COLUMN "sunday",
DROP COLUMN "thursday",
DROP COLUMN "tuesday",
DROP COLUMN "wednesday",
ALTER COLUMN "monthTime" DROP DEFAULT,
ALTER COLUMN "todayTime" DROP DEFAULT,
ALTER COLUMN "totalTime" DROP DEFAULT,
ALTER COLUMN "weekTime" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Time" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
