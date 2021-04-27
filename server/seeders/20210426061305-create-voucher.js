"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vouchers = [
      {
        voucher_name: "5000",
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        voucher_name: "10000",
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        voucher_name: "20000",
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        voucher_name: "50000",
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        voucher_name: "100000",
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Vouchers", vouchers, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Vouchers", null, {});
  },
};
