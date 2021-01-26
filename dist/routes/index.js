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
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const zoho_1 = require("../helpers/zoho");
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
const redis = new ioredis_1.default(process.env.REDIS_URL);
router.get("/", (_, res) => {
    res.status(200).send({ msg: "success" });
});
router.post("/helpline", zoho_1.zohoMiddleware, zoho_1.cityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.session.zoho)
        res.status(404).send({ msg: "failure" });
    try {
        req.body.City_Region = (_a = req.res) === null || _a === void 0 ? void 0 : _a.locals.cityID;
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Helpline",
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: "success" });
    }
    catch (e) {
        res.status(500).send({ msg: "failure" });
    }
}));
router.post("/add-donor", zoho_1.zohoMiddleware, zoho_1.cityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    req.body.City_Donor = (_b = req.res) === null || _b === void 0 ? void 0 : _b.locals.cityID;
    let reqData = {
        data: {
            Name: req.body.Name,
            City_Donor: req.body.City_Donor,
            Email: req.body.Email,
            Phone_Number: "+91" + req.body.Phone_Number,
            Blood_Group: req.body.Blood_Group,
            Date_of_Birth: helpers_1.changeToddmmyyyy(req.body.Date_of_Birth),
            Source: "Website",
        },
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Donor_DB",
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
router.post("/recruitment", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Name: req.body.Name,
            City: req.body.City,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Additional: req.body.additional,
            Prior_Experience_Volunteering: req.body.Prior_Experience_Volunteering,
            Year_of_Graduation: req.body.Year_of_Graduation,
            Organization: req.body.Organization,
            Why_BC1: helpers_1.convertArrayToList(req.body.Why_BC),
            Interested_In: helpers_1.convertArrayToList(req.body.Interested_In),
            Personal_Contact: req.body.Personal_Contact,
            How_BC: req.body.How_BC,
            Status: "On Going",
        },
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Recruitment",
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
router.post("/camp-request", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Your_Name: req.body.Your_Name,
            City_Name: req.body.City_Region,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Additional_Message: req.body.Additional_Message,
            Number_of_Employee: req.body.Number_of_Employee,
            Organization_Name: req.body.Organization_Name,
            Status: "Open"
        },
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Camp_Request_Website",
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
router.post("/contact", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.zoho)
        res.status(500).send({ msg: "failure" });
    try {
        let { data } = yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Contact_Us_Website",
            data: { data: { data: req.body } },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        console.log(data);
        res.status(200).send({ msg: "success" });
    }
    catch (e) {
        console.log("error", e);
        res.send(500).send({ msg: "failure" });
    }
}));
router.get("/set-helpline-stat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.query;
    const currYear = new Date().getFullYear();
    let finalData = {
        city: data.city,
        open: parseInt(data.open),
        closed: parseInt(data.closed),
        total: parseInt(data.total),
        detail: {},
    };
    if (!data || !data.city || !data.data) {
        res.status(400).send({ msg: "failure" });
    }
    const helplineData = JSON.parse(data.data);
    for (var i = 2020; i <= currYear; i++) {
        let yearTemp = helplineData[i];
        let monthArray = Array(12).fill({
            donations: 0,
            helpline: 0,
        });
        for (var j = 1; j <= 12; j++) {
            if (yearTemp[j]) {
                monthArray[j - 1] = yearTemp[j];
            }
        }
        let tempData = {};
        tempData[i] = monthArray;
        finalData.detail[i] = monthArray;
    }
    let allHelplineData = yield redis.get("helplines");
    if (!allHelplineData) {
        let tempData = {};
        tempData[data.city] = finalData;
        yield redis.set("helplines", JSON.stringify(tempData));
    }
    else {
        let tempData = JSON.parse(allHelplineData);
        tempData[data.city] = finalData;
        yield redis.set("helplines", JSON.stringify(tempData));
    }
    res.status(200).send({ msg: "success" });
}));
router.get('/get-helplines', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield redis.get("helplines");
    if (!data)
        res.status(500).send({ msg: "some problem" });
    res.status(200).send({ data: JSON.parse(data) });
}));
exports.default = router;
//# sourceMappingURL=index.js.map