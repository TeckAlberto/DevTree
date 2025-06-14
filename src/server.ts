import express, {Express} from 'express';
import cors from 'cors';
import 'dotenv/config'
import router from './router';
import { connectDB } from './config/db';

connectDB();

const server : Express = express();

// Cors
server.use(cors())

// Read form's data
server.use(express.json());

server.use('/', router);

export default server