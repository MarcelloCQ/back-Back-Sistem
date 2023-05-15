import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './cors/cors'
import path from 'path'

// routes
// import rootRoute from './routes/root.routes';
import workersRoutes from './routes/worker.routes';
import credentialsRoutes from './routes/credentials.routes';
import loginRoutes from './routes/login.routes';
import fileRoutes from './routes/file.routes';


const app = express();

// settings
app.set('port', 4000);

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions))
app.use('/optimize', express.static(path.join(__dirname, 'optimize')));

// routes
app.use('/api/workers', workersRoutes);
app.use('/api/credentials', credentialsRoutes);
app.use('/api/login', loginRoutes);
// app.use('/api', rootRoute);
app.use('/api/upload', fileRoutes);

export default app;
