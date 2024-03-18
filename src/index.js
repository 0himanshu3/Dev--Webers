

const products = [
    { id: "aa", name: "Burger", price: 90, img: "burger.jpg" },
    { id: "bb", name: "ButterBeer", price: 150, img: "butterbeer.jpg" },
    { id: "cc", name: "White Pasta", price: 160, img: "white_pasta.webp" },
    { id: "dd", name: "Oreo Shake", price: 60, img: "oreo_shake.jpg" },
    { id: "ee", name: "Pizza Cheese Corn", price: 180, img: "pizza_cheese_corn.webp" },
    { id: "ff", name: "Pizza Deluxe", price: 200, img: "pizza_deluxe.png" },
    { id: "gg", name: "Pizza Extravagence", price: 230, img: "pizza_extravagence.jpg" },
    { id: "hh", name: "Chocolate Icecream", price: 80, img: "chocolate_iceream.webp" },
    { id: "ii", name: "Paneer Fried Rice", price: 120, img: "paneer_fried_rice.jpg" },
    { id: "jj", name: "Sandwich", price: 95, img: "sandwich.jpg" },
    { id: "kk", name: "spicy Garlic Noodles", price: 120, img: "spicy_garlic_noodles.jpg" },
    { id: "ll", name: "Mocktail Virgin Mojita", price: 70, img: "mocktail_virgin_mojita.jpg" },
    { id: "mm", name: "Veg Maggie", price: 50, img: "veg_maggie.png" },
    { id: "nn", name: "Spring Roll", price: 70, img: "spring_roll.jpg" },
    { id: "oo", name: "Masala Fries", price: 80, img: "masala_fries.jpg" },
    { id: "pp", name: "Mocktail Blue Curacao", price: 70, img: "mocktail_blue_curacao.jpg" },
    { id: "qq", name: "Manchurian", price: 120, img: "manchurian.webp" },
    { id: "rr", name: "French Fries", price: 110, img: "french_fries.jpg" },
    { id: "ss", name: "Chilli Paneer", price: 130, img: "chilli_paneer.webp" },
    { id: "tt", name: "Cold Drink Lychee", price: 70, img: "cold_drink_lychee.jpg" },
    { id: "uu", name: "Butter Naan", price: 35, img: "butter_naan.webp" },
    { id: "vv", name: "Tandoori Roti", price: 15, img: "tandoori_roti.jpg" },
    { id: "ww", name: "Sweet Lassi", price: 70, img: "lassi.webp" },
    { id: "xx", name: "Kesar Badam Lassi", price: 80, img: "kesar_badam_lassi.jpg" }
];
const express=require('express');
const bcrypt=require('bcrypt');
//const collection=require("./config");
const ejs=require('ejs');
//const {connectToDatabase}=require('./db');////////
const { connectDB, getCollection, getOrderHistoriesCollection } = require('./db');


const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const session = require('express-session');
const router = express.Router();
const app=express();
const path=require('path');


router.use(bodyParser.json());
app.locals.products = JSON.stringify(products);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',router);
app.use('/api',require('./users'));
app.use('/api',require('./orderhistories'));
app.set("view engine",'ejs');
app.use(session({
    secret: 'thisissecretcodeforwebers', // Change this to a long, randomly generated string
    resave: false,
    saveUninitialized: false
}));
app.set('views',path.join(__dirname,'..','views')); 
const connect=mongoose.connect("mongodb://localhost:27017/weber");

connect.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        
        type: String,
        required: true
    }
});
const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id : {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    }

})
const orderHistorySchema = new mongoose.Schema({ 
    fullName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    cartDetails: [orderItemSchema]
}
// {
//     timestamps: true
// }
);

const orderHistoriesCollection = new mongoose.model("orderhistories", orderHistorySchema);


const collection=new mongoose.model("users",LoginSchema);



app.use(express.static("public"));
app.use(express.static("src"));
app.get("/",(req,res)=>{
    res.render("main");
})
app.get('/main', (req, res) => {
    res.render("main");
  });

app.get('/afterlogin', (req, res) => {
    res.render("afterlogin");
  });
app.get('/checkout', (req, res) => {
    res.render("checkout");
  });
app.get("/signup",(req,res)=>{
    res.render("signup");
})
// app.get('/afterlogin', (req, res) => {
//     res.render("afterlogin", { username: req.session.username, usertype: req.session.usertype });
// });
app.get('/profileuser', (req, res) => {
    res.render("profileuser", { username: req.session.username, usertype: req.session.usertype });
});

app.post("/signup", async (req, res) => {
        const userData = {
            username: req.body.username,
            password: req.body.password,
            usertype: req.body.usertype
        };
    
        try {
            // Check if the username already exists
            const existUser = await collection.findOne({ username: userData.username });
            if (existUser) {
                
                return res.status(400).send("User already exists. Please choose a different username.");
            }
    
            // Hash the password before storing it
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hashedPassword; // Replace plain text password with hashed one
    
            // Create a new user with hashed password
            const newUser = await collection.insertMany(userData);
            console.log(newUser);
            res.send("User registered successfully!"); // Sending response after successful registration
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).send("Error registering user: " + error.message); // Sending error response with error message
        }
});
//login
app.post("/main", async (req, res) => { 
    try {
        const check = await collection.findOne({ username: req.body.username }); // Use findOne instead of finOne
        if (!check) {
            return res.send("Username not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch && check.usertype === req.body.usertype) {
            req.session.username=check.username;
            req.session.usertype=req.body.usertype;
            if (check.usertype === 'student') {
                return res.render("profileuser");
            } else if (check.usertype === 'canteen') {
                return res.render("admin");
            } else {
                return res.send("Invalid user type");
            }
        } else {
            return res.send("Wrong username, password, or usertype combination");
        }
    } catch (error) { // Catch any errors that occur during execution
        console.error("Error:", error);
        res.send("An error occurred"); // Send a generic error message
    }
});
app.post("/checkout", async (req, res) => {
    
    try {
        const { fullName, phoneNumber, cartDetails } = req.body;

        // Create a new instance of the OrderHistory model
        const order = new orderHistoriesCollection({ fullName, phoneNumber, cartDetails });

        // Save the order to the database
        const savedOrder=await order.save();
        console.log(savedOrder);
        res.status(200).json({ message: "Order placed successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to place order" });
    }
});



app.get('/admin', async (req, res) => {
    try {
        const userslist = await collection.find();  
        const orderHistoriesList= await orderHistoriesCollection.find({});
        //console.log(orderHistoriesList);
        res.json({userslist,orderHistoriesList});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});
app.get('/profileuser', async (req, res) => {
    try {
        const orderHistoriesList= await orderHistoriesCollection.find({});
        console.log(orderHistoriesList);
        res.json({orderHistoriesList});
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

const port=5000;
app.listen(port,() => {
    console.log(`server running on Port: ${port}`);

})
