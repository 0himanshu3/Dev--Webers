const { MongoClient } = require('mongodb');

const uri='mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

let db;
let collection;
let orderHistoriesCollection;

// Connect to the MongoDB server
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to the database');
        db = client.db('weber'); 

        collection = db.collection('users');
        orderHistoriesCollection = db.collection('orderhistories');    } 
        catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

// Export the collection object
function getCollection() {
    return collection;
}
function getOrderHistoriesCollection() {
    return orderHistoriesCollection;
}
module.exports = { connectDB, getCollection ,getOrderHistoriesCollection };
