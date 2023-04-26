const authController = {};
const { User, Patient, Doctor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../_util/token");
const {
    sendSuccsessResponse,
    sendErrorResponse,
  } = require("../_util/sendResponse");
  const { compareHash, hash } = require("../_util/hash");
// Register User
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
      id_roles: 1,
    });
    const newPatient = await Patient.create({
      id_users: newUser.id,
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
// register doctor (admi)
authController.registerDoctor = async (req, res) => {
  const { nombre, email, password, telefono, apellidos } = req.body;
  if (password.length < 8) {
    return sendErrorResponse(
      res,
      400,
      "Password must be larger than 8 characters"
    );
  }
  const encryptedPassword = hash(password);
  const newUser = {
    nombre: nombre,
    email: email,
    password: encryptedPassword,
    telefono: telefono,
    apellidos: apellidos,
    id_roles: 2,
    
  };
  try {
    let newDoctor = await User.create(newUser);
     await Doctor.create({ id_users: newDoctor.id });
    sendSuccsessResponse(res, 201, "Doctor registered succsessfully");
  } catch (error) {
    sendErrorResponse(res, 500, "Error creating doctor", error);
  }
};
//login de user
authController.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return sendErrorResponse(
          res,
          400,
          "All fields need to be filled up"
        );
      }
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.send("Wrong email");
    }
    const isValidPassword = compareHash(password, user.password);
    if (!isValidPassword) {
      return sendErrorResponse(res, 401, "Incorrect password");
    }
    // const isMatch = bcrypt.compareSync(password, user.password);
    // if (!isMatch) {
    //   return res.send("Wrong Credentials");
    // }
    //Token propio para autenticar el usuario
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         nombre: user.nombre,
//         apellidos: user.apellidos,
//         telefono: user.telefono,
//         email: user.email,
//         roleId: user.role_id,
//       },
//       "secret"
//     );
//     return res.json({
//       success: true,
//       message: "Token created",
//       data: token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "something went wrong",
//       error: error.message,
//     });
//   }
// };
const token = generateToken({
    user_id: user.id,
    role_name: user.id_roles,
  });
  let role;
  if (user.id_roles == 1) {
    role = "patient";
  } else if (user.id_roles == 2) {
    role = "doctor";
  } else if (user.id_roles == 3) {
    role = "admin";
  }
  sendSuccsessResponse(res, 200, {
    message: "starting user session",
    token: token,
    role: role,
  });
} catch (error) {
  sendErrorResponse(res, 500, "User session failed", error);
}
};
module.exports = authController;