'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Doctor, {
        foreignKey: "id_doctor",
      });
      Appointment.belongsTo(models.Patient, {
        foreignKey: "id_patient",
      });
    }
  }
  Appointment.init({
    id_patients: DataTypes.INTEGER,
    id_doctors: DataTypes.INTEGER,
    time:{
      type: DataTypes.TIME,
    }, 
    date:{
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      }
     
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments'
  });
  return Appointment;
};