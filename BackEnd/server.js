const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Aniket")
    .then(()=>console.log("DataBase Connected"))
    .catch((err)=>console.log("Something went wrong " + err));

const productSchema = new mongoose.Schema({
    productName: String,
    productDesc: String,
    productPrice: Number,
    productUrl: String
})

const Product = mongoose.model('Product',productSchema);

app.get("/",function(req,res) {
    res.send("Port No: 8000 is we're using to run our server");
})

app.post("/addProduct",async function(req,res) {
    try {
        const productDetails = req.body;
        console.log('PRODUCT DETAILS FROM FRONT END:: ',productDetails);

        if(!productDetails.productName || !productDetails.productDesc || !productDetails.productPrice) {
            return res.json('All Fields are required');
        }

        const newProduct = new Product({
            productName: productDetails.productName,
            productDesc: productDetails.productDesc,
            productPrice: productDetails.productPrice,
            productUrl: productDetails.productUrl
        });

        await newProduct.save();

        res.json("DB Insertion Successfull 🎉🎉!");
    } catch (error) {
        res.json(error.message);
    }
})

app.get('/getAllProducts',async function(req,res) {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (error) {
        res.json(error.message)
    }
})

app.listen(8000,()=>{
    console.log('Server is running at port: 8000');
})