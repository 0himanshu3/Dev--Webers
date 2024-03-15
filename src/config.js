// const mongoose = require("mongoose");

// // Define a function to connect to the database
// const connectToDatabase = () => {
//     // Connect to the database
//     mongoose.connect("mongodb://localhost:27017/weber");

//     // Check if the database connection is successful
//     const db = mongoose.connection;

//     db.on("error", (error) => {
//         console.error("Database connection error:", error);
//     });

//     db.once("open", () => {
//         console.log("Database connected successfully");
//     });

//     // Define the schema for login details
//     const LoginSchema = new mongoose.Schema({
//         username: {
//             type: String,
//             required: true
//         },
//         password: {
//             type: String,
//             required: true
//         },
//         usertype: {
//             type: String,
//             required: true
//         }
//     });

//     // Create a model for the login collection
//     const UserModel = mongoose.model("users", LoginSchema);

//     return UserModel;
// };

// module.exports = connectToDatabase;
// const mongoose=require("mongoose");
// const connect=mongoose.connect("mongodb://localhost:27017/weber");

// connect.then(()=>{
//     console.log("database connected successfully");
// })
// .catch(()=>{
//     console.log("Database cannot be connected");
// });

// const LoginSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     usertype: {
//         type: String,
//         required: true
//     }
// });

// const collection=new mongoose.model("users",LoginSchema);

// module.exports=collection;

