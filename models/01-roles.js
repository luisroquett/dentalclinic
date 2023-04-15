"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roles.hasMany(models.users, { 
        as: "Roles",
        foreingKey: "id_roles" });
    }
  }
  roles.init(
    {
      role_name:{type: DataTypes.STRING,
      validate:{
        isAlpha: true,
        
      }} 
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles"
    }
  );
  return roles;
};
