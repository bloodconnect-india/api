import crypto from 'crypto';
import express from 'express';
import Razorpay from 'razorpay';
import { changeToddmmyyyy } from '../helpers/index';
import { Sheet } from '../helpers/sheets';
const router = express.Router();

var instance = new Razorpay({
  key_id: process.env.razorpay_key!,
  key_secret: process.env.razorpay_secret
});

router.post('/create', async (req, res) => {
  try {
    let data = await instance.orders.create({
      amount: req.body.amount,
      currency: req.body.currency,
      payment_capture: true
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send({ msg: 'success', data });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: 'failure' });
  }
});

router.post('/verify', async (req, res) => {
  let data = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;

  // expected signature
  var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!).update(data.toString()).digest('hex');
  if (expectedSignature === req.body.razorpay_signature) {
    let dob = req.body.dob ? changeToddmmyyyy(req.body.dob) : '01-01-1975';
    let d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let today = `${da}-${mo}-${ye}`;
    const sheet = new Sheet(process.env.donation_sheet || '');
    const row = {
      'Name': req.body.name,
      'Email': req.body.email,
      'Phone': req.body.contact,
      'Amount': req.body.amount,
      'Pan Card': req.body.panCard,
      'DOB': dob,
      'Payment Id': req.body.razorpay_payment_id,
      'Date': today,
      'Source': req.body.source
    };
    console.log('adding row', row);
    const ok = await sheet.addRow(row);
    if (ok) {
      res.status(200).send({ msg: 'success' });
    } else {
      res.status(400).send({ msg: 'failure' });
    }
  }
});

export default router;
