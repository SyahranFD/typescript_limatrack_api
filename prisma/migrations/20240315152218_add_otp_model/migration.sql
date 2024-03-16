/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `otps` (
    `id` VARCHAR(100) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `otp` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `otps_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
