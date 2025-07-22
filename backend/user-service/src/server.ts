import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('User Service is running!');
});

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
}); 