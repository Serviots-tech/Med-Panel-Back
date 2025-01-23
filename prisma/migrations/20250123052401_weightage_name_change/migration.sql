/*
  Warnings:

  - You are about to drop the column `Weightage` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `weightage` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "Weightage",
ADD COLUMN     "weightage" TEXT NOT NULL;
