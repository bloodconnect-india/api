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
const helpers_1 = require("../helpers");
const sheets_1 = require("../helpers/sheets");
const zoho_1 = require("../helpers/zoho");
const redis_1 = require("../mocks/redis");
const email_1 = require("../helpers/email");
const contact_us_1 = require("../templates/contact-us");
const camp_1 = require("src/templates/camp");
const join_us_1 = require("src/templates/join-us");
const awareness_1 = require("src/templates/awareness");
const redis = new redis_1.MockRedis('');
const router = express_1.default.Router();
const ERAKTKOSH_URL_PREFIX = 'https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=';
const ERAKTKOSH_URL_SUFFIX = '&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971';
router.get('/', (_, res) => {
    res.status(200).send({ msg: 'success' });
});
router.post('/helpline', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.helpline_sheet || '');
    const row = {
        'Patient Name': req.body.patient_name,
        'Your Name': req.body.name,
        'Email': req.body.email,
        'Phone': req.body.contact,
        'Unit': req.body.units,
        'Blood Group': req.body.bg,
        'Requirement': req.body.requirement,
        'City': req.body.city
    };
    console.log('adding row', row);
    const ok = yield sheet.addRow(row);
    if (ok) {
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/add-donor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.donor_sheet || '');
    const row = {
        'Name': req.body.Name,
        'Email': req.body.Email,
        'Phone': '+91' + req.body.Phone_Number,
        'DOB': (0, helpers_1.changeToddmmyyyy)(req.body.Date_of_Birth),
        'BG': req.body.Blood_Group,
        'City': req.body.City_Donor
    };
    console.log('adding row', row);
    const ok = yield sheet.addRow(row);
    if (ok) {
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/recruitment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.recruitment_sheet || '');
    const row = {
        'Name': req.body.Name,
        'City': req.body.City,
        'Email': req.body.Email,
        'Phone': req.body.Phone_Number,
        'Prior Experience': req.body.Prior_Experience_Volunteering,
        'Graduation Year': req.body.Year_of_graduation,
        'Organization': req.body.Organization,
        'Why BloodConnect': req.body.Why_BC,
        'Interest': req.body.Interested_In,
        'Contact in BC': req.body.Personal_Contact,
        'How': req.body.How_BC,
        'Education': req.body.Education_Details
    };
    console.log('adding row', row);
    const ok = yield sheet.addRow(row);
    if (ok) {
        const data = (0, join_us_1.getJoinSubjectAndMsg)({
            additional: '',
            city: row.City,
            contact: row.Phone,
            education: row.Education,
            email: row.Email,
            experience: row['Prior Experience'],
            how: row.How,
            interest: row.Interest,
            name: row.Name,
            organization: row.Organization,
            poc: row['Contact in BC'],
            why: row['Why BloodConnect'],
            yog: row['Graduation Year']
        });
        yield (0, email_1.sendMail)(data.to, data.subject, data.body);
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/camp-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.camp_awareness_sheet || '');
    const row = {
        'Type': 'Camp',
        'Name': req.body.Your_Name,
        'Email': req.body.Email,
        'Phone': req.body.Phone_Number,
        'City': req.body.City_Region,
        'Organization Name': req.body.Organization_Name
    };
    const ok = yield sheet.addRow(row);
    if (ok) {
        const data = (0, camp_1.getCampSubjectAndMsg)({
            city: row.City,
            contact: row.Phone,
            email: row.Email,
            name: row.Name,
            organization: row['Organization Name']
        });
        yield (0, email_1.sendMail)(data.to, data.subject, data.body);
        const requestorData = (0, camp_1.getCampSubjectAndMsgRequestor)({
            city: row.City,
            contact: row.Phone,
            email: row.Email,
            name: row.Name,
            organization: row['Organization Name']
        });
        yield (0, email_1.sendMail)(requestorData.to, requestorData.subject, requestorData.body);
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/awareness-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.camp_awareness_sheet || '');
    const row = {
        'Type': 'Awareness',
        'Name': req.body.Your_Name,
        'Email': req.body.Email,
        'Phone': req.body.Phone_Number,
        'City': req.body.City_Name,
        'Organization Name': req.body.Organization_Name,
        'Mode': req.body.Mode
    };
    const ok = yield sheet.addRow(row);
    if (ok) {
        const data = (0, awareness_1.getAwarenessSubjectAndMsg)({
            city: row.City,
            contact: row.Phone,
            email: row.Email,
            name: row.Name,
            organization: row['Organization Name'],
            mode: row.Mode
        });
        yield (0, email_1.sendMail)(data.to, data.subject, data.body);
        const requestorData = (0, awareness_1.getAwarenessSubjectAndMsgRequestor)({
            city: row.City,
            contact: row.Phone,
            email: row.Email,
            name: row.Name,
            organization: row['Organization Name'],
            mode: row.Mode
        });
        yield (0, email_1.sendMail)(requestorData.to, requestorData.subject, requestorData.body);
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sheet = new sheets_1.Sheet(process.env.contact_sheet || '');
    const row = {
        'Name': req.body.Name,
        'Email': req.body.Email,
        'Message': req.body.Message,
        'Phone': req.body.Phone_Number,
        'City': req.body.City
    };
    const ok = yield sheet.addRow(row);
    if (ok) {
        const data = (0, contact_us_1.getContactSubjectAndMsg)({ name: row.Name, contact: row.Phone, email: row.Email, message: row.Message, city: row.City });
        yield (0, email_1.sendMail)(data.to, data.subject, data.body);
        res.status(200).send({ msg: 'success' });
    }
    else {
        res.status(400).send({ msg: 'failure' });
    }
}));
router.post('/blood-warrior', zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.zoho)
        res.status(500).send({ msg: 'failure' });
    console.log(req.body);
    try {
        const { data } = yield (0, axios_1.default)({
            method: 'POST',
            url: process.env.BASE_URL + 'Blood_Warriors',
            data: { data: req.body },
            headers: {
                Authorization: `Zoho-oauthtoken ${req.session.zoho}`
            }
        });
        res.header('Access-Control-Allow-Origin', 'https://www.bloodconnect.org');
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
        detail: {}
    };
    if (!data || !data.city || !data.data) {
        res.status(400).send({ msg: 'failure' });
    }
    const helplineData = JSON.parse(data.data);
    for (let i = 2020; i <= currYear; i++) {
        const yearTemp = helplineData[i];
        const monthArray = Array(12).fill({
            donations: 0,
            helpline: 0
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
    var _a;
    console.log('e rakht-kosh');
    const city_list = {
        '35': 'Andaman and Nicobar Islands',
        '28': 'Andhra Pradesh',
        '12': 'Arunachal Pradesh',
        '18': 'Assam',
        '10': 'Bihar',
        '94': 'Chandigarh',
        '22': 'Chattisgarh',
        '26': 'Dadra and Nagar Haveli',
        '25': 'Daman and Diu',
        '97': 'Delhi',
        '24': 'Gujarat',
        '30': 'Goa',
        '96': 'Haryana',
        '92': 'Himachal',
        '91': 'Jammu and Kashmir',
        '20': 'Jharkhand',
        '29': 'Karnataka',
        '32': 'Kerala',
        '37': 'Ladakh',
        '31': 'Lakshdweep',
        '23': 'Madhya Pradesh',
        '27': 'Maharashtra',
        '14': 'Manipur',
        '17': 'Meghalaya',
        '15': 'Mizoram',
        '13': 'Nagaland',
        '21': 'Odisha',
        '34': 'Puducherry',
        '93': 'Punjab',
        '98': 'Rajasthan',
        '11': 'Sikkim',
        '33': 'Tamil Nadu',
        '36': 'Telangana',
        '16': 'Tripura',
        '95': 'Uttarakhand',
        '99': 'Uttar Pradesh',
        '19': 'West Bengal'
    };
    let hasErrors = false;
    const cityCodes = Object.keys(city_list);
    let count = 0;
    for (let i = 0; i < cityCodes.length; i++) {
        count = 0;
        const cityUrl = ERAKTKOSH_URL_PREFIX + cityCodes[i] + ERAKTKOSH_URL_SUFFIX;
        try {
            const cityData = [];
            const { data } = yield axios_1.default.get(cityUrl);
            (_a = data.data) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
                const currEntry = (0, helpers_1.processRaktKoshEntry)(e, city_list[cityCodes[i]]);
                cityData.push(currEntry);
            });
            if (cityData.length > 199) {
                let start_idx = 0;
                let end_idx = 199;
                while (count < cityData.length) {
                    try {
                        const { data } = yield (0, axios_1.default)({
                            method: 'POST',
                            url: process.env.BASE_URL + 'eRaktKosh_Data',
                            data: { data: cityData.slice(start_idx, end_idx) },
                            headers: {
                                Authorization: `Zoho-oauthtoken ${req.session.zoho}`
                            },
                            validateStatus: function (_) {
                                return true;
                            }
                        });
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
                    start_idx += 199;
                    if (end_idx + 199 > cityData.length) {
                        end_idx = cityData.length;
                    }
                    else
                        end_idx += 199;
                    count += 199;
                }
            }
            else {
                try {
                    const { data } = yield (0, axios_1.default)({
                        method: 'POST',
                        url: process.env.BASE_URL + 'eRaktKosh_Data',
                        data: { data: cityData },
                        headers: {
                            Authorization: `Zoho-oauthtoken ${req.session.zoho}`
                        },
                        validateStatus: function (_) {
                            return true;
                        }
                    });
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
            }
        }
        catch (e) {
            console.log('failed to fetch ' + city_list[cityCodes[i]] + ' error ', e);
        }
    }
    if (hasErrors) {
        res.status(500).send({ msg: 'failure' });
    }
    else {
        res.status(200).send({ msg: 'success' });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map