const { User } = require("../models/index");

async function authorizeUser(req, res, next) {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw { name: "customError", status: 404, message: "User not found" };
    } else {
      if (req.decoded.id === user.id) {
        next();
      } else {
        throw {
          name: "customError",
          status: 401,
          message: "Unauthorized account",
        };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authorizeUser };
