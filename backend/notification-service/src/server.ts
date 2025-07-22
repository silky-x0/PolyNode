import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
  res.send('Notification Service is running!');
});

app.listen(PORT, () => {
  console.log(`Notification Service listening on port ${PORT}`);
}); 