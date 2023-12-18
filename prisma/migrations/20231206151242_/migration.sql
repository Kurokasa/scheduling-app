/*
  Warnings:

  - You are about to drop the `Uhg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserZusage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Uhg` DROP FOREIGN KEY `Uhg_groupID_fkey`;

-- DropForeignKey
ALTER TABLE `Uhg` DROP FOREIGN KEY `Uhg_userID_fkey`;

-- DropForeignKey
ALTER TABLE `UserZusage` DROP FOREIGN KEY `UserZusage_meetingID_fkey`;

-- DropForeignKey
ALTER TABLE `UserZusage` DROP FOREIGN KEY `UserZusage_userID_fkey`;

-- DropTable
DROP TABLE `Uhg`;

-- DropTable
DROP TABLE `UserZusage`;

-- CreateTable
CREATE TABLE `Users` (
    `userID` VARCHAR(191) NOT NULL,
    `groupID` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userID`, `groupID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Members` (
    `userID` VARCHAR(191) NOT NULL,
    `meetingID` VARCHAR(191) NOT NULL,
    `accepted` VARCHAR(191) NOT NULL DEFAULT 'waiting',

    PRIMARY KEY (`userID`, `meetingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_meetingID_fkey` FOREIGN KEY (`meetingID`) REFERENCES `Meeting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
