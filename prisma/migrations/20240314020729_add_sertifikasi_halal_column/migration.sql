/*
  Warnings:

  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `pedagangs` ADD COLUMN `sertifikasi_halal` BOOLEAN NULL,
    MODIFY `rating` DECIMAL NOT NULL;
