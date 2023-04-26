const { User, Appointment, Patient, Doctor } = require("../models");

const userController = {};
const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { hash } = require("../_util/hash");

userController.getProfile = async (req, res) => {
  try {
    const userId = req.user_id;
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["id", "password", "id_roles", "createdAt", "updatedAt"],
      },
    });
    return sendSuccsessResponse(res, 200, user);
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retreiving user data", error);
  }
};
// Update Profile
userController.updateProfile = async (req, res) => {
  try {
    const userId = req.user_id;
    let newPassword;
    if (req.body.password){
      newPassword = hash(req.body.password);
      
    }
    
    const updateProfile = await User.update(
      {
        ...req.body,
        password: newPassword,
        id_roles: 1
      },
      { where: { id: userId } }
    );

    return res.json({
      success: true,
      message: "Profile updated",
      data: updateProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

userController.getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { id_patient: req.patientId },
    });
    return res.json({
      success: true,
      message: "Here are your appointments",
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
// Get All Appointments
userController.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    return res.json({
      success: true,
      message: "Here are all the appointments",
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
// Get all Patients
userController.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        attributes: { exclude: ["password", "id_roles"] },
      },
    });
    return res.json({
      success: true,
      message: "Here are all the patients",
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
// Get All Doctors
userController.getAllDoctors = async (req, res) => {
  try {
    const patients = await Doctor.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password", "id_roles"] },
      },
    });
    return res.json({
      success: true,
      message: "Here are all the doctors",
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = userController;