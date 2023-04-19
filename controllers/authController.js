const authController = {};
const { User, Patient } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../_util/token");
const { hash, compareHash } = require("../_util/hash");
const{sendSuccsessResponse,sendErrorResponse} = require("../_util/sendResponse")

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
      role_id: 1,
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

authController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "email and password requiered");
  }
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.send("Wrong Credentials");
    }

    const isValidPasswrod = compareHash(password, user.password)

    if(!isValidPasswrod){
        return sendErrorResponse(res, 401, "Wrong credentials")
    }

    //Token propio para autenticar el usuario
    const token = generateToken({
      id_user: user.id,
      id_roles: user.id_roles,
    });
    return sendSuccsessResponse(res, 200, token);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = authController;
