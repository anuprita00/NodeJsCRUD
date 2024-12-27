const mongoose = require('mongoose')
//everything that requires database use mongoose 

//to create product schema

const productSchema = mongoose.Schema(
    {
        //field
        name:{
            type: String, //return type of field
            require: [true, "Please enter Product name"]
        },
        quantity:{
            type: Number,
            require: true,
            default: 0
        },
        price:{
            type: Number,
            require: true
        },
        image:{
            type: String
        }
    },
    {
        //Timestamp is used to create 2 fields,which are create the app and update the app
        //used to track when data is saved to the database and when it is modified
        timestamps:true
    }
)

// creating product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
