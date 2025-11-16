import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
dotenv.config();

const FRONTEND_URLS = process.env.FRONTEND_URLS || "";
const allowedOrigins = FRONTEND_URLS
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, origin?: string | boolean) => void) => {
    // allow non-browser calls
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, origin);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

const PORT = process.env.PORT;

//All Routes
import { courseRoutes } from './routes/courseRoutes';
import { userRoutes } from './routes/userRoutes';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);

//Server Starting Configration
app.listen(PORT, () => console.log(`Server Is Runing On Port ${PORT}`));

