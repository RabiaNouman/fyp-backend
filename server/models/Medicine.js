const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt =require('bcrypt');
const MedicineSchema=new mongoose.Schema({

    medname:{
        type:String,
        required:true, 
    },
    mg:{
        type:String,
        required:true,
    } ,
    quantity:{
        type:Number,
        required:true
    } ,
    expiryDate:{
        type: Date,
        required:true
    }
});


//we will create a new collection
const Medicine = new mongoose.model('Medicine',MedicineSchema);
module.exports = Medicine;