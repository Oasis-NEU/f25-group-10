// backend/src/api/server/index.js
import express from 'express';
import cors from 'cors';

import listingsRouter from './routes/listings.js';
import savedRouter from './routes/saved.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.send('API is up');
});

// Routes
app.use('/api/listings', listingsRouter);
app.use('/api/saved', savedRouter);
app.use('/api', usersRouter); // gives /api/me

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
