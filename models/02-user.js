"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "id_roles",
      });

      User.hasOne(models.Doctor, {
        foreignKey: "id_users",
      });

      User.hasOne(models.Patient, {
        foreignKey: "id_users",
      });
    }
  }
  User.init(
    {
      nombre: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          min: 3,
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          min: 3,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
          isEmail: true,
        },
      },
      id_roles: { type: DataTypes.INTEGER },
      telefono: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
      password: { type: DataTypes.STRING, validate: { isAlphanumeric: true } },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};