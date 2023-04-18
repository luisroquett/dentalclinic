'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User, {
        foreignKey: "id_roles",
      });
      Doctor.hasMany(models.Appointment, {
        foreignKey: "id_users",
      });
      
    }
  }
  Doctor.init({
    id_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors'
  });
  return Doctor;
};