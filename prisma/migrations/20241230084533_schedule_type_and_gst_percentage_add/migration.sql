/*
  Warnings:

  - Added the required column `gstPercentage` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "gstPercentage" INTEGER NOT NULL,
ADD COLUMN     "scheduleType" TEXT;
