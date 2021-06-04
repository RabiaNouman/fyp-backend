const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    patientname:{
        type:String,
        required:true, 
    },
    disease:{
        type:String,
        required:true,
    },
    medname:{
        type:String,
        required:true
    },
    mg:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        maxlength:15,
        minlength:11
    },
    gender:{
        type:String,
        required:true,
        enum: ["Male", "Female"]
    },
    age:{
        type:Number,
        required:true
    },
    critical:{
        type:Boolean,
        required:true
    },
    income:{
        type:Number,
        require:true
    },
    CNIC:{
        type:Number,
        length:13,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    }
});




//we will create a new collection
const Patient = new mongoose.model('Patient',patientSchema);
module.exports = Patient;