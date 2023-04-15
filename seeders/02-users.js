"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "users",
         [
            {
               nombre: "Luis",
               apellidos: "Garganta",
               role_name: "doctor",
               email:"lusi@email.com",
               telefono: 23232323,
               id_user: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
              nombre: "Dani",
              apellidos: "Molar",
              role_name: "doctor",
              email:"molar@email.com",
              telefono: 24242424,
              id_user: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
           },
           {
            nombre: "Maria",
            apellidos: "Gula",
            role_name: "doctor",
            email:"gula@email.com",
            telefono: 25252525,
            id_user: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         ],
      );
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users", {
        //  [Op.or]: [
        //     { nombre: "Luis" },
        //     { nombre: "Dani" },
        //     { nombre: "Maria" },
        //  ],
      });
   },
};
