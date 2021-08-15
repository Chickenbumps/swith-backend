-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friday" INTEGER DEFAULT 0,
ADD COLUMN     "monday" INTEGER DEFAULT 0,
ADD COLUMN     "saturday" INTEGER DEFAULT 0,
ADD COLUMN     "sunday" INTEGER DEFAULT 0,
ADD COLUMN     "thursday" INTEGER DEFAULT 0,
ADD COLUMN     "tuesday" INTEGER DEFAULT 0,
ADD COLUMN     "wednesday" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "todayTime" INTEGER,
    "sunday" INTEGER,
    "monday" INTEGER,
    "tuesday" INTEGER,
    "wednesday" INTEGER,
    "thursday" INTEGER,
    "friday" INTEGER,
    "saturday" INTEGER,
    "weekTime" INTEGER,
    "monthTime" INTEGER,
    "totalTime" INTEGER,

    PRIMARY KEY ("id")
);
