import express, { json } from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hotelRoutes from './routes/hotels.js';
import customerRoutes from './routes/customers.js';
import reservationsRoutes from './routes/reservations.js';
import statisticsRoutes from './routes/statistics.js';
import authRoutes from './routes/auth.js';
import connectDB from "./db.js"; 

const app = express();
const PORT = 3000;
dotenv.config();

app.use(json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/hotels', hotelRoutes );
app.use('/customers', customerRoutes );
app.use('/reservations', reservationsRoutes );
app.use('/statistics', statisticsRoutes );
app.use('/auth', authRoutes );

app.get('/', (req, res) => {
  const role = req.cookies.role || 'guest';
  const token = req.cookies.token || 'none';

  res.send(`
      <h1>You are currently logged in as ${role}</h1>
      <p>Your token is: ${token}</p>
  `);
});





  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
