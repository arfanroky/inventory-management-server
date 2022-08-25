const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    pName:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: [true, 'price is required'],
        trim: true
    },
    rating:{
        type: Number,
        trim: true
    },
    category:{
        type: String,
        required: [true, 'category is required'],
        trim: true
    }

});

const Product = new mongoose.model('product', productSchema);

module.exports = Product;