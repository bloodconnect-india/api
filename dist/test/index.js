"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../index"));
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('Demo', () => {
    describe("/Get ", () => {
        it("it should work", (done) => {
            chai_1.default.request(index_1.default)
                .get('/')
                .end((_, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("msg").eql("success");
                done();
            });
        });
    });
});
//# sourceMappingURL=index.js.map