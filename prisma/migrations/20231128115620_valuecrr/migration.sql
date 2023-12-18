/*
  Warnings:

  - You are about to alter the column `accepted` on the `UserZusage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Uhg` MODIFY `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserZusage` MODIFY `accepted` BOOLEAN NOT NULL DEFAULT false;
