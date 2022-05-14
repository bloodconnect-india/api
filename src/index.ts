require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";

import root from "./routes/index";
import feedback from "./routes/feedback";
import payment from "./routes/payment";
import bot from "./routes/bot";

const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);
const devDeployment = process.env.DEPLOYMENT === 'local';

app.use(cors());
app.use(bodyParser.json());
app.use(
  !devDeployment ? session({
    name: process.env.SESSION_NAME!,
    store: new RedisStore({
      client: redis,
      ttl: 2 * 3600, // in seconds
      disableTouch: true,
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  }): 
  session({
    name: process.env.SESSION_NAME!,
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", root);
app.use("/feedback", feedback);
app.use("/payment", payment);
app.use("/bot", bot);
app.listen(process.env.PORT, () => {
  console.log("server started at port : ", process.env.PORT);
});
export default app;
