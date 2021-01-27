import express from "express";
import Redis from "ioredis";
import { cityMiddleware, zohoMiddleware } from "../helpers/zoho";
import Axios from "axios";
import { changeToddmmyyyy, convertArrayToList } from "../helpers";
import { CITYSTAT, MONTHSTAT } from "src/types";

const router = express.Router();
const redis = new Redis(process.env.REDIS_URL);

router.get("/", (_, res) => {
  res.status(200).send({ msg: "success" });
});

// helpline request
router.post("/helpline", zohoMiddleware, cityMiddleware, async (req, res) => {
  // if  we dont have the access token ( not really needed )
  if (!req.session!.zoho) res.status(404).send({ msg: "failure" });

  // sending request to helpline form
  try {
    req.body.City_Region = req.res?.locals.cityID; //string  -> ID
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Helpline",
      data: { data: req.body },
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });

    res.status(200).send({ msg: "success" });
  } catch (e) {
    // send mail
    res.status(500).send({ msg: "failure" });
  }
});

// register as donor request
router.post("/add-donor", zohoMiddleware, cityMiddleware, async (req, res) => {
  req.body.City_Donor = req.res?.locals.cityID; //string  -> ID
  let reqData = {
    data: {
      Name: req.body.Name,
      City_Donor: req.body.City_Donor,
      Email: req.body.Email,
      Phone_Number: "+91" + req.body.Phone_Number,
      Blood_Group: req.body.Blood_Group,
      Date_of_Birth: changeToddmmyyyy(req.body.Date_of_Birth),
      Source: "Website",
    },
  };
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Donor_DB",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});

//recruitment form
router.post("/recruitment", zohoMiddleware, async (req, res) => {
  // here city is not a vlookup !!!
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
      Why_BC1: convertArrayToList(req.body.Why_BC),
      Interested_In: convertArrayToList(req.body.Interested_In),
      Personal_Contact: req.body.Personal_Contact,
      How_BC: req.body.How_BC,
      Status: "On Going",
    },
  };
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Recruitment",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});

// camp request
router.post("/camp-request", zohoMiddleware, async (req, res) => {
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
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Camp_Request_Website",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});

// contact form
router.post("/contact", zohoMiddleware, async (req, res) => {
  if (!req.session!.zoho) res.status(500).send({ msg: "failure" });
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Contact_Us_Website",
      data: { data:req.body  },
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    console.log("error", e);
    res.send(500).send({ msg: "failure" });
  }
});

router.get("/set-helpline-stat", async (req, res) => {
  // getting the request data
  let data = req.query;

  const currYear = new Date().getFullYear();

  // the format of data that need to be pushed
  let finalData: CITYSTAT = {
    city: data.city as string,
    open: parseInt(data.open as string),
    closed: parseInt(data.closed as string),
    total: parseInt(data.total as string),
    detail: {},
  };

  // if the data sent is not complete
  if (!data || !data.city || !data.data) {
    res.status(400).send({ msg: "failure" });
  }

  // getting the detail data for eash month
  const helplineData = JSON.parse(data.data as string);
  // setting data in right format
  for (var i = 2020; i <= currYear; i++) {
    // getting a single years data
    let yearTemp = helplineData[i];
    let monthArray: MONTHSTAT[] = Array<MONTHSTAT>(12).fill({
      donations: 0,
      helpline: 0,
    });
    // adding to respective indexes
    for (var j = 1; j <= 12; j++) {
      if (yearTemp[j]) {
        monthArray[j - 1] = yearTemp[j];
      }
    }
    let tempData: Record<any, any> = {};
    tempData[i] = monthArray;
    // pushing current years data
    finalData.detail![i] = monthArray ;
  }

  let allHelplineData = await redis.get("helplines");
  if (!allHelplineData) {
    let tempData: Record<string, any> = {};
    tempData[data.city as string] = finalData;
    await redis.set("helplines", JSON.stringify(tempData));
  } else {
    let tempData = JSON.parse(allHelplineData);
    tempData[data.city as string] = finalData;
    await redis.set("helplines", JSON.stringify(tempData));
  }

  res.status(200).send({ msg : "success"});
});


router.get('/get-helplines' , async (_,res) => {
  let data = await redis.get("helplines")
  if(!data)
    res.status(500).send({msg:"some problem"})
  res.status(200).send({ data : JSON.parse(data!) })

})

export default router;
