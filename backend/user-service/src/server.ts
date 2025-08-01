import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares to secure our app
app.use(helmet());
app.use(cors({origin: process.env.FRONTEND_URL}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // boleto 15 min
  max: 100    // requests per window
});

app.use(limiter);

app.use(express.json({limit: '1mb'}));  // we'll not be accepting payload request more than 1mb
app.use(express.urlencoded({extended: true})); // this allows payload support nest objects

app.use('/api/auth', require('./routes/auth'));   // mounts all routes from auth.ts at the '/api/auth' base path
app.use('/api/users', require('./routes/users'));    // mounts all routes from users.ts at the '/api/users' base path


app.get('/health', (req: Request, res: Response) => {
  res.send('User Service is running!');
});

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
}); 