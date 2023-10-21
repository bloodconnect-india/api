require('dotenv').config();
import cors from 'cors';
import express from 'express';

import bot from './routes/bot';
import feedback from './routes/feedback';
import root from './routes/index';
import payment from './routes/payment';

const app = express();

app.use(cors({
  origin: '*',
  allowedHeaders: "*"
}));
app.use(express.json());

app.use('/', root);
app.use('/feedback', feedback);
app.use('/payment', payment);
app.use('/bot', bot);
app.listen(process.env.PORT, () => {
  console.log('server started at port : ', process.env.PORT);
});
export default app;
