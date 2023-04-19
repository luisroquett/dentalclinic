const { User, Appointment, Patient } = require("../models");

const userController = {};

userController.getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId,
            {
                attributes: { exclude: ["password", "id_roles"] }
            }
        )
        return res.json(
            {
                success: true,
                message: "Here is the profile",
                data: user
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

userController.updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const email = req.body.email;
        const telefono = req.body.telefono;
        const updateProfile = await User.update({ nombre: nombre, apellidos: apellidos, email: email, telefono: telefono }, { where: { id: userId } })

        return res.json(
            {
                success: true,
                message: "Profile updated",
                data: updateProfile
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

userController.getAppointmentsByUser = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ where: { id_patient: req.patientId } });
        return res.json(
            {
                success: true,
                message: "Here are your appointments",
                data: appointments
            }
        )
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

userController.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll()
        return res.json(
            {
                success: true,
                message: "Here are all the appointments",
                data: appointments
            }
        )
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

userController.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll(
            {
                include: {
                    model: User,
                    attributes: { exclude: ["password", "id_roles"] }
                }
            }
        )
        return res.json(
            {
                success: true,
                message: "Here are all the patients",
                data: patients
            }
        )
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
userController.getAllDoctors = async (req, res) => {
    try {
        const patients = await Patient.findAll(
            {
                include: {
                    model: User,
                    attributes: { exclude: ["password", "id_roles"] }
                }
            }
        )
        return res.json(
            {
                success: true,
                message: "Here are all the doctors",
                data: patients
            }
        )
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


module.exports = userController;