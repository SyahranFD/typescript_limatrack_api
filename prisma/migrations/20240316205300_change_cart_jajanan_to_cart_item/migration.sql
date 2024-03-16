/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `cart_jajanans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_jajanans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_jajanans` DROP FOREIGN KEY `cart_jajanans_cart_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_jajanans` DROP FOREIGN KEY `order_jajanans_order_id_fkey`;

-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `otps` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;

-- DropTable
DROP TABLE `cart_jajanans`;

-- DropTable
DROP TABLE `order_jajanans`;

-- CreateTable
CREATE TABLE `Cart_Items` (
    `id` VARCHAR(100) NOT NULL,
    `cart_id` VARCHAR(100) NOT NULL,
    `jajanan_id` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Items` (
    `id` VARCHAR(100) NOT NULL,
    `order_id` VARCHAR(100) NOT NULL,
    `jajanan_id` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart_Items` ADD CONSTRAINT `Cart_Items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Items` ADD CONSTRAINT `Order_Items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
