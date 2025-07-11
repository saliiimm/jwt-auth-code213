import express from 'express';

const app = express();
const PORT = 3000;

import './src/config/connectDb.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
