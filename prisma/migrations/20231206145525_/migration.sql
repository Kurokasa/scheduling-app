-- DropForeignKey
ALTER TABLE `Meeting` DROP FOREIGN KEY `Meeting_groupID_fkey`;

-- AlterTable
ALTER TABLE `Meeting` MODIFY `groupID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Meeting` ADD CONSTRAINT `Meeting_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
