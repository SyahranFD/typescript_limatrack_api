/*
  Warnings:

  - You are about to alter the column `expired_at` on the `iklans` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `pedagangs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `pedagangs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `pedagangs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `pedagangs_nama_warung_key` ON `pedagangs`;

-- AlterTable
ALTER TABLE `iklans` MODIFY `expired_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pedagangs` ADD COLUMN `email` VARCHAR(320) NOT NULL,
    ADD COLUMN `password` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pedagangs_email_key` ON `pedagangs`(`email`);
