'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
        "patients",
        [
           {
              id_users: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
           },
        ],
     );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patients", {
      //  [Op.or]: [
      //     { id_users: 1 },
      //  ],
    });
 },
};