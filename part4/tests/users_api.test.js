const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { createTestUser, tokenFromTestUser } = require("./test_helpers");

const api = supertest(app);
const User = require("../models/user");

const initialUser = {
  username: "root",
  password: "password",
};

beforeEach(async () => {
  await User.deleteMany({});
  await createTestUser();
});

test("database returns initial user as json", async () => {
  const user = await api
    .get("/api/users")
    .set({ Authorization: await tokenFromTestUser() })
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(user.text[0]).toBeDefined();
});

test("new users must have a unique username", async () => {
  const user = {
    username: initialUser.username,
    password: "password2",
  };
  const res = await api
    .post("/api/users")
    .set({ Authorization: await tokenFromTestUser() })
    .send(user)
    .expect(400);
  const users = await api.get("/api/users").set({ Authorization: await tokenFromTestUser() });
  expect(users.body.length).toBe(1);
  expect(res.body.error).toBe("username taken");
});

test("new users must have a password of at least 3 characters", async () => {
  const user = {
    name: "test",
    username: "test",
    password: "12",
  };
  const res = await api
    .post("/api/users")
    .set({ Authorization: await tokenFromTestUser() })
    .send(user)
    .expect(400);
  const users = await api.get("/api/users").set({ Authorization: await tokenFromTestUser() });
  expect(users.body.length).toBe(1);
  expect(res.body.error).toBe("password must be at least 3 characters");
});

afterAll(async () => {
  await mongoose.connection.close();
});
