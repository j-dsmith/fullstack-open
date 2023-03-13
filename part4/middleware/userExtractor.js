const User = require("../models/user");

const userExtractor = async (req, res, next) => {
  const user = await User.findById(req.token.id);
  req.user = user;

  next();
};

module.exports = userExtractor;
