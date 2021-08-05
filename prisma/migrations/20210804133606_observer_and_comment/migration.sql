/*
  Warnings:

  - Added the required column `monthTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todayTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "monthTime" TEXT NOT NULL,
ADD COLUMN     "observerId" INTEGER NOT NULL,
ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "todayTime" TEXT NOT NULL,
ADD COLUMN     "totalTime" TEXT NOT NULL,
ADD COLUMN     "weekTime" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Observer" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("observerId") REFERENCES "Observer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
