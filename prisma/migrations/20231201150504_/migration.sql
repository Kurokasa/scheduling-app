/*
  Warnings:

  - You are about to drop the column `schedules` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Group` DROP COLUMN `schedules`;

-- CreateTable
CREATE TABLE `Schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupID` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `repeate` VARCHAR(191) NOT NULL DEFAULT 'none',

    UNIQUE INDEX `Schedules_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
