const express = require('express');
const router = express.Router();
const { getDatabase } = require('./db');

// Route for /api/orderhistories
router.get('/orderhistories', async (req, res) => {
  try {
    const db = getDatabase();
    const orderhistories = await db.collection('orderhistories').find({}).toArray();
    res.json(orderhistories);
  } catch (error) {
    console.error('Error fetching order histories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
