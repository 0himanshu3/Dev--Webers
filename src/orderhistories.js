// const express = require('express');
// const router = express.Router();
// const { getDatabase } = require('./db');

// router.get('/', async (req, res) => {
//   try {
//     const db = getDatabase();
//     const orderhistories = await db.orderhistories('orderhistories').find({}).toArray();
//     res.json(orderhistories);
//   } catch (error) {
//     console.error('Error fetching orderhistories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
