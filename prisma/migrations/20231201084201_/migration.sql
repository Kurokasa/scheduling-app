/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Meeting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reschedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Uhg` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserZusage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Meeting` DROP FOREIGN KEY `Meeting_groupID_fkey`;

-- DropForeignKey
ALTER TABLE `Reschedules` DROP FOREIGN KEY `Reschedules_mainID_fkey`;

-- DropForeignKey
ALTER TABLE `Reschedules` DROP FOREIGN KEY `Reschedules_subID_fkey`;

-- DropForeignKey
ALTER TABLE `Uhg` DROP FOREIGN KEY `Uhg_groupID_fkey`;

-- DropForeignKey
ALTER TABLE `Uhg` DROP FOREIGN KEY `Uhg_userID_fkey`;

-- DropForeignKey
ALTER TABLE `UserZusage` DROP FOREIGN KEY `UserZusage_meetingID_fkey`;

-- DropForeignKey
ALTER TABLE `UserZusage` DROP FOREIGN KEY `UserZusage_userID_fkey`;

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Meeting` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `groupID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Reschedules` DROP PRIMARY KEY,
    MODIFY `mainID` VARCHAR(191) NOT NULL,
    MODIFY `subID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`mainID`, `subID`);

-- AlterTable
ALTER TABLE `Uhg` DROP PRIMARY KEY,
    MODIFY `userID` VARCHAR(191) NOT NULL,
    MODIFY `groupID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userID`, `groupID`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserZusage` DROP PRIMARY KEY,
    MODIFY `userID` VARCHAR(191) NOT NULL,
    MODIFY `meetingID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userID`, `meetingID`);

-- AddForeignKey
ALTER TABLE `Uhg` ADD CONSTRAINT `Uhg_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Uhg` ADD CONSTRAINT `Uhg_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserZusage` ADD CONSTRAINT `UserZusage_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserZusage` ADD CONSTRAINT `UserZusage_meetingID_fkey` FOREIGN KEY (`meetingID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meeting` ADD CONSTRAINT `Meeting_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reschedules` ADD CONSTRAINT `Reschedules_mainID_fkey` FOREIGN KEY (`mainID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reschedules` ADD CONSTRAINT `Reschedules_subID_fkey` FOREIGN KEY (`subID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
