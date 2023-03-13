const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    if (error.errors.username) {
      res.status(400).json({ error: "username taken" });
    }
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler;
