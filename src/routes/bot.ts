import Axios from "axios";
import express from "express";
import { zohoMiddleware } from "../helpers/zoho";

const router = express.Router();

// TODO: no bots
router.post("/camp", zohoMiddleware, async (req, res) => {
  let reqData = {
    data: req.body,
  };
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Camp_Request_Bot",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${(req.session as any).zoho}`,
      },
    });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});

export default router;
