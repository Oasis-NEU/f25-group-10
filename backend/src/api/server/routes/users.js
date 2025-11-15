// backend/src/api/server/routes/users.js
import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

// GET /api/me
router.get('/me', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', DEMO_USER_ID)
    .single();

  if (error || !data) {
    console.error('Error fetching current user:', error);
    return res.status(500).json({ error: 'Failed to load current user' });
  }

  res.json(data);
});

export default router;
