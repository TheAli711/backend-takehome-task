const supertest = require("supertest");
const app = require("../src/index");
const api = supertest(app);

describe("API Testing with Supertest", () => {
  let token = null;
  it("Get profile without token", () => {
    api.get("/api/v1/auth/profile").then((response) => {
      expect(response.status).to.equal(401);
    });
  });

  it("Should ogin", () => {
    api
      .post("/api/v1/auth/login")
      .send({ email: "ali7112001@gmail.com", password: "Admin@123" })
      .then((response) => {
        expect(response.status).to.equal(200);
        token = response.body.token;
      });
  });

  it("Get profile with token", () => {
    api
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).to.equal(200);
      });
  });
});
