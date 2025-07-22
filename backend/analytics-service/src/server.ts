import express from 'express';
import { Request, Response } from 'express';  

const app = express();
const PORT = process.env.PORT || 3006;

app.get('/', (req: Request, res: Response) => {
  res.send('Analytics Service is running!');
});

app.listen(PORT, () => {
  console.log(`Analytics Service listening on port ${PORT}`);
}); 