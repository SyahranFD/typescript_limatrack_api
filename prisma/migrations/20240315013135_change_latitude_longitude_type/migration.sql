/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `latitude` on table `zona_terlarangs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `zona_terlarangs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pedagangs` MODIFY `image` VARCHAR(2000) NULL,
    MODIFY `latitude` VARCHAR(100) NULL,
    MODIFY `longitude` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `latitude` VARCHAR(100) NULL,
    MODIFY `longitude` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `zona_terlarangs` MODIFY `latitude` VARCHAR(100) NOT NULL,
    MODIFY `longitude` VARCHAR(100) NOT NULL;
