"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const request = supertest_1.default("https://dalia-task.herokuapp.com");
describe("Emails", () => {
    it("GET /", () => {
        return request.get("/").then((res) => {
            chai_1.expect(res.body).to.not.be.empty;
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
            chai_1.expect(res.body).to.not.be.empty;
            chai_1.expect(res.body.email).to.be.eq(data.email);
        });
    });
});
//# sourceMappingURL=email.js.map