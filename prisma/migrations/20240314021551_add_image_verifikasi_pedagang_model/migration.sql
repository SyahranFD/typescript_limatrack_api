/*
  Warnings:

  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `image_verifikasi_pedagangs` (
    `id` VARCHAR(100) NOT NULL,
    `pedagang_id` VARCHAR(100) NOT NULL,
    `url` VARCHAR(2000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `image_verifikasi_pedagangs` ADD CONSTRAINT `image_verifikasi_pedagangs_pedagang_id_fkey` FOREIGN KEY (`pedagang_id`) REFERENCES `pedagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
