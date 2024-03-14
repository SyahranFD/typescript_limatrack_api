-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(100) NOT NULL,
    `nama_lengkap` VARCHAR(100) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `token` VARCHAR(100) NULL,
    `verified_email` BOOLEAN NULL,
    `latitude` DECIMAL(32, 16) NULL,
    `longitude` DECIMAL(32, 16) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
