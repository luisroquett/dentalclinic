'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
        "doctors",
        [
           {
              id_users: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
           },
        ],
     );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("doctors", {
      //  [Op.or]: [
      //     { id_users: 2 },
      //  ],
    });
 },
};
