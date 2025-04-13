import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import apiRoutes from './routes/index';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API GestEPI fonctionnelle' });
});

export default app;
