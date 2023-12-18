/*
  Warnings:

  - You are about to drop the column `mainscheduleID` on the `Meeting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Meeting` DROP COLUMN `mainscheduleID`;

-- CreateTable
CREATE TABLE `Reschedules` (
    `mainID` INTEGER NOT NULL,
    `subID` INTEGER NOT NULL,

    UNIQUE INDEX `Reschedules_subID_key`(`subID`),
    PRIMARY KEY (`mainID`, `subID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reschedules` ADD CONSTRAINT `Reschedules_mainID_fkey` FOREIGN KEY (`mainID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reschedules` ADD CONSTRAINT `Reschedules_subID_fkey` FOREIGN KEY (`subID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
