/*
  Warnings:

  - You are about to alter the column `accepted` on the `UserZusage` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `UserZusage` MODIFY `accepted` VARCHAR(191) NOT NULL DEFAULT 'waiting';
