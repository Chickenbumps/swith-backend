-- AlterTable
ALTER TABLE "User" ALTER COLUMN "exp" SET DEFAULT 0,
ALTER COLUMN "exp" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "maxExp" SET DEFAULT 10,
ALTER COLUMN "maxExp" SET DATA TYPE DOUBLE PRECISION;