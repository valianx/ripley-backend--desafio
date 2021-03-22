import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

export { app };
