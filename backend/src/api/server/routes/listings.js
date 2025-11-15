// backend/src/api/server/routes/listings.js
import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Helper: DB row -> frontend shape
function mapListingRow(row) {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    category: row.category,          // simple text column
    image: row.image_url,            // map to frontend's "image"
    description: row.description,
    condition: row.condition,
    postedDate: row.posted_date,
    location: row.location,
    featured: row.featured,
    seller: null,                    // we’ll wire real seller data later
  };
}

// GET /api/listings  (list + search + filters)
router.get('/', async (req, res) => {
  const { q, category, location, sortBy, minPrice, maxPrice, sellerId } = req.query;

  let query = supabase
    .from('listings')
    .select(
      `
      id,
      title,
      price,
      category,
      image_url,
      description,
      condition,
      posted_date,
      location,
      featured,
      seller_id
    `
    );

  // Filters
  if (sellerId) {
    query = query.eq('seller_id', sellerId);
  }
  if (category) {
    query = query.eq('category', category);
  }
  if (location) {
    query = query.eq('location', location);
  }
  if (minPrice) {
    query = query.gte('price', minPrice);
  }
  if (maxPrice) {
    query = query.lte('price', maxPrice);
  }

  // Free-text search
  if (q) {
    query = query.or(
      `title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`
    );
  }

  // Sorting
  if (sortBy === 'price-low') {
    query = query.order('price', { ascending: true });
  } else if (sortBy === 'price-high') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('posted_date', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ error: 'Failed to load listings' });
  }

  res.json(data.map(mapListingRow));
});

// GET /api/listings/:id  (single listing)
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
    .from('listings')
    .select(
      `
      id,
      title,
      price,
      category,
      image_url,
      description,
      condition,
      posted_date,
      location,
      featured,
      seller_id
    `
    )
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching listing:', error);
    return res.status(404).json({ error: 'Listing not found' });
  }

  res.json(mapListingRow(data));
});

// POST /api/listings  (create new listing)
router.post('/', async (req, res) => {
  const {
    title,
    price,
    category,
    condition,
    location,
    description,
    image, // frontend sends this
  } = req.body;

  if (!title || !price || !category || !condition || !location || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

  const { data, error } = await supabase
    .from('listings')
    .insert([
      {
        title,
        price,
        category,
        condition,
        location,
        description,
        image_url: image || null,
        seller_id: DEMO_USER_ID,
        featured: false,
      },
    ])
    .select(
      `
      id,
      title,
      price,
      category,
      image_url,
      description,
      condition,
      posted_date,
      location,
      featured,
      seller_id
    `
    )
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    return res.status(500).json({ error: 'Failed to create listing' });
  }

  res.status(201).json(mapListingRow(data));
});

export default router;
