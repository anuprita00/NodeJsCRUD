const express = require('express')
const mongoose = require("mongoose")
const Product = require("./models/ProductModel")
const app = express()

//we add middleware so that our app understand Json
app.use(express.json())//express middleware for json
app.use(express.urlencoded({extended: false}))//express middleware for formURL

//To access website through web browser, you need to declare routes
//routes
app.get('/',(req, res) =>{ 
    //request gets from client, response is what to response back from node app 
    res.send("Hello Node API")
})


app.get('/blog',(req, res) =>{
    res.send("Hello Blog, My name is Anuprita");
})

//fetch data from db
app.get('/products',async(req,res) => {
    try{ 
        //we use product model to access data from db
        const products = await Product.find({});//all product
        res.status(200).json(products);

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})

//fetch data from db by id
app.get('/products/:id',async(req,res) => {
    try{ 
        //we use product model to access data from db
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})

//use a model to save data in mongodb
app.post('/product',async(req, res) =>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        const product = await Product.create(req.body)//create new product in db
        res.status(200).json(product);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }

})

//to update and edit data in db
app.put('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);//id and data we want to update
        
        //we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }

        //return updated product
        const updatedProduct = await Product.findById(id);
        res.status(202).json(updatedProduct);

    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

//REMOVE or delete data from DB
app.delete('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
           return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

//connect to mongoDB
mongoose
.connect('mongodb+srv://anuprita:Anuprita@cluster0.o8lvu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')//url from mongodb
.then(() => {
    console.log("connected to mongoDB")
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000.')
    });
})
.catch((error) => {console.log(error)})