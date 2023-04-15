'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
        "appointments",
        [
           {
              id_patient: 1,
              id_doctor: 2,
              date: 2023/06/06,
              time:16.40,
              createdAt: new Date(),
              updatedAt: new Date(),
           },
        ],
     );
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
