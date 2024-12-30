/*
  Warnings:

  - The `image` column on the `Medicine` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
