/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `otps` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `status` on the `pedagangs` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `otps` MODIFY `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pedagangs` DROP COLUMN `status`,
    ADD COLUMN `buka` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;
