import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('API Gateway is running!');
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
}); 