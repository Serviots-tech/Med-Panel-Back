// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { medicineRoutes } from './src/routes/index';
import { errorHandler } from './src/middlewares/errorHandler';
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 8080;

// CORS Configuration
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// Use CORS middleware globally with options
app.use(cors());

// Middleware
app.use(bodyParser.json());
config()

// Register routes
app.use("/api/medicines", medicineRoutes);

// Global error handler
app.use(errorHandler);


// Route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
