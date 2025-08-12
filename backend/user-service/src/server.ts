import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/config'



const app: Application = express();

// Middlewares to secure our app
app.use(helmet());
app.use(cors({origin: config.frontend.url, credentials: true}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // boleto 15 min
  max: 100,    // requests per window
  message: {error: 'Too many request brotha'}
});
app.use(limiter);

// app.use(requestLogger)

app.use(express.json({limit: '1mb'}));  // we'll not be accepting payload request more than 1mb
app.use(express.urlencoded({extended: true})); // this allows payload support nest objects

app.use('/api/auth', require('./routes/auth'));   // mounts all routes from auth.ts at the '/api/auth' base path
app.use('/api/users', require('./routes/users'));    // mounts all routes from users.ts at the '/api/users' base path


app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'user-service',
    timeStamp: new Date().toISOString()
  })
});

const PORT = config.server.port
app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
}); 