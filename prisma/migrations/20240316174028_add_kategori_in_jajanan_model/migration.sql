/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `kategori` to the `jajanans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `jajanans` ADD COLUMN `kategori` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `otps` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;
