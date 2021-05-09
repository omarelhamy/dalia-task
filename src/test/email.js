"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require('supertest');
const request = supertest('https://dalia-task.herokuapp.com');
const chai_1 = require("chai");
describe("Emails", () => {
    it('GET /', () => {
        request.get("/").end((err, res) => {
            chai_1.expect(res.body.data).to.not.be.empty;
        });
    });
});
//# sourceMappingURL=email.js.map