const mongoose = require('mongoose');


const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city: String,
    phone: Number,
    password:{
        type: String,
        required: true
    },

})

const People = mongoose.model('people', peopleSchema);

module.exports = People;