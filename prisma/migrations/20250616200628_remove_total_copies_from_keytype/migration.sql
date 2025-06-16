-- CreateEnum
CREATE TYPE "KeyStatus" AS ENUM ('AVAILABLE', 'OUT', 'LOST');

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cooperative" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(2) NOT NULL,
    "function" VARCHAR(100) NOT NULL,
    "accessArea" TEXT,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyCopy" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "keyTypeId" UUID NOT NULL,
    "copyNumber" INTEGER NOT NULL,
    "status" "KeyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyCopy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrower" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "company" VARCHAR(100),
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LendingRecord" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "keyCopyId" UUID NOT NULL,
    "borrowerId" UUID NOT NULL,
    "lentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "idChecked" BOOLEAN NOT NULL DEFAULT false,
    "returnedDate" TIMESTAMP(3),
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LendingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KeyCopy_keyTypeId_copyNumber_key" ON "KeyCopy"("keyTypeId", "copyNumber");

-- AddForeignKey
ALTER TABLE "KeyType" ADD CONSTRAINT "KeyType_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyCopy" ADD CONSTRAINT "KeyCopy_keyTypeId_fkey" FOREIGN KEY ("keyTypeId") REFERENCES "KeyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingRecord" ADD CONSTRAINT "LendingRecord_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingRecord" ADD CONSTRAINT "LendingRecord_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingRecord" ADD CONSTRAINT "LendingRecord_keyCopyId_fkey" FOREIGN KEY ("keyCopyId") REFERENCES "KeyCopy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
