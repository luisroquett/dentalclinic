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
      User.belongsTo(models.Role, { //this ForeignKey belongs to User
        foreignKey: "id_roles",
      });

      User.hasOne(models.Doctor, {
        foreignKey: "id_users",   // this ForeignKey belongs to Doctor
      });

      User.hasOne(models.Patient, {
        foreignKey: "id_users",  // this ForeignKey belongs to Patient
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
        allowNull: false,
        unique:true,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
      },
      id_roles: { type: DataTypes.INTEGER },
      telefono: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },

      
      
      password: { type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8
        }, },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};