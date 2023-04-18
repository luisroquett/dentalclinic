"use strict";
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        nombre: "Luis",
        apellidos: "Garganta",
        email: "lusi@email.com",
        id_roles: 1,
        telefono: 23232323,
        password: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Dani",
        apellidos: "Molar",
        email: "danim@email.com",
        id_roles: 1,
        telefono: 32323232,
        password: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Ana",
        apellidos: "Lengua",
        email: "lengua@email.com",
        id_roles: 2,
        telefono: 45454545,
        password: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Roberto",
        apellidos: "Mandibula",
        email: "mandia@email.com",
        id_roles: 3,
        telefono: 6767676,
        password: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
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