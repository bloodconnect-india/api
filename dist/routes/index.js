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
const redis_1 = require("../mocks/redis");
const helpers_1 = require("../helpers");
const zoho_1 = require("../helpers/zoho");
const devDeployment = process.env.DEPLOYMENT === 'local';
const router = express_1.default.Router();
const redis = devDeployment ? new redis_1.MockRedis('') : new ioredis_1.default(process.env.REDIS_URL);
const ERAKTKOSH_URL_PREFIX = 'https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=';
const ERAKTKOSH_URL_SUFFIX = '&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971';
router.get('/', (_, res) => {
    res.status(200).send({ msg: 'success' });
});
router.post('/helpline', zoho_1.zohoMiddleware, zoho_1.cityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.session.zoho)
        res.status(404).send({ msg: 'failure' });
    try {
        req.body.City_Region = (_a = req.res) === null || _a === void 0 ? void 0 : _a.locals.cityID;
        yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Helpline',
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        res.status(500).send({ msg: 'failure' });
    }
}));
router.post('/add-donor', zoho_1.zohoMiddleware, zoho_1.cityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    req.body.City_Donor = (_b = req.res) === null || _b === void 0 ? void 0 : _b.locals.cityID;
    const reqData = {
        data: {
            Name: req.body.Name,
            City_Donor: req.body.City_Donor,
            Email: req.body.Email,
            Phone_Number: '+91' + req.body.Phone_Number,
            Blood_Group: req.body.Blood_Group,
            Date_of_Birth: helpers_1.changeToddmmyyyy(req.body.Date_of_Birth),
            Source: 'Website',
        },
    };
    try {
        yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Donor_DB',
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/recruitment', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            Status: 'On Going',
        },
    };
    try {
        const { data } = yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Recruitment_Form',
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        if (data.code && data.code !== 3000)
            res.status(500).send({ msg: 'failure', err: 'Error with zoho request' });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/camp-request', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = {
        data: {
            Your_Name: req.body.Your_Name,
            City_Name: req.body.City_Region,
            Email: req.body.Email,
            Phone_Number: req.body.Phone_Number,
            Additional_Message: req.body.Additional_Message,
            Number_of_Employee: req.body.Number_of_Employee,
            Organization_Name: req.body.Organization_Name,
            Status: 'Open',
        },
    };
    try {
        yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Camp_Request_Website',
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/awareness-request', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = {
        data: req.body,
    };
    try {
        yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Awareness_Request_Website',
            data: reqData,
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/contact', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.zoho)
        res.status(500).send({ msg: 'failure' });
    try {
        yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Contact_Us_Website',
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        console.log('error', e);
        res.send(500).send({ msg: 'failure' });
    }
}));
router.post('/blood-warrior', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.zoho)
        res.status(500).send({ msg: 'failure' });
    console.log(req.body);
    try {
        const { data } = yield axios_1.default({
            method: 'POST',
            url: process.env.BASE_URL + 'Blood_Warriors',
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
            },
        });
        console.log(data);
        res.status(200).send({ msg: 'success' });
    }
    catch (e) {
        console.log('error', e);
        res.send(500).send({ msg: 'failure' });
    }
}));
router.get('/set-helpline-stat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(400).send({ msg: 'failure' });
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
    const allHelplineData = yield redis.get('helplines');
    if (!allHelplineData) {
        const tempData = {};
        tempData[data.city] = finalData;
        yield redis.set('helplines', JSON.stringify(tempData));
    }
    else {
        const tempData = JSON.parse(allHelplineData);
        tempData[data.city] = finalData;
        yield redis.set('helplines', JSON.stringify(tempData));
    }
    res.status(200).send({ msg: 'success' });
}));
router.get('/get-helplines', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redis.get('helplines');
    if (!data)
        res.status(500).send({ msg: 'some problem' });
    res.status(200).send({ data: JSON.parse(data) });
}));
router.get('/fetch-eraktkosh', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('e rakht kosh');
    const city_list = {
        '22': 'Chattisgarh',
    };
    let hasErrors = false;
    const cityCodes = Object.keys(city_list);
    let response = {};
    for (let i = 0; i < cityCodes.length; i++) {
        const cityUrl = ERAKTKOSH_URL_PREFIX + cityCodes[i] + ERAKTKOSH_URL_SUFFIX;
        try {
            const { data } = yield axios_1.default.get(cityUrl);
            const cityData = [];
            data.data.forEach((e) => {
                const currEntry = helpers_1.processRaktKoshEntry(e, city_list[cityCodes[i]]);
                cityData.push(currEntry);
            });
            try {
                const { status, data } = yield axios_1.default({
                    method: 'POST',
                    url: process.env.BASE_URL + 'eRaktKosh_Data',
                    data: { data: cityData },
                    headers: {
                        Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
                    },
                    validateStatus: function (_) {
                        return true;
                    },
                });
                console.log('status: ', status);
                if (data.result) {
                    data.result.forEach((r) => {
                        if (r.error) {
                            console.log('error:', r.error[0]);
                        }
                    });
                }
            }
            catch (e) {
                hasErrors = true;
                console.log('error: ' + e);
            }
            response[city_list[cityCodes[i]]] = cityData;
        }
        catch (e) {
            console.log('failed to fecth ' + city_list[cityCodes[i]] + 'error ', e);
        }
    }
    if (hasErrors) {
        res.status(500).send({ msg: 'failure', data: response });
    }
    else {
        res.status(200).send(response);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map