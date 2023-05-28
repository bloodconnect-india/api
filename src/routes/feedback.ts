import Axios from 'axios';
import express from 'express'
import { changeToddmmyyyy } from '../helpers';
import { zohoMiddleware } from '../helpers/zoho';

const router = express.Router()



router.post("/helpline", zohoMiddleware, async (req, res) => {
  let reqData = {
    data: {
      Name: req.body.name,
      Email: req.body.email,
      Contact_Number: "+91" + req.body.phone,
      City: req.body.city,
      Helpline: req.body.ID,
      DOR: changeToddmmyyyy(req.body.dor),
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
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Helpline_Feedback_Form",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.header("Access-Control-Allow-Origin", "https://www.bloodconnect.org");
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});


router.post("/camp", zohoMiddleware, async (req, res) => {
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
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Camp_Feedback_Form",
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


router.post("/donor", zohoMiddleware, async (req, res) => {
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
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Donor_Feedback_Form",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    res.header("Access-Control-Allow-Origin", "https://www.bloodconnect.org");
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(400).send({ msg: "failure" });
  }
});


//awareness feedback form

router.post("/awareness", zohoMiddleware, async (req, res) => {
  let reqData = {
    data: {
      Name: req.body.name,
      Email: req.body.email,
      Contact_Number: req.body.contact,
      College_Company_Name: req.body.collegeName,
      Experience: req.body.experience,
      Interactive:req.body.interactive,
      Speaker: req.body.speaker,
      Learn_New:req.body.new,
      Donate_Blood: req.body.donateBlood,
      Additional:req.body.additional
    }
  };
  try {
    await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "Awareness_Feedback_Form",
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

export default router
