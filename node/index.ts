import express from 'express';

const app = express();

let count = 0;

app.get('/', (req, res) => {
  count++;
  res.send(`Count: ${count}`);
});

app.listen(8000, () => {});
