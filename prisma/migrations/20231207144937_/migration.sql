/*
  Warnings:

  - You are about to drop the column `ImgLink` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Group` DROP COLUMN `ImgLink`,
    ADD COLUMN `imgLink` VARCHAR(191) NULL;
