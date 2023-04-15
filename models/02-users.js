"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.roles, {
        foreignKey: "id_roles",
      });

      Users.hasMany(models.Doctor, {
        foreignKey: "id_users",
      });

      Users.hasMany(models.Patients, {
        
        foreignKey: "id_users",
      });
    }
  }
  Users.init(
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
      phone: {
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
      tableName: "users"
    }
  );
  return Users;
};
