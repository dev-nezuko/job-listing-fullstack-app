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

app.use(express.json({ limit: '16kb' }));

app.use('/api', routes);

const port = process.env.PORT || 8080;

if (require.main === module) app.listen(Number(port), process.env.HOST || '127.0.0.1', () => console.log(`🚀 Server started at: http://localhost:${port}`));
