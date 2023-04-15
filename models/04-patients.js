'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patients.belongsTo(models.Users, {
        foreignKey: "id_roles",
      });
      Patients.hasMany(models.Appointments, {
        foreignKey: "id_users",
      });
    }
  }
  Patients.init({
    id_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patiens'
  });
  return Patients;
};