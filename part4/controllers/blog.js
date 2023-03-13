const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const getAuthToken = require("../utils/getAuthToken");

blogRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1, id: 1 });
  res.json(blogs);
});

blogRouter.delete("/", async (req, res) => {
  await Blog.deleteMany({});
  res.status(204).end();
});

blogRouter.post("/", async (req, res, next) => {
  const { token, user, body } = req;

  if (!body.title || !body.url) {
    return res.status(400).end();
  }
  if (!token.id) {
    return res.status(401).send({ error: "token invalid" });
  }

  const blog = new Blog({ ...body, user: user.id });

  await user.save();

  const savedBlog = await blog.save();

  return res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (user.id !== blog.user.toString()) {
    return res.status(401).send({ error: "unauthorized request" });
  }
  await blog.delete();

  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const updates = req.body;
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (user.id !== blog.user.toString()) {
    console.log(blog.user, user.id);
    return res.status(401).send({ error: "unauthorized request" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });

  res.status(200).json(updatedBlog);
});

module.exports = blogRouter;
