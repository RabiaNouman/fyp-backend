const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt =require('bcrypt');
const DonationSchema=new mongoose.Schema({
    did:{
        type:String,
        required:true
    },
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
const Donation = new mongoose.model('Donation',DonationSchema);
module.exports = Donation;