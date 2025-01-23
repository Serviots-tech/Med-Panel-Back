/*
  Warnings:

  - You are about to drop the column `TherapeuticClass` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `approvalInfo` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `batchNumber` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `contraindications` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `countryOfOrigin` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `distributor` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `drugCategory` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `indications` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `interactions` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `shelfLife` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `specialConsiderations` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `storageConditions` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `Weightage` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `packSize` on the `Medicine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `scheduleType` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PackSize" AS ENUM ('BOTTLE', 'STRIP', 'JAR', 'TUBE', 'PACKET', 'BOX', 'SACHET', 'VIAL', 'KIT', 'BAG');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('H', 'H1', 'G', 'NRX', 'TB', 'NON_SCHEDULE');

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "TherapeuticClass",
DROP COLUMN "approvalInfo",
DROP COLUMN "batchNumber",
DROP COLUMN "contraindications",
DROP COLUMN "countryOfOrigin",
DROP COLUMN "distributor",
DROP COLUMN "drugCategory",
DROP COLUMN "indications",
DROP COLUMN "interactions",
DROP COLUMN "shelfLife",
DROP COLUMN "specialConsiderations",
DROP COLUMN "storageConditions",
DROP COLUMN "strength",
ADD COLUMN     "Weightage" TEXT NOT NULL,
DROP COLUMN "packSize",
ADD COLUMN     "packSize" "PackSize" NOT NULL,
ALTER COLUMN "routeOfAdministration" DROP NOT NULL,
ALTER COLUMN "sideEffects" DROP NOT NULL,
ALTER COLUMN "barcodeSKU" DROP NOT NULL,
ALTER COLUMN "ndc" DROP NOT NULL,
DROP COLUMN "scheduleType",
ADD COLUMN     "scheduleType" "ScheduleType" NOT NULL;

-- DropEnum
DROP TYPE "ApprovalInfo";

-- DropEnum
DROP TYPE "DrugCategory";
