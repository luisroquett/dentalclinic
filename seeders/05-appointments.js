'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
        "appointments",
        [
           {
              id_patients: 1,
              id_doctors: 1,
              date: "2023-06-06",
              time:"16:40",
              createdAt: new Date(),
              updatedAt: new Date(),
           },
           {
              id_patients: 2,
              id_doctors: 1,
              date: "2023-04-10",
              time:"18:00",
              createdAt: new Date(),
              updatedAt: new Date(),
           },
           {
              id_patients: 1,
              id_doctors: 1,
              date: "2023-03-22",
              time:"17:15",
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