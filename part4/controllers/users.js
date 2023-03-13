const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { name, username, password } = req.body;

  if (password.length <= 3) {
    return res.status(400).json({ error: "password must be at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({ name, username, passwordHash });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
