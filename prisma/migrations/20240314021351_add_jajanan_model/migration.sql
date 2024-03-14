/*
  Warnings:

  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `jajanans` (
    `id` VARCHAR(100) NOT NULL,
    `pedagang_id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,
    `image` VARCHAR(2000) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jajanans` ADD CONSTRAINT `jajanans_pedagang_id_fkey` FOREIGN KEY (`pedagang_id`) REFERENCES `pedagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
