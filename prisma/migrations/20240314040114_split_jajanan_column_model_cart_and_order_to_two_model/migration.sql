/*
  Warnings:

  - You are about to drop the column `jajanan_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `carts` table. All the data in the column will be lost.
  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `jajanan_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `metode_pembayaran` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_jajanan_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_jajanan_id_fkey`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `jajanan_id`,
    DROP COLUMN `jumlah`,
    DROP COLUMN `total`;

-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `jajanan_id`,
    DROP COLUMN `jumlah`,
    DROP COLUMN `total`,
    ADD COLUMN `metode_pembayaran` VARCHAR(100) NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` DECIMAL NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `cart_jajanans` (
    `id` VARCHAR(100) NOT NULL,
    `cart_id` VARCHAR(100) NOT NULL,
    `jajanan_id` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_jajanans` (
    `id` VARCHAR(100) NOT NULL,
    `order_id` VARCHAR(100) NOT NULL,
    `jajanan_id` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_jajanans` ADD CONSTRAINT `cart_jajanans_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_jajanans` ADD CONSTRAINT `order_jajanans_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
