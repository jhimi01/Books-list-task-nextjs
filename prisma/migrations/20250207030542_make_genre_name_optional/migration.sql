/*
  Warnings:

  - You are about to drop the column `genreId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_genreId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genreId",
ADD COLUMN     "genreName" TEXT;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_genreName_fkey" FOREIGN KEY ("genreName") REFERENCES "Genre"("name") ON DELETE SET NULL ON UPDATE CASCADE;
