const appointmentController = {};
const { Appointment, User, Patient } = require('../models');

appointmentController.createAppointment = async (req, res) => {
    try {
        const patient = await Patient.findOne({where:{id_users: req.user_id}})
        const { date, time, id_doctors } = req.body;
        const newAppointment = await Appointment.create(
            {
                date: date,
                time: time,
                id_doctors: id_doctors,
                id_patients: patient.id
            }
        )
        return res.json(
            {
                success: true,
                message: "Appointment created",
                data: newAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "something went wrong",
                error: error.message
            }
        );
    }
}
// Delete appointment
appointmentController.deleteAppointment = async (req, res) => {
    try {
        const patient = await Patient.findOne({where:{id_users: req.user_id}})
        const appointmentId = req.params.id;
        const deleteAppointment = await Appointment.destroy({ where: { id: appointmentId, id_patients: patient.id } })
        return res.json(
            {
                success: true,
                message: "Appointment deleted",
                data: deleteAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "something went wrong",
                error: error.message
            }
        );
    }
}
// Update appointment
appointmentController.updateAppointment = async (req, res) => {
    try {
        const patient = await Patient.findOne({where:{id_users: req.user_id}})
        const appointmentId = req.params.id;
        const date = req.body.date;
        const time = req.body.time;
        const updateAppointment = await Appointment.update({ date: date, time: time, }, { where: { id: appointmentId, id_patients: patient.id } })
        return res.json(
            {
                success: true,
                message: "Appointment updated",
                data: updateAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "something went wrong",
                error: error.message
            }
        );
    }
};
// Appointment controller for Patient
appointmentController.getAppointment = async (req, res) => {
    try {
        const patient = await Patient.findOne({where: {id_user: req.user_id}})
        const appointment = await Appointment.findAll({where: {id_patients: patient.id}, attributes:{exclude: ["createdAt", "updtedAt"]}},)
        return sendSuccsessResponse(res, 200, [
{message: "Your appointment"},
appointment
        ]);
    } catch (error) {
        return sendErrorResponse(res, 500, "we couldn't find any appointment", error);
    }
};
// Appointment controller for Doctor
appointmentController.getDoctorAppointment = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({where: {id_user: req.user_id}})
        const appointment = await Appointment.findAll({where: {id_doctors: doctor.id}, attributes:{exclude: ["createdAt", "updtedAt"]}},)
        return sendSuccsessResponse(res, 200, [
{message: "Your appointment"},
appointment
        ]);
    } catch (error) {
        return sendErrorResponse(res, 500, "we couldn't find any appointment", error);
    }
};
module.exports = appointmentController;