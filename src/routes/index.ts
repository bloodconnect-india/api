import Axios from 'axios';
import express from 'express';
import { CITYSTAT, MONTHSTAT } from '../../src/types';
import { changeToddmmyyyy, processRaktKoshEntry } from '../helpers';
import { Sheet } from '../helpers/sheets';
import { zohoMiddleware } from '../helpers/zoho';
import { MockRedis } from '../mocks/redis';
import { sendMail } from '../helpers/email';
import { getContactSubjectAndMsg } from '../templates/contact-us';
import { getCampSubjectAndMsg, getCampSubjectAndMsgRequestor } from '../templates/camp';
import { getJoinSubjectAndMsg } from '../templates/join-us';
import { getAwarenessSubjectAndMsg, getAwarenessSubjectAndMsgRequestor } from '../templates/awareness';

const redis = new MockRedis('');
const router = express.Router();

const ERAKTKOSH_URL_PREFIX = 'https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=';
const ERAKTKOSH_URL_SUFFIX = '&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971';

router.get('/', (_, res) => {
  res.status(200).send({ msg: 'success' });
});

// helpline request
router.post('/helpline', async (req, res) => {
  const sheet = new Sheet(process.env.helpline_sheet || '');
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
  const ok = await sheet.addRow(row);
  if (ok) {
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// register as donor request
router.post('/add-donor', async (req, res) => {
  const sheet = new Sheet(process.env.donor_sheet || '');
  const row = {
    'Name': req.body.Name,
    'Email': req.body.Email,
    'Phone': '+91' + req.body.Phone_Number,
    'DOB': changeToddmmyyyy(req.body.Date_of_Birth),
    'BG': req.body.Blood_Group,
    'City': req.body.City_Donor
  };
  console.log('adding row', row);
  const ok = await sheet.addRow(row);
  if (ok) {
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// recruitment form
router.post('/recruitment', async (req, res) => {
  const sheet = new Sheet(process.env.recruitment_sheet || '');
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
  const ok = await sheet.addRow(row);
  if (ok) {
    const data = getJoinSubjectAndMsg({
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
    await sendMail(data.to, data.subject, data.body);
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// camp request
router.post('/camp-request', async (req, res) => {
  const sheet = new Sheet(process.env.camp_awareness_sheet || '');
  const row = {
    'Type': 'Camp',
    'Name': req.body.Your_Name,
    'Email': req.body.Email,
    'Phone': req.body.Phone_Number,
    'City': req.body.City_Region,
    'Organization Name': req.body.Organization_Name
  };
  const ok = await sheet.addRow(row);
  if (ok) {
    const data = getCampSubjectAndMsg({
      city: row.City,
      contact: row.Phone,
      email: row.Email,
      name: row.Name,
      organization: row['Organization Name']
    })
    await sendMail(data.to, data.subject, data.body);
    const requestorData = getCampSubjectAndMsgRequestor({
      city: row.City,
      contact: row.Phone,
      email: row.Email,
      name: row.Name,
      organization: row['Organization Name']
    })
    await sendMail(requestorData.to, requestorData.subject, requestorData.body);
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// awareness request
router.post('/awareness-request', async (req, res) => {
  const sheet = new Sheet(process.env.camp_awareness_sheet || '');
  const row = {
    'Type': 'Awareness',
    'Name': req.body.Your_Name,
    'Email': req.body.Email,
    'Phone': req.body.Phone_Number,
    'City': req.body.City_Name,
    'Organization Name': req.body.Organization_Name,
    'Mode': req.body.Mode
  };
  const ok = await sheet.addRow(row);
  if (ok) {
    const data = getAwarenessSubjectAndMsg({
      city: row.City,
      contact: row.Phone,
      email: row.Email,
      name: row.Name,
      organization: row['Organization Name'],
      mode: row.Mode
    });
    await sendMail(data.to, data.subject, data.body);
    const requestorData = getAwarenessSubjectAndMsgRequestor({
      city: row.City,
      contact: row.Phone,
      email: row.Email,
      name: row.Name,
      organization: row['Organization Name'],
      mode: row.Mode
    });
    await sendMail(requestorData.to, requestorData.subject, requestorData.body);
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// contact form
router.post('/contact', async (req, res) => {
  const sheet = new Sheet(process.env.contact_sheet || '');
  const row = {
    'Name': req.body.Name,
    'Email': req.body.Email,
    'Message': req.body.Message,
    'Phone': req.body.Phone_Number,
    'City': req.body.City
  };
  const ok = await sheet.addRow(row);
  if (ok) {
    const data = getContactSubjectAndMsg({ name: row.Name, contact: row.Phone, email: row.Email, message: row.Message, city: row.City });
    await sendMail(data.to, data.subject, data.body);
    res.status(200).send({ msg: 'success' });
  } else {
    res.status(400).send({ msg: 'failure' });
  }
});

// TODO: remove zoho
// blood warrior
router.post('/blood-warrior', zohoMiddleware, async (req, res) => {
  if (!((req.session as any) as any).zoho) res.status(500).send({ msg: 'failure' });
  console.log(req.body);
  try {
    const { data } = await Axios({
      method: 'POST',
      url: process.env.BASE_URL! + 'Blood_Warriors',
      data: { data: req.body },
      headers: {
        Authorization: `Zoho-oauthtoken ${((req.session as any) as any).zoho}`
      }
    });
    res.header('Access-Control-Allow-Origin', 'https://www.bloodconnect.org');
    console.log(data);
    res.status(200).send({ msg: 'success' });
  } catch (e) {
    console.log('error', e);
    res.send(500).send({ msg: 'failure' });
  }
});

// TODO: remove zoho
router.get('/set-helpline-stat', async (req, res) => {
  // getting the request data
  const data = req.query;

  const currYear = new Date().getFullYear();

  // the format of data that need to be pushed
  const finalData: CITYSTAT = {
    city: data.city as string,

    open: parseInt(data.open as string, 10),
    closed: parseInt(data.closed as string, 10),
    total: parseInt(data.total as string, 10),
    detail: {}
  };

  // if the data sent is not complete
  if (!data || !data.city || !data.data) {
    res.status(400).send({ msg: 'failure' });
  }

  // getting the detail data for eash month
  const helplineData = JSON.parse(data.data as string);
  // setting data in right format
  for (let i = 2020; i <= currYear; i++) {
    // getting a single years data
    const yearTemp = helplineData[i];
    const monthArray: MONTHSTAT[] = Array<MONTHSTAT>(12).fill({
      donations: 0,
      helpline: 0
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

  const allHelplineData = await redis.get('helplines');
  if (!allHelplineData) {
    const tempData: Record<string, any> = {};
    tempData[data.city as string] = finalData;
    await redis.set('helplines', JSON.stringify(tempData));
  } else {
    const tempData = JSON.parse(allHelplineData);
    tempData[data.city as string] = finalData;
    await redis.set('helplines', JSON.stringify(tempData));
  }

  res.status(200).send({ msg: 'success' });
});

// TODO: remove zoho
router.get('/get-helplines', async (_, res) => {
  const data = await redis.get('helplines');
  if (!data) res.status(500).send({ msg: 'some problem' });
  res.status(200).send({ data: JSON.parse(data!) });
});

// TODO: remove zoho
router.get('/fetch-eraktkosh', zohoMiddleware, async (req, res) => {
  console.log('e rakht-kosh');
  const city_list: Record<string, string> = {
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
  //let response: Record<string, any[]> = {};
  let count = 0;
  for (let i = 0; i < cityCodes.length; i++) {
    count = 0; // counter to keep a tab if a state has more than 200 entries
    const cityUrl = ERAKTKOSH_URL_PREFIX + cityCodes[i] + ERAKTKOSH_URL_SUFFIX;
    try {
      const cityData: any[] = [];
      const { data } = await Axios.get(cityUrl);
      data.data?.forEach((e: any) => {
        const currEntry = processRaktKoshEntry(e, city_list[cityCodes[i]]);
        cityData.push(currEntry);
      });
      if (cityData.length > 199) {
        let start_idx = 0;
        let end_idx = 199;
        while (count < cityData.length) {
          try {
            const { data } = await Axios({
              method: 'POST',
              url: process.env.BASE_URL! + 'eRaktKosh_Data',
              data: { data: cityData.slice(start_idx, end_idx) },
              headers: {
                Authorization: `Zoho-oauthtoken ${((req.session as any) as any).zoho}`
              },
              validateStatus: function (_: number) {
                return true;
              }
            });
            //console.log('status: ', status);
            if (data.result) {
              data.result.forEach((r: any) => {
                if (r.error) {
                  console.log('error:', r.error[0]);
                }
              });
            }
          } catch (e) {
            hasErrors = true;
            console.log('error: ' + e);
          }
          start_idx += 199;
          if (end_idx + 199 > cityData.length) {
            end_idx = cityData.length;
          } else end_idx += 199;
          count += 199;
        }
      } else {
        try {
          const { data } = await Axios({
            method: 'POST',
            url: process.env.BASE_URL! + 'eRaktKosh_Data',
            data: { data: cityData },
            headers: {
              Authorization: `Zoho-oauthtoken ${((req.session as any) as any).zoho}`
            },
            validateStatus: function (_: number) {
              return true;
            }
          });
          // console.log("entry added for " +city_list[cityCodes[i]] +" : "+ count );
          // console.log('status: ', status);
          if (data.result) {
            data.result.forEach((r: any) => {
              if (r.error) {
                console.log('error:', r.error[0]);
              }
            });
          }
        } catch (e) {
          hasErrors = true;
          console.log('error: ' + e);
        }
      }
    } catch (e) {
      console.log('failed to fetch ' + city_list[cityCodes[i]] + ' error ', e);
    }
  }
  if (hasErrors) {
    res.status(500).send({ msg: 'failure' });
  } else {
    res.status(200).send({ msg: 'success' });
  }
});

export default router;
