-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_doseFormId_fkey";

-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "doseFormId" DROP NOT NULL,
ALTER COLUMN "flavors" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_doseFormId_fkey" FOREIGN KEY ("doseFormId") REFERENCES "DoseForms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
