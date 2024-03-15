// const { MongoClient } = require('mongodb');

// const uri='mongodb://localhost:27017';

// // Create a new MongoClient
// const client = new MongoClient(uri);

// let db;
// let collection;

// // Connect to the MongoDB server
// async function connectDB() {
//     try {
//         await client.connect();
//         console.log('Connected to the database');
//         db = client.db('weber'); // Change 'your-database-name' to your actual database name
//         collection = db.collection('users'); // Change 'your-collection-name' to your actual collection name
//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//     }
// }

// // Export the collection object
// function getCollection() {
//     return collection;
// }

// module.exports = { connectDB, getCollection };
