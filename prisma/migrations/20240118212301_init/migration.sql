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
