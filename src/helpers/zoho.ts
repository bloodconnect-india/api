import Axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { REFRESH_RESPONSE } from "src/types";

export const getToken = (): Promise<AxiosResponse<REFRESH_RESPONSE>> => {
  return Axios.post<any, AxiosResponse<REFRESH_RESPONSE>>(
    process.env.REFRESH_URL!
  );
};

export const zohoMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.session?.zoho) next();
  else {
    let { data } = await getToken();
    
    req.session!.zoho = data.access_token;
    next();
  }
};

export const cityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.zoho) res.status(404).send({ msg: "failure" });

  req.body.City_Region = req.body.City_Region ? req.body.City_Region : req.body.City_Donor;
  let reqData = {
    data: {
      City: req.body.City_Region 
    },
  };

  console.log(req.session!.zoho)
  try {
    let { data } = await Axios({
      method: "POST",
      url: process.env.BASE_URL! + "City_Vlookup",
      data: reqData,
      headers: {
        Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
      },
    });
    
    // city is present
    if (data.code === 3002) {
      let { data } = await Axios({
        method: "GET",
        url:
          process.env.BASE_GET_URL! +
          'Vlookup_Report?criteria=(City=="' +
          req.body.City_Region+
          "\")",
        headers: {
          Authorization: `Zoho-oauthtoken ${req.session!.zoho}`,
        },
      });
      
      res.locals.cityID = data.data[0].ID
    } else {
        res.locals.cityID = data.result[0].data.ID
    }
    next();
  } catch (e) {
    // send mail
    res.status(501).send({ msg: "failure", desc: "Error in city middleware" });
  }
};
