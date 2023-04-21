const authController = {};
const { User, Patient } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../_util/token");

authController.register = async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    if (nombre === undefined || email === undefined || password === undefined) {
      return res.json({
        success: false,
        message: "You must fill all the fields",
      });
    }
    const newUser = await User.create({
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      telefono: telefono,
      password: encryptedPassword,
      role_id: 2,
    });
    const newPatient = await Patient.create({
      user_id: newUser.id,
    });

    return res.json({
      success: true,
      message: "User created succesfully",
      data: { newUser, newPatient },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

// register doctor

// authController.registerDoctor = async (req, res) => {
//   const { nombre, email, password, apellidos } = req.body;

//   if (password.length < 8) {
//     return sendErrorResponse(
//       res,
//       400,
//       "Password must be larger than 8 characters"
//     );
//   }

//   const encryptedPassword = hash(password);

//   const newUser = {
//     nombre,
//     apellidos,
//     email,
//     password: encryptedPassword,
//     id_rol: 2,
//   };

//   try {
//     let newDoctor = await Users.create(newUser);
//      await Doctors.create({ id_usuario: newDoctor.id });
//     sendSuccsessResponse(res, 201, "Doctor registered succsessfully");
//   } catch (error) {
//     sendErrorResponse(res, 500, "Error creating doctor", error);
//   }
// };


//login de user
authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.send("Wrong email");
    }

    console.log(user);
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.send("Wrong Credentials");
    }

    //Token propio para autenticar el usuario
    const token = jwt.sign(
      {
        userId: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        email: user.email,
        roleId: user.role_id,
      },
      "secret"
    );
    return res.json({
      success: true,
      message: "Token created",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = authController;