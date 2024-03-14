/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Double`.
  - You are about to alter the column `latitude` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - You are about to alter the column `longitude` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Double`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `latitude` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - You are about to alter the column `longitude` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - You are about to alter the column `latitude` on the `zona_terlarangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - You are about to alter the column `longitude` on the `zona_terlarangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.

*/
-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DOUBLE NOT NULL,
    MODIFY `latitude` INTEGER NULL,
    MODIFY `longitude` INTEGER NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` DOUBLE NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `latitude` INTEGER NULL,
    MODIFY `longitude` INTEGER NULL;

-- AlterTable
ALTER TABLE `zona_terlarangs` MODIFY `latitude` INTEGER NULL,
    MODIFY `longitude` INTEGER NULL;
