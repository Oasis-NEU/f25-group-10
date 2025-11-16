// backend/src/api/server/routes/categories.js
import express from 'express';

const router = express.Router();

// Static categories list
const categories = [
  { id: 1, name: 'Furniture'},
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Textbooks' },
  { id: 4, name: 'Clothing' },
  { id: 5, name: 'Sports' },
  { id: 6, name: 'Kitchen' },
  { id: 7, name: 'Decor' },
  { id: 8, name: 'Other' },
];

// GET /api/categories
router.get('/', (req, res) => {
  res.json(categories);
});

export default router;