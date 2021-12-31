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
const ioredis_1 = __importDefault(require("ioredis"));
const helpers_1 = require("../helpers");
const zoho_1 = require("../helpers/zoho");
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
    const reqData = {
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
    const reqData = {
        data: {
            Name: req.body.Name,
            City: req.body.City,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Additional: req.body.additional,
            Prior_Experience_Volunteering: req.body.Prior_Experience_Volunteering,
            Year_of_Graduation: req.body.Year_of_Graduation,
            Organization: req.body.Organization,
            Why_BC1: req.body.Why_BC,
            Interested_In: req.body.Interested_In,
            Personal_Contact: req.body.Personal_Contact,
            How_BC: req.body.How_BC,
            Status: "On Going",
        },
    };
    try {
        const { data } = yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Recruitment_Form",
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        if (data.code && data.code !== 3000)
            res.status(500).send({ msg: "failure", err: "Error with zoho request" });
        res.status(200).send({ msg: "success" });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ msg: "failure" });
    }
}));
router.post("/camp-request", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = {
        data: {
            Your_Name: req.body.Your_Name,
            City_Name: req.body.City_Region,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Additional_Message: req.body.Additional_Message,
            Number_of_Employee: req.body.Number_of_Employee,
            Organization_Name: req.body.Organization_Name,
            Status: "Open",
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
router.post("/awareness-request", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = {
        data: req.body,
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Awareness_Request_Website",
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
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Contact_Us_Website",
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: "success" });
    }
    catch (e) {
        console.log("error", e);
        res.send(500).send({ msg: "failure" });
    }
}));
router.post("/blood-warrior", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.zoho)
        res.status(500).send({ msg: "failure" });
    console.log(req.body);
    try {
        const { data } = yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Blood_Warriors",
            data: { data: req.body },
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
    const data = req.query;
    const currYear = new Date().getFullYear();
    const finalData = {
        city: data.city,
        open: parseInt(data.open, 10),
        closed: parseInt(data.closed, 10),
        total: parseInt(data.total, 10),
        detail: {},
    };
    if (!data || !data.city || !data.data) {
        res.status(400).send({ msg: "failure" });
    }
    const helplineData = JSON.parse(data.data);
    for (let i = 2020; i <= currYear; i++) {
        const yearTemp = helplineData[i];
        const monthArray = Array(12).fill({
            donations: 0,
            helpline: 0,
        });
        for (let j = 1; j <= 12; j++) {
            if (yearTemp[j]) {
                monthArray[j - 1] = yearTemp[j];
            }
        }
        const tempData = {};
        tempData[i] = monthArray;
        finalData.detail[i] = monthArray;
    }
    const allHelplineData = yield redis.get("helplines");
    if (!allHelplineData) {
        const tempData = {};
        tempData[data.city] = finalData;
        yield redis.set("helplines", JSON.stringify(tempData));
    }
    else {
        const tempData = JSON.parse(allHelplineData);
        tempData[data.city] = finalData;
        yield redis.set("helplines", JSON.stringify(tempData));
    }
    res.status(200).send({ msg: "success" });
}));
router.get("/get-helplines", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redis.get("helplines");
    if (!data)
        res.status(500).send({ msg: "some problem" });
    res.status(200).send({ data: JSON.parse(data) });
}));
router.get("/fetch-eraktkosh", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city_list = {
        "35": "Andaman and Nicobar Islands",
        "28": "Andhra Pradesh",
        "12": "Arunachal Pradesh",
        "18": "Assam",
        "10": "Bihar",
        "94": "Chandigarh",
        "22": "Chattisgarh",
        "26": "Dadra and Nagar Haveli",
        "25": "Daman and Diu",
        "97": "Delhi",
        "24": "Gujarat",
        "30": "Goa",
        "96": "Haryana",
        "92": "Himachal",
        "91": "Jammu and Kashmir",
        "20": "Jharkhand",
        "29": "Karnataka",
        "32": "Kerala",
        "37": "Ladakh",
        "31": "Lakshdweep",
        "23": "Madhya Pradesh",
        "27": "Maharashtra",
        "14": "Manipur",
        "17": "Meghalaya",
        "15": "Mizoram",
        "13": "Nagaland",
        "21": "Odisha",
        "34": "Puducherry",
        "93": "Punjab",
        "98": "Rajasthan",
        "11": "Sikkim",
        "33": "Tamil Nadu",
        "36": "Telangana",
        "16": "Tripura",
        "95": "Uttarakhand",
        "99": "Uttar Pradesh",
        "19": "West Bengal",
    };
    let hasErrors = false;
    Object.keys(city_list).forEach((city_code) => __awaiter(void 0, void 0, void 0, function* () {
        const short_url = "https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=" +
            city_code +
            "&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971";
        const { data } = yield axios_1.default.get(short_url);
        const entries = data.data;
        entries.forEach((entry) => __awaiter(void 0, void 0, void 0, function* () {
            const details = entry[1].split("<br/>");
            const Blood_Bank_Name = details[0];
            const Address = details[1];
            var Phone = "-", Email = "-";
            if (details[2] != null) {
                var s1 = details[2].replace("Phone: ", "?");
                var s2 = s1.replace(",Fax: ", "?");
                var s3 = s2.replace("Email: ", "?");
                Phone = s3.split("?")[1];
                Email = s3.split("?")[3];
            }
            Phone = Phone.split(",")[0].substr(0, 10);
            var Availability = entry[3];
            if (Availability.includes("Not")) {
                Availability = "NA";
            }
            else {
                Availability = Availability.replace("<p class='text-success'>Available, ", " ");
                Availability = Availability.replace("</p>", " ");
            }
            var time_updated = entry[4];
            if (time_updated.includes("live")) {
                time_updated = "LIVE";
            }
            const today = new Date();
            let date = 0;
            if(today.getUTCDate() < 10){
                date = '0' + today.getUTCDate();
            }
            else date = today.getUTCDate();
            let month = 0;
            if(today.getUTCMonth() < 10){
                month = '0' + today.getUTCMonth();
            }
            else month = today.getUTCMonth();
            const reqData = {
                data: {
                    Blood_Bank_Name: Blood_Bank_Name,
                    Region: city_list[city_code],
                    Address: Address,
                    Email: Email,
                    Phone_Number: "+91" + Phone,
                    Availability: Availability,
                    Date_field: date +
                        "-" +
                        month +
                        "-" +
                        today.getUTCFullYear(),
                },
            };
            try {
                const { data } = yield axios_1.default({
                    method: "POST",
                    url: process.env.BASE_URL + "eRaktKosh_Data",
                    data: reqData,
                    headers: {
                        Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
                    },
                });
                console.log(data);
            }
            catch (e) {
                hasErrors = true;
                console.log("error: " + e);
            }
        }));
    }));
    if (hasErrors) {
        res.status(500).send({ msg: "failure" });
    }
    else {
        res.status(200).send({ msg: "success" });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map
