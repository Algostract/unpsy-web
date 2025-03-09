-- CreateEnum
CREATE TYPE "ScaleName" AS ENUM ('MACI', 'MCMI', 'MMPI_RF', 'TCI', 'MPQ', 'EPQ', 'EPQ_R', 'JTCI', 'SCL_90R', 'DSMD_C', 'DSMD_A');

-- CreateEnum
CREATE TYPE "ScaleType" AS ENUM ('Binary', 'Pentanary');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "PaymentInstrument" AS ENUM ('UPI', 'NetBanking', 'Card');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Free', 'Basic', 'Pro');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('Pending', 'Success', 'Failed');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('Draft', 'Complete');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('Compilant', 'Feedback');

-- CreateTable
CREATE TABLE "Option" (
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "scale" "ScaleName" NOT NULL
);

-- CreateTable
CREATE TABLE "Preference" (
    "isModeLight" BOOLEAN NOT NULL,
    "payment" "PaymentInstrument" NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "Gender",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "name" "Plan" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseScale" (
    "name" "ScaleName" NOT NULL,
    "monthlyPrice" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "purchaseId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "scale" "ScaleName" NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "data" JSONB NOT NULL,
    "value" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "patientId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Option_name_scale_key" ON "Option"("name", "scale");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_id_userId_key" ON "Purchase"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseScale_name_purchaseId_key" ON "PurchaseScale"("name", "purchaseId");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseScale" ADD CONSTRAINT "PurchaseScale_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
