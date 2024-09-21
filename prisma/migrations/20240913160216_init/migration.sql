/*
  Warnings:

  - You are about to drop the column `theme` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `theme`,
    DROP COLUMN `twitter`;
