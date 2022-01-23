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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const zoho_1 = require("../helpers/zoho");
const router = express_1.default.Router();
router.post("/camp", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: req.body,
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Camp_Request_Bot",
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: "success" });
    }
    catch (e) {
        res.status(400).send({ msg: "failure" });
    }
}));
exports.default = router;
//# sourceMappingURL=bot.js.map