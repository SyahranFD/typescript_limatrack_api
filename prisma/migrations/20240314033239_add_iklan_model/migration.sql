/*
  Warnings:

  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` DECIMAL NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `iklans` (
    `id` VARCHAR(100) NOT NULL,
    `pedagang_id` VARCHAR(100) NOT NULL,
    `nominal_bayar` INTEGER NOT NULL,
    `expired_at` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `iklans` ADD CONSTRAINT `iklans_pedagang_id_fkey` FOREIGN KEY (`pedagang_id`) REFERENCES `pedagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
