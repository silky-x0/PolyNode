import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3004;

app.get('/', (req, res) => {
  res.send('Payment Service is running!');
});

app.listen(PORT, () => {
  console.log(`Payment Service listening on port ${PORT}`);
}); 