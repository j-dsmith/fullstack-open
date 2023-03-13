const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const { createTestUser, tokenFromTestUser, initialBlogs, getTestUser } = require("./test_helpers");

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await createTestUser();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set({ Authorization: await tokenFromTestUser() })
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("blogs returned with id field", async () => {
  const { body } = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });

  for (blog of body) {
    expect(blog.id).toBeDefined();
  }
});

test("blog post is stored in the database successfully", async () => {
  const blog = {
    title: "test blog",
    url: "https:/www.example.com/",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: await tokenFromTestUser() })
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  const contents = response.body.map((b) => b.title);

  expect(contents).toContain(blog.title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test("blogs added without a likes field will have likes stored as 0", async () => {
  const blog = {
    title: "test no likes",
    author: "Michael Chan",
    url: "https://example.com/",
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: await tokenFromTestUser() })
    .send(blog)
    .expect(201);
  const response = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  const match = response.body.find((b) => b.title === blog.title);
  expect(match.likes).toBe(0);
});

test("blogs added without a title or url will throw an error", async () => {
  const noTitle = {
    author: "Michael Chan",
    url: "https://example.com/",
  };

  const noUrl = {
    title: "test no likes",
    author: "Michael Chan",
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: await tokenFromTestUser() })
    .send(noTitle)
    .expect(400);
  await api
    .post("/api/blogs")
    .set({ Authorization: await tokenFromTestUser() })
    .send(noUrl)
    .expect(400);
});

test("individual blogs can be deleted", async () => {
  const res = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  const idToDelete = res.body[0].id;

  expect(idToDelete).toBeDefined();
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .set({ Authorization: await tokenFromTestUser() })
    .expect(204);
});

test("individual blogs can be updated", async () => {
  const res = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  const idToUpdate = res.body[0].id;
  expect(idToUpdate).toBeDefined();
  await api
    .put(`/api/blogs/${idToUpdate}`)
    .set({ Authorization: await tokenFromTestUser() })
    .send({ likes: 100 })
    .expect(200);
  // // const res = await api.get("/api/blogs").set({ Authorization: await tokenFromTestUser() });
  // const user = await getTestUser();
  // const blogToUpdate = user.blogs[0];
  // expect(blogToUpdate).toBeDefined();
  // const updatedBlog = { likes: 100 };

  // const returnedBlog = await api
  //   .put(`/api/blogs/${blog.id}`)
  //   .set({ Authorization: await tokenFromTestUser() })
  //   .send(updatedBlog)
  //   .expect(200);
  // expect(returnedBlog.body.likes).toBe(100);
  // console.log(returnedBlog);
});

afterAll(async () => {
  await mongoose.connection.close();
});
