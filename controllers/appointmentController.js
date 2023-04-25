const appointmentController = {};
const { Appointment } = require('../models');



appointmentController.createAppointment = async (req, res) => {
    try {
        const { date, hour, id_doctor } = req.body;
        const newAppointment = await Appointment.create(
            {
                date: date,
                hour: hour,
                id_doctor: id_doctor,
                id_patient: patientId
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
        const appointmentId = req.params.id;
        const deleteAppointment = await Appointment.destroy({ where: { id: appointmentId, id_patient: req.patientId } })

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
        const appointmentId = req.params.id;
        const date = req.body.date;
        const hour = req.body.hour;
        const updateAppointment = await Appointment.update({ date: date, hour: hour, }, { where: { id: appointmentId, id_patient: req.patientId } })

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