-- CreateEnum
CREATE TYPE "DrugCategory" AS ENUM ('Antibiotic', 'Painkiller', 'Vitamin', 'Antifungal', 'Antiviral');

-- CreateEnum
CREATE TYPE "DosageForm" AS ENUM ('Tablet', 'Capsule', 'Liquid', 'Ointment', 'Injection');

-- CreateEnum
CREATE TYPE "PrescriptionReq" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "ApprovalInfo" AS ENUM ('FDA', 'EMA');

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "GenericName" TEXT NOT NULL,
    "drugCategory" "DrugCategory" NOT NULL,
    "dosageForm" "DosageForm" NOT NULL,
    "strength" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "packSize" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "routeOfAdministration" TEXT NOT NULL,
    "TherapeuticClass" TEXT NOT NULL,
    "indications" TEXT NOT NULL,
    "sideEffects" TEXT NOT NULL,
    "contraindications" TEXT NOT NULL,
    "storageConditions" TEXT NOT NULL,
    "shelfLife" TEXT NOT NULL,
    "prescriptionReq" "PrescriptionReq" NOT NULL,
    "approvalInfo" "ApprovalInfo" NOT NULL,
    "barcodeSKU" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "interactions" TEXT NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,
    "ndc" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "specialConsiderations" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_id_key" ON "Medicine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_barcodeSKU_key" ON "Medicine"("barcodeSKU");
