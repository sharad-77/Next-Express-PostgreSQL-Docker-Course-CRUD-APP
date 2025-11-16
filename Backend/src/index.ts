import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

const PORT = process.env.PORT;

//All Routes
import { courseRoutes } from './routes/courseRoutes';
import { userRoutes } from './routes/userRoutes';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);

//Server Starting Configration
app.listen(PORT, () => console.log(`Server Is Runing On Port ${PORT}`));
