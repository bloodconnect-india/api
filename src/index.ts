require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";

import root from "./routes";
import feedback from "./routes/feedback";

const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    name: process.env.SESSION_NAME!,
    store: new RedisStore({
      client: redis,
      ttl: 3600, //in seconds
      disableTouch: true,
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", root);
app.use("/feedback",feedback);
app.listen(process.env.PORT, () => {
  console.log("server started at port 3000");
});
export default app;
