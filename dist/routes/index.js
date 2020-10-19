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
const zoho_1 = require("../helpers/zoho");
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
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
exports.default = router;
//# sourceMappingURL=index.js.map