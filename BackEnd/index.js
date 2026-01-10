const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/* 
    > We did npm i express mongoose, so to get the express we're using require and storing in a variable
    named express

    > Similarly for mongoose.
*/

const app = express();

app.use(cors());
app.use(express.json());
// These lines we're including to avoid the CORS Policy voilation.

app.get('/',
  function run(req,res) {
    // This Function contains the functionality of run.
    // So Every Time Someone will call this, he will also have this functionality
    
    res.send('Server is Up');
  }
)

/*
    > This is an example of rest API. currently we're sending only a String.
    > If the server is running then with 'http://localhost:8080/bring_run_functionality' this link 
    > we can see the results in normal web search also.
*/


app.listen(8000,()=>{
    console.log("Server is running on port 8000... :)");
});

/*
    > 8000 is basically a port No.
    > Even if you run normal basic html that too run on a port.
    > Normal Backend we run on port 5000 upto 8000 or 10-000.
*/

/*
    > Our server is ready.
    > How to  check it 
        : Open terminal and run the file.
    
*/

mongoose.connect("mongodb://localhost:27017/Aniket")
    .then(()=>console.log("DataBase Connected"))
    .catch((err)=>console.log("Something went wrong " + err));

/*
    > This line is to connect the DB with Server.
    > The URL you'll get Once to go to MongoDB Compass then build one connection.
    > Just click of new connection & go with by default one.
    > Right click on the connection and click on Copy connect string.
    > Just paste it here then put / {your name} 
*/


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

/*
    > We Make a schema which is a template in which we'll store the data in DB.
*/

const User = mongoose.model('User',userSchema);

/*
    > Here We're making a model out of userSchema & storing in a variable names User
    > So the name, email & password we can get via User only (User.name)
*/

// This is the making of an Post API which will resonsible to store the data in the DB.
app.post('/save',async function(req,res) {
    const details  = req.body;    
    if(!details.name || !details.email || !details.password) {
        return res.json({message: 'All Fields are required'});
    }
    console.log('DETAILS FROM FRONT_END:: ',details);
    const newUser = new User({
        name: details.name,
        email: details.email,
        password: details.password
    })
    await newUser.save();
    res.json({message: 'User Saved Successfully!'});
})