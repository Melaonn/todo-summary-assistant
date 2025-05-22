const express = require('express');
const router = express.Router();
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Get all todos
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add a new todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ text }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.sendStatus(204);
});

module.exports = router;
