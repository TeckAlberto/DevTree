import express, {Express} from 'express';
import 'dotenv/config'
import router from './router';
import { connectDB } from './config/db';

const server : Express = express();
connectDB();

// Read form's data
server.use(express.json());
server.use('/', router);

export default server