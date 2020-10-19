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
const zoho_1 = require("../helpers/zoho");
const router = express_1.default.Router();
router.post("/helpline", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Name: req.body.name,
            Email: req.body.email,
            Contact_Number: "+91" + req.body.phone,
            City: req.body.city,
            Helpline: req.body.ID,
            DOR: helpers_1.changeToddmmyyyy(req.body.dor),
            Experience: req.body.rate,
            Feedback: req.body.like,
            Contact_Time: req.body.firstCall,
            Improvement: req.body.differently,
            Help_Organize_Camp: req.body.willOrganizeCamp,
            Donate_Blood: req.body.willDonateBlood,
            Donate_Money: req.body.willSponsor,
            Additional: req.body.additional,
        }
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Helpline_Feedback_Form",
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
router.post("/camp", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Name: req.body.name,
            Email: req.body.email,
            Camp: req.body.ID,
            When_Again: req.body.whenAgain,
            Organization: req.body.organization,
            Rate: req.body.campRate,
            Differently: req.body.differently,
            Collab_Again: req.body.willCollab,
            Recommend: req.body.rate,
            Additional: req.body.additional,
        }
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Camp_Feedback_Form",
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
router.post("/donor", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Name: req.body.name,
            Location: req.body.location,
            Rate: req.body.rate,
            Briefed: req.body.briefed,
            Checkups: req.body.checkups,
            Refreshment: req.body.refreshment,
            BBRate: req.body.bbRate,
            Like: req.body.like,
            Differently: req.body.differently,
            Recommend: req.body.recommendDonation,
            HelpDonations: req.body.helpDonate,
            Feedback: req.body.feedback,
            Other_Checkup: req.body.checkups.includes("Other") ? req.body.other : "",
        },
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Donor_Feedback_Form",
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
router.post("/awareness", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = {
        data: {
            Name: req.body.name,
            Email: req.body.email,
            Contact_Number: req.body.contact,
            College_Company_Name: req.body.collegeName,
            Experience: req.body.experience,
            Interactive: req.body.interactive,
            Speaker: req.body.speaker,
            Learn_New: req.body.new,
            Donate_Blood: req.body.donateBlood,
            Additional: req.body.additional
        }
    };
    try {
        yield axios_1.default({
            method: "POST",
            url: process.env.BASE_URL + "Awareness_Feedback_Form",
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
//# sourceMappingURL=feedback.js.map