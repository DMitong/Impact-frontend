import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { env } from './config';
import routes from './routes';

const swaggerUi = require('swagger-ui-express');
// import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./docs/swagger.json');
// import swaggerDocument from "./docs/swagger.json";

const production = env.NODE_ENV === 'LIVE';

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('trust proxy', 1);

app.use(
  rateLimit({
    // Limit each IP to 50 requests for every minute.
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: 'Too many requests from this IP, please try again after an hour.',
  })
);

if (!production) {
  app.use(errorhandler());
}

app.use(express.static('assets'));
app.use('/api', routes);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//greet
app.get('/', (req: Request, res: Response) => {
  res.send(`${process.env.environment === 'production' ? 'test is up' : 'live is up ad'}`);
});

app.all('/*', (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({
    success: false,
    message: 'Route not found',
  });
});

app.use((err: any, req: Request, res: Response) => {
  res.status(400).send({
    success: false,
    message: err.message.toLowerCase().includes('duplicate key')
      ? 'Account already exists'
      : err.message,
  });
});

export default app;
