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
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const zoho_1 = require("../helpers/zoho");
const index_1 = require("../helpers/index");
const router = express_1.default.Router();
var instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield instance.orders.create({
            amount: req.body.amount,
            currency: req.body.currency,
            payment_capture: 1,
        });
        res.status(200).send({ msg: "success", data });
    }
    catch (e) {
        res.status(400).send({ msg: "failure" });
    }
}));
router.post("/verify", zoho_1.zohoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(data.toString())
        .digest("hex");
    if (expectedSignature === req.body.razorpay_signature) {
        let dob = req.body.dob ? index_1.changeToddmmyyyy(req.body.dob) : "01-01-1975";
        let d = new Date();
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let today = `${da}-${mo}-${ye}`;
        let reqData = {
            Name: req.body.name,
            Email: req.body.email,
            Phone_Number: req.body.contact,
            Amount: req.body.amount,
            Pan_Card_Number: req.body.panCard,
            Date_of_Birth: dob,
            Payment_Id: req.body.razorpay_payment_id,
            Month_field: mo,
            Date_field: today,
            Source: req.body.source
        };
        console.log(reqData);
        try {
            console.log("Trying to add data");
            let d = yield axios_1.default({
                method: "POST",
                url: process.env.BASE_URL + "Donation",
                data: { data: reqData },
                headers: {
                    Authorization: `Zoho-oauthtoken ${req.session.zoho}`,
                },
            });
            if (d.data.code !== 3000)
                console.log(d);
        }
        catch (e) {
            console.log(e);
        }
        res.status(200).send({ msg: "success" });
    }
}));
exports.default = router;
//# sourceMappingURL=payment.js.map