-- CreateEnum
CREATE TYPE "PackSize" AS ENUM ('BOTTLE', 'STRIP', 'JAR', 'TUBE', 'PACKET', 'BOX', 'SACHET', 'VIAL', 'KIT', 'BAG');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('H', 'H1', 'G', 'NRX', 'TB', 'NON_SCHEDULE');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('Gm', 'ml', 'kit', 'kg', 'piece', 'Tablet', 'Capsule', 'ltr', 'mdi');

-- CreateEnum
CREATE TYPE "PrescriptionReq" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "doseFormId" TEXT NOT NULL,
    "weightage" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "packSize" "PackSize" NOT NULL,
    "unitType" "UnitType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "routeOfAdministration" TEXT,
    "sideEffects" TEXT,
    "prescriptionReq" "PrescriptionReq" NOT NULL,
    "barcodeSKU" TEXT,
    "ndc" TEXT,
    "image" TEXT[],
    "expiryDate" TIMESTAMP(3),
    "scheduleType" "ScheduleType" NOT NULL,
    "gstPercentage" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DoseForms_id_key" ON "DoseForms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_id_key" ON "Medicine"("id");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_doseFormId_fkey" FOREIGN KEY ("doseFormId") REFERENCES "DoseForms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
