# BC API

![node-current](https://img.shields.io/node/v/typescript)

A node js api for bloodconnect to connect zoho  with the [website](https://bloodconnect.org) forms.

It uses [redis](https://redis.io) to store the oauth token using express-session.  

## Installation

Use the git cli to clone the repo.

```bash
git clone https://github.com/anish-yadav/bc-api
cd bc-api
yarn
```
After cloning  add a .env file with the following key in the root directory

```bash
RAZORPAY_KEY=xxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_SECRET=xxxxxxxxxxxxxxxxxxxx
REFRESH_URL=xxxxxxxxxxxxxxxxxxxxxxxx
BASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxx
BASE_GET_URL=xxxxxxxxxxxxxxxxxxxxxxx
SESSION_NAME=xxxxxxxxxxxxxxxxxxxxxxx
SESSION_SECRET=xxxxxxxxxxxxxxxxxxxxx
```
## Editing

There are two routes, one for main requests and other for feedbacks.

#### 1. Changing variable name in zoho form
Suppose you changes the Blood_Group to BG in add-donor
```javascript
// routes/index.ts
data:{
      Name: req.body.Name,
      City_Donor: req.body.City_Donor,
      Email: req.body.Email,
      Phone_Number: "+91" + req.body.Phone_Number,
      //Blood_Group: req.body.Blood_Group,
      BG : req.body.BG,
      Date_of_Birth: changeToddmmyyyy(req.body.Date_of_Birth),
      Source: "Website",
}
```
*in case you changed City_Region name , make sure to change it in middleware too( helplers/zoho.ts ).

```javascript
axios.post('/routename',(req,res) => {
   // do something here
}
```
###### request body format must be same as that in zoho creator form.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
