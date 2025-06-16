/*
  Warnings:

  - You are about to drop the column `profileId` on the `Borrower` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `KeyType` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `LendingRecord` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Borrower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `KeyType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LendingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Borrower" DROP CONSTRAINT "Borrower_profileId_fkey";

-- DropForeignKey
ALTER TABLE "KeyType" DROP CONSTRAINT "KeyType_profileId_fkey";

-- DropForeignKey
ALTER TABLE "LendingRecord" DROP CONSTRAINT "LendingRecord_profileId_fkey";

-- AlterTable
ALTER TABLE "Borrower" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "KeyType" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "LendingRecord" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cooperative" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "KeyType" ADD CONSTRAINT "KeyType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingRecord" ADD CONSTRAINT "LendingRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
