// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import  routes  from './src/routes';
import { errorHandler } from './src/middlewares/errorHandler';
import cors from 'cors'
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config()


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '100mb' }));
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


app.use(routes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
