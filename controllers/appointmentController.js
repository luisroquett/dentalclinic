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
                id_patient: req.patientId
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
}



module.exports = appointmentController;