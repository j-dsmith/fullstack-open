const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    min: 3,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
