import express from 'express';
import dotEnv from 'dotenv';
import { userRoute } from './Routes/User.route';
dotEnv.config();

//
const app = express();

const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use('/auth', userRoute);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
