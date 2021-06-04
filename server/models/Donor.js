const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt =require('bcrypt');
const DonorSchema=new mongoose.Schema({
    donorname:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        maxlength:15,
        minlength:11
    },
    email:{
        type:String,
        required:[true,"Email id already present"],
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    }
    
});




//we will create a new collection
const Donor = new mongoose.model('Donor',DonorSchema);
module.exports = Donor;