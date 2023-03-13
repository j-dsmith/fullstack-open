const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://blog.codinghorror.com/goto-statement-considered-harmful/",
    likes: 5,
  },
];

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  const savedUser = await user.save();
  await populateBlogsForTestUser(savedUser.id);
};

const populateBlogsForTestUser = async (id) => {
  const blogsWithAuthor = initialBlogs.map((blog) => ({ ...blog, user: id }));
  const blogs = await Blog.insertMany(blogsWithAuthor);
  await User.findByIdAndUpdate(id, { blogs: blogs.map((b) => b.id) });
};

const getTestUser = async () => {
  const user = await User.findOne({ username: "root" });
  return user;
};

const tokenFromTestUser = async () => {
  const user = await getTestUser();
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  return `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`;
};

module.exports = { createTestUser, tokenFromTestUser, getTestUser, initialBlogs };
