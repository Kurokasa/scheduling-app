/*
  Warnings:

  - You are about to drop the column `mainschedule` on the `Meeting` table. All the data in the column will be lost.
  - The `members` column on the `Meeting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `Meeting` DROP COLUMN `mainschedule`,
    ADD COLUMN `mainscheduleID` INTEGER NULL,
    DROP COLUMN `members`,
    ADD COLUMN `members` JSON NULL;
