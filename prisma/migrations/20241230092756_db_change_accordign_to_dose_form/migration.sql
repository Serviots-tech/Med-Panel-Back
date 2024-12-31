/*
  Warnings:

  - You are about to drop the column `dosageForm` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `doseFormId` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "dosageForm",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "doseFormId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DosageForm";

-- CreateTable
CREATE TABLE "DoseForms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoseForms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoseForms_id_key" ON "DoseForms"("id");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_doseFormId_fkey" FOREIGN KEY ("doseFormId") REFERENCES "DoseForms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
