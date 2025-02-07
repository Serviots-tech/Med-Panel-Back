/*
  Warnings:

  - Added the required column `saltComposition` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdBy` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "saltComposition" TEXT NOT NULL,
ALTER COLUMN "createdBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
