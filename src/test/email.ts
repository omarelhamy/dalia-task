import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://dalia-task.herokuapp.com");

describe("Emails", () => {
  it("GET /", () => {
    return request.get("/").then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  it("POST /", () => {
    let data = {
        email: `test-${Math.floor(Math.random() * 5555)}@gmail.com`
    };
    return request
      .post("/")
      .send(data)
      .then((res) => {
          console.log(res.body);
          expect(res.body).to.not.be.empty;
          expect(res.body.email).to.be.eq(data.email);
      });
  });
});
