/*
  Warnings:

  - You are about to drop the column `nama_jajanan` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `nama_warung` on the `carts` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `pedagangs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `created_at` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `carts` DROP COLUMN `nama_jajanan`,
    DROP COLUMN `nama_warung`;

-- AlterTable
ALTER TABLE `pedagangs` MODIFY `rating` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` DECIMAL NOT NULL,
    MODIFY `created_at` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_pedagang_id_fkey` FOREIGN KEY (`pedagang_id`) REFERENCES `pedagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
