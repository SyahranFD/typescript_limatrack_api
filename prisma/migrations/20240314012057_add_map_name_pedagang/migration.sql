/*
  Warnings:

  - You are about to drop the `pedagang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pedagang`;

-- CreateTable
CREATE TABLE `pedagangs` (
    `id` VARCHAR(100) NOT NULL,
    `nama_warung` VARCHAR(100) NOT NULL,
    `nama_pedagang` VARCHAR(100) NOT NULL,
    `image` VARCHAR(2000) NOT NULL,
    `status` BOOLEAN NULL,
    `jam_buka` VARCHAR(100) NOT NULL,
    `jam_tutup` VARCHAR(100) NOT NULL,
    `daerah_dagang` VARCHAR(100) NOT NULL,
    `rating` DECIMAL NOT NULL,
    `latitude` DECIMAL(32, 16) NULL,
    `longitude` DECIMAL(32, 16) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
