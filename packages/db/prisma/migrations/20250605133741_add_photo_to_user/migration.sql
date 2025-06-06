/*
  Warnings:

  - You are about to drop the column `shapes` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - Added the required column `message` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "shapes",
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "ShapeMovement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shapeIndex" INTEGER NOT NULL,
    "shapeData" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "ShapeMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShapeMovement_roomId_idx" ON "ShapeMovement"("roomId");

-- CreateIndex
CREATE INDEX "ShapeMovement_userId_idx" ON "ShapeMovement"("userId");

-- AddForeignKey
ALTER TABLE "ShapeMovement" ADD CONSTRAINT "ShapeMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShapeMovement" ADD CONSTRAINT "ShapeMovement_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
