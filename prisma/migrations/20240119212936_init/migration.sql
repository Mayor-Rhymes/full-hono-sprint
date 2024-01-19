-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tolerance` (
    `id` VARCHAR(191) NOT NULL,
    `Tolerance` INTEGER NOT NULL,
    `NigerianStocks` INTEGER NOT NULL,
    `ForeignStocks` INTEGER NOT NULL,
    `TechStocks` INTEGER NOT NULL,
    `EmergingStocks` INTEGER NOT NULL,
    `NigerianBonds` INTEGER NOT NULL,
    `ForeignBonds` INTEGER NOT NULL,
    `Commodities` INTEGER NOT NULL,
    `RealEstate` INTEGER NOT NULL,
    `TBills` INTEGER NOT NULL,
    `Alternative` INTEGER NOT NULL,

    UNIQUE INDEX `Tolerance_Tolerance_key`(`Tolerance`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
