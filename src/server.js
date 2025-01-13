import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('bot is alive');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
