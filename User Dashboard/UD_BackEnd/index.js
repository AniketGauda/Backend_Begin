const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 8000;

const app = express();

const User = require('./models/UserModel')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/UserDashboard")
    .then(()=>console.log("DataBase Connected"))
    .catch((err)=>console.log(err.message));


app.get('/',(req,res)=>{
    res.send("Server is Running!!");
})

app.post('/createUser',async function(req,res) {
    try {
        const {name, email, password,role} = req.body;

        if(!name || !email || !password || !role) {
            return res.json({err: 'All Fields are required', status: 'false'});
        }

        const newUser = new User({
            name: name,
            email:email,
            password: password,
            role: role
        })

        await newUser.save();
        res.status(201).json({message: 'User Saved Successfully', status: 'true'});
    } catch (error) {
        res.json({err: error.message,status: 'false'});
    }
})

app.get('/getAllUsers',async function(req,res) {
    try {
        const allUser = await User.find();
        res.json({users: allUser, message: 'All Users fetched Successfully!', status: 'true'});
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.listen(PORT, ()=>{
    console.log('Server is running on Port:',PORT);
})