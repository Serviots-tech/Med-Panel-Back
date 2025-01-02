/*
  Warnings:

  - The values [Antibiotic,Painkiller,Vitamin,Antifungal,Antiviral] on the enum `DrugCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DrugCategory_new" AS ENUM ('H', 'H1', 'G', 'NRX', 'TB', 'NON_SCHEDULE');
ALTER TABLE "Medicine" ALTER COLUMN "drugCategory" TYPE "DrugCategory_new" USING ("drugCategory"::text::"DrugCategory_new");
ALTER TYPE "DrugCategory" RENAME TO "DrugCategory_old";
ALTER TYPE "DrugCategory_new" RENAME TO "DrugCategory";
DROP TYPE "DrugCategory_old";
COMMIT;
