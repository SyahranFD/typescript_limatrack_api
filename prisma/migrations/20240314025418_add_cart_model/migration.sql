/*
  Warnings:

  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` DECIMAL NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `pedagang_id` VARCHAR(100) NOT NULL,
    `jajanan_id` VARCHAR(100) NOT NULL,
    `nama_warung` VARCHAR(100) NOT NULL,
    `nama_jajanan` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_jajanan_id_fkey` FOREIGN KEY (`jajanan_id`) REFERENCES `jajanans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
