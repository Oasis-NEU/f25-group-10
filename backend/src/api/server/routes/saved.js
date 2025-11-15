// backend/src/api/server/routes/saved.js
import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Same demo user as listings.js
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

function mapListingRow(row) {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    category: row.category,
    image: row.image_url,
    description: row.description,
    condition: row.condition,
    postedDate: row.posted_date,
    location: row.location,
    featured: row.featured,
    seller: null,
  };
}

// GET /api/saved  -> array of IDs
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('saved_items')
    .select('listing_id')
    .eq('user_id', DEMO_USER_ID);

  if (error) {
    console.error('Error fetching saved IDs:', error);
    return res.status(500).json({ error: 'Failed to load saved items' });
  }

  res.json(data.map((row) => row.listing_id));
});

// GET /api/saved/listings  -> full listing data
router.get('/listings', async (req, res) => {
  const { data: saved, error: savedError } = await supabase
    .from('saved_items')
    .select('listing_id')
    .eq('user_id', DEMO_USER_ID);

  if (savedError) {
    console.error('Error fetching saved rows:', savedError);
    return res.status(500).json({ error: 'Failed to load saved items' });
  }

  const ids = saved.map((row) => row.listing_id);
  if (ids.length === 0) {
    return res.json([]);
  }

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
      featured
    `
    )
    .in('id', ids);

  if (error) {
    console.error('Error fetching saved listings:', error);
    return res.status(500).json({ error: 'Failed to load saved listings' });
  }

  res.json(data.map(mapListingRow));
});

// POST /api/saved/:listingId  -> save
router.post('/:listingId', async (req, res) => {
  const listingId = Number(req.params.listingId);

  const { error } = await supabase
    .from('saved_items')
    .upsert(
      { user_id: DEMO_USER_ID, listing_id: listingId },
      { onConflict: 'user_id,listing_id' }
    );

  if (error) {
    console.error('Error saving item:', error);
    return res.status(500).json({ error: 'Failed to save item' });
  }

  res.status(204).send();
});

// DELETE /api/saved/:listingId  -> unsave
router.delete('/:listingId', async (req, res) => {
  const listingId = Number(req.params.listingId);

  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_id', DEMO_USER_ID)
    .eq('listing_id', listingId);

  if (error) {
    console.error('Error removing saved item:', error);
    return res.status(500).json({ error: 'Failed to remove saved item' });
  }

  res.status(204).send();
});

export default router;
