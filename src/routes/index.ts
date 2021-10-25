import Axios from "axios";
import express from "express";
import Redis from "ioredis";
import { CITYSTAT, MONTHSTAT } from "../../src/types";
import { changeToddmmyyyy } from "../helpers";
import { cityMiddleware, zohoMiddleware } from "../helpers/zoho";

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
    req.body.City_Region = req.res?.locals.cityID; // string  -> ID
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
  req.body.City_Donor = req.res?.locals.cityID; // string  -> ID
  const reqData = {
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

// recruitment form
router.post("/recruitment", zohoMiddleware, async (req, res) => {
  // here city is not a vlookup !!!
  // console.log(req.body.Why_BC);
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
    const { data } = await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Recruitment_Form",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    if (data.code && data.code !== 3000)
      res.status(500).send({ msg: "failure", err: "Error with zoho request" });
    res.status(200).send({ msg: "success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "failure" });
  }
});

// camp request
router.post("/camp-request", zohoMiddleware, async (req, res) => {
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

// awareness request
router.post("/awareness-request", zohoMiddleware, async (req, res) => {
  const reqData = {
    data: req.body,
  };
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Awareness_Request_Website",
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
      data: { data: req.body },
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

// blood warrior
router.post("/blood-warrior", zohoMiddleware, async (req, res) => {
  if (!req.session!.zoho) res.status(500).send({ msg: "failure" });
  console.log(req.body);
  try {
    const { data } = await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Blood_Warriors",
      data: { data: req.body },
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    console.log(data);
    res.status(200).send({ msg: "success" });
  } catch (e) {
    console.log("error", e);
    res.send(500).send({ msg: "failure" });
  }
});

router.get("/set-helpline-stat", async (req, res) => {
  // getting the request data
  const data = req.query;

  const currYear = new Date().getFullYear();

  // the format of data that need to be pushed
  const finalData: CITYSTAT = {
    city: data.city as string,

    open: parseInt(data.open as string, 10),
    closed: parseInt(data.closed as string, 10),
    total: parseInt(data.total as string, 10),
    detail: {},
  };

  // if the data sent is not complete
  if (!data || !data.city || !data.data) {
    res.status(400).send({ msg: "failure" });
  }

  // getting the detail data for eash month
  const helplineData = JSON.parse(data.data as string);
  // setting data in right format
  for (let i = 2020; i <= currYear; i++) {
    // getting a single years data
    const yearTemp = helplineData[i];
    const monthArray: MONTHSTAT[] = Array<MONTHSTAT>(12).fill({
      donations: 0,
      helpline: 0,
    });
    // adding to respective indexes
    for (let j = 1; j <= 12; j++) {
      if (yearTemp[j]) {
        monthArray[j - 1] = yearTemp[j];
      }
    }
    const tempData: Record<any, any> = {};
    tempData[i] = monthArray;
    // pushing current years data
    finalData.detail![i] = monthArray;
  }

  const allHelplineData = await redis.get("helplines");
  if (!allHelplineData) {
    const tempData: Record<string, any> = {};
    tempData[data.city as string] = finalData;
    await redis.set("helplines", JSON.stringify(tempData));
  } else {
    const tempData = JSON.parse(allHelplineData);
    tempData[data.city as string] = finalData;
    await redis.set("helplines", JSON.stringify(tempData));
  }

  res.status(200).send({ msg: "success" });
});

router.get("/get-helplines", async (_, res) => {
  const data = await redis.get("helplines");
  if (!data) res.status(500).send({ msg: "some problem" });
  res.status(200).send({ data: JSON.parse(data!) });
});

router.get("/fetch-eraktkosh", async (_, res) => {
  const city_list = {
    "35": "andaman_and_nicobar_islands",
  };
  Object.keys(city_list).forEach(async (city_code) => {
    const short_url =
      "https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=" +
      city_code +
      "&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971";
    const { data } = await Axios.get(short_url);
    const entries = data.data;
    entries.forEach((entry: any) => {
      const s_number = entry[0];
      const details = entry[1].split("<br/>");
      const name = details[0];
      const address = details[1];
      var phone = "-",
        fax = "-",
        email = "-";
      if (details[2] != null) {
        var s1 = details[2].replace("Phone: ", "?");
        var s2 = s1.replace(",Fax: ", "?");
        var s3 = s2.replace("Email: ", "?");

        phone = s3.split("?")[1];
        fax = s3.split("?")[2].replace(",", " ");
        email = s3.split("?")[3];
      }

      var category = entry[2];
      var availability: string = entry[3];
      if (availability.includes("Not")) {
        availability = "NA";
      } else {
        availability = availability.replace(
          "<p class='text-success'>Available, ",
          " "
        );
        availability = availability.replace("</p>", " ");
      }
      var time_updated = entry[4];
      if (time_updated.includes("live")) {
        time_updated = "LIVE";
      }
      var type = entry[5];
      res.json({
        s_number,
        name,
        address,
        phone,
        email,
        fax,
        category,
        availability,
        time_updated,
        type,
      });
    });
  });
});

export default router;
