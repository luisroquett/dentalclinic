const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPatient = require("../middlewares/isPatient");

/* GET users listing */

// Create appointment
router.post(
  "/createappointment",
  verifyToken, isPatient,
  appointmentController.createAppointment
);
// Delete appointment
router.delete(
  "/deleteappointment/:id",
  verifyToken, isPatient,
  appointmentController.deleteAppointment
);
// Modify appointment
router.put(
  "/updateappointment/:id",
  verifyToken, isPatient,
  appointmentController.updateAppointment
);
// See appointment as Patient
router.get("/appointment", verifyToken, appointmentController.getAppointment);
// See appointment as Doctor
router.get("/appointment/doctor", verifyToken, appointmentController.getDoctorAppointment);

module.exports = router;