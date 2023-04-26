const { sendErrorResponse } = require("../_util/sendResponse");
const isDoctor = async (req, res, next) => {
  const { user_role } = req;


  if (user_role != 2) {
    return sendErrorResponse(res, 403, "Don't have permission");
  } else next();
};

module.exports = isDoctor;