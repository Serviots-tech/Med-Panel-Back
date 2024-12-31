/*
  Warnings:

  - You are about to drop the column `GenericName` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `productType` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "GenericName",
ADD COLUMN     "productType" TEXT NOT NULL;
