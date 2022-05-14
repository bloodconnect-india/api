"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRedis = void 0;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
class MockRedis {
    constructor(url) {
        this.url = "";
        this.url = url;
    }
    get(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return sleep(2000).then((_) => this.url);
        });
    }
    set(_, __) {
        return __awaiter(this, void 0, void 0, function* () {
            return sleep(2000).then((_) => this.url);
        });
    }
}
exports.MockRedis = MockRedis;
//# sourceMappingURL=redis.js.map