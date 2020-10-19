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
exports.cityMiddleware = exports.zohoMiddleware = exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getToken = () => {
    return axios_1.default.post(process.env.REFRESH_URL);
};
exports.zohoMiddleware = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.zoho)
        next();
    else {
        let { data } = yield exports.getToken();
        req.session.zoho = data.access_token;
        next();
    }
});
exports.cityMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req.session) === null || _b === void 0 ? void 0 : _b.zoho))
        res.status(404).send({ msg: "failure" });
    req.body.City_Region = req.body.City_Region ? req.body.City_Region : req.body.City_Donor;
    let reqData = {
        data: {
            City: req.body.City_Region
        },
    };
    try {
        let { data } = yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "City_Vlookup",
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        if (data.code === 3002) {
            let { data: data1 } = yield axios_1.default({
                method: "GET",
                url: process.env.BASE_GET_URL +
                    'Vlookup_Report?criteria=(City=="' +
                    req.body.City_Region +
                    "\")",
                headers: {
                    Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
                },
            });
            console.log(data1);
            res.locals.cityID = data1.data[0].ID;
        }
        else {
            res.locals.cityID = data.result[0].data.ID;
        }
        next();
    }
    catch (e) {
        console.log(e);
        res.status(501).send({ msg: "failure", desc: "Error in city middleware" });
    }
});
//# sourceMappingURL=zoho.js.map