const getAuthToken = require("../utils/getAuthToken");
const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const token = getAuthToken(req);
  req.token = jwt.verify(token, process.env.SECRET);

  next();
};

module.exports = tokenExtractor;
