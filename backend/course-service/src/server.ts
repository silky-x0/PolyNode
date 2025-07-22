import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send('Course Service is running!');
});

app.listen(PORT, () => {
  console.log(`Course Service listening on port ${PORT}`);
}); 