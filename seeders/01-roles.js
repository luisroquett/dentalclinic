'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "roles",
         [
            {
               role_name: "patient",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
              role_name: "doctor",
              createdAt: new Date(),
              updatedAt: new Date(),
           },
            {
              role_name: "admin",
              createdAt: new Date(),
              updatedAt: new Date(),
           },
         ],
      );
   },
   async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", {
      //  [Op.or]: [
      //     { role_name: "doctor" },
      //     { role_name: "patient" },
      //  ],
    });
 },
};