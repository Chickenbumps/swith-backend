/*
  Warnings:

  - You are about to drop the `Observer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Observer" DROP CONSTRAINT "Observer_userId_fkey";

-- DropTable
DROP TABLE "Observer";

-- CreateTable
CREATE TABLE "_UserToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUser_AB_unique" ON "_UserToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUser_B_index" ON "_UserToUser"("B");

-- AddForeignKey
ALTER TABLE "_UserToUser" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
