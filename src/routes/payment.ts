import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Axios from "axios";
import {zohoMiddleware} from "../helpers/zoho";
import {changeToddmmyyyy} from "../helpers/index";
const router = express.Router();

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create", async (req, res) => {
  try {
    let data = await instance.orders.create({
      amount: req.body.amount,
      currency: req.body.currency,
      payment_capture: 1,
    });
    res.status(200).send({msg: "success", data});
  } catch (e) {
    res.status(400).send({msg: "failure"});
  }
});

router.post("/verify", zohoMiddleware, async (req, res) => {
  let data = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  // expected signature
  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(data.toString())
    .digest("hex");
  if (expectedSignature === req.body.razorpay_signature) {
    let dob = req.body.dob ? changeToddmmyyyy(req.body.dob) : "01-01-1975";
    let d = new Date();
    const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
    const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
    const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
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
    try {
      console.log("Trying to add daa");
      let d = await Axios({
        method: "POST",
        url: process.env.BASE_URL! + "Donation",
        data: {data: reqData},
        headers: {
          Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
        },
      });
      if (d.data.code !== 3000)
        console.log(d);
    } catch (e) {
      console.log(e);
    }

    res.status(200).send({msg: "success"});
  }
});

export default router;
