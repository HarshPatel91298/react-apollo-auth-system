const { MongoClient } = require("mongodb");
require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let db;
const mydburl = process.env.DB_URL;

async function connectToDB() {
    const client = new MongoClient(mydburl);
    await client.connect();
    console.log("Connected to MongoDB successfully!!");
    db = client.db();
}

async function doLoginDB(data) {

    const email = data.email;
    const password = data.password;
    const user = await db.collection("users").findOne({ email: email });
    console.log(user);
    if (!user) {
        console.log("User not found");
        return { token: null, status: false, emailError: "User not found"};
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
        console.log("Password does not match");
        return { token: null, status: false , passwordError: "Password does not match"};
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token: token, status: true, emailError: null, passwordError: null};
};

async function doRegisterDB(data) {
    console.log("Registering user");
    console.log(data);

    const res = {
        status: false,
        Error: null
    }

    const emailExists = await db.collection("users").findOne({ email: data.email });

    const email = data.email;
    const password = data.password;
    // Data Validation
    if (!email || !password) {
        console.log("Email or password not provided");
        res.Error = "Email or password not provided";
        return res;
    } else if (emailExists) {
        console.log("Email already exists");
        res.Error = "Email already exists";
        return res;
    }
    
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const user = await db.collection("users").insertOne({ email: data.email, password: encryptedPassword });
    

    if (user) {
        res.status = true;
        res.Error = '';
        return res;
    }

};

async function getProfile(data) {
    console.log("Getting profile from Server");
    console.log(data);
    const user = await db.collection("users").findOne({ email: data.email });
    console.log(user.email);
    
    return user ? user : null
}

module.exports = { connectToDB, db, doLoginDB, doRegisterDB, getProfile };
