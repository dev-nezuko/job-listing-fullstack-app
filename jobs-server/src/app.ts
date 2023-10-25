import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index';

const options: cors.CorsOptions = {
  origin: process.env.REACT_APP_URL
};
export const app = express();
app.use(cors(options));
app.use(logger('dev'));

app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`🚀 Server started at: http://localhost:${port}`));
