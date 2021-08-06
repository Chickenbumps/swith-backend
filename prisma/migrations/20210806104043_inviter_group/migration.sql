/*
  Warnings:

  - Added the required column `inviterId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "inviterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD FOREIGN KEY ("inviterId") REFERENCES "Inviter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
