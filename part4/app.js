const express = require("express");
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const errorHandler = require("./middleware/errorHandler");
const db = require("./models/db");
const loginRouter = require("./controllers/login");
const tokenExtractor = require("./middleware/tokenExtractor");
const userExtractor = require("./middleware/userExtractor");
const app = express();

db.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", userExtractor, blogRouter);
app.use(errorHandler);

module.exports = app;
