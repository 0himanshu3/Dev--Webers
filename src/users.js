const express = require('express');
const router = express.Router();
const { getDatabase } = require('./db');

// Route for /api/users
router.get('/users', async (req, res) => {
  try {
    const db = getDatabase();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
