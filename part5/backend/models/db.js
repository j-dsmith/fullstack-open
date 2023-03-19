const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose.set("strictQuery", false);
  console.log("connecting to MongoDB");

  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((err) => {
      console.error("error connecting to MongoDB: ", err.message);
    });
};

module.exports = { connect };
