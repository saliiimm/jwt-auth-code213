import express from 'express';
import mainRoutes from './src/api/routes/index.js';

const app = express();
const PORT = 3000;

import './src/config/connectDb.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
