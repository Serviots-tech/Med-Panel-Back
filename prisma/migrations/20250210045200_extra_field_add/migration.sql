/*
  Warnings:

  - Added the required column `flavors` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketedBy` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubCategory" AS ENUM ('MOTHER_CARE', 'PROTEIN_POWDERS_DRINKS', 'VITAMINS_SUPPLEMENTS', 'SEXUAL_HEALTH_SUPPLEMENTS', 'FEMININE_HYGIENE', 'GROOMING', 'HAIR_CARE', 'ORAL_CARE', 'FRAGRANCES', 'PET_PRODUCT', 'CLEANING_ESSENTIALS', 'FOOD_DRINK', 'DIAPERS_WIPES', 'BABY_PRODUCT', 'SKIN_CARE');

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "flavors" TEXT NOT NULL,
ADD COLUMN     "hsnCode" TEXT,
ADD COLUMN     "marketedBy" TEXT NOT NULL,
ADD COLUMN     "offers" TEXT,
ADD COLUMN     "saltStrength" TEXT,
ADD COLUMN     "subCategory" "SubCategory" NOT NULL;
