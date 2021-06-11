//require express
const express = require('express');

//define router
const router = express.Router();

//define model schema
const Donor = require("../models/Donor");


//create new donors
router.post("/donor", async(req,res)=>{
    const { donorname,password,address,phoneNumber,email } = req.body;
    Donor.findOne({email,phoneNumber},(err,donor)=>{
        if(err)
            res.status(500).json({message : {msgBody : err, msgError: true}});
        if(donor)
            res.status(400).json({message : {msgBody : "donor is already present", msgError: true}});
        else{
    const newDonor = new Donor({donorname,password,address,phoneNumber,email});
    newDonor.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : err, msgError: true}});
                else
                res.send(newDonor);
                    //res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            }); }
        });
})

//login donor
router.post("/donor/login", async(req,res)=>{
    const { email,password}=req.body;
    Donor.findOne({email,password},(err,donor)=>{
        if(err)
            res.status(500).json({message : {msgBody : err, msgError: true}});
        if(donor)
            res.send(donor._id);
            //res.status(400).json({message : {msgBody : "login successfully", msgError: true}});
            
        else{
            res.status(201).json({message : {msgBody : "donorname or password is incorrect", msgError: false}});
        }
    }); 
});

//logout
router.get('/donor/logout',(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{donorname : ""},success : true});
}); 

//read the data of registered donors
router.get("/donor",async(req,res)=>{
    try{
        const donorsData=await Donor.find();
        res.send(donorsData);
    }catch(e){
        res.send(e);
    }
})

// get individual donor data using id
router.get("/donor/:id",async(req,res)=>{
try{
    const  _id = req.params.id;

    const donorData = await Donor.findById(_id);
    if(!donorData){
        res.send("donor not found");
        return res.status(404).send();
    }
    else{
        console.log(donorData);
        res.send(donorData);
        res.status(200);
    }
}catch(e){
    res.send("donor not found");
    res.status(500).send(e);
}
});

// delete donor by its id
router.delete("/donor/:id",async(req,res)=>{
try{
    const deleteDonor = await Donor.findByIdAndDelete(req.params.id);
    if(deleteDonor){
        res.send("Donor deleted");
        return res.status(200).send();
    }else{
        res.send("Donor not exists");
    }
    //res.send(deleteDonor);
    
}catch(e){
    res.send("Donor not exists");
    res.status(500).send(e);
}
});

// update donor by its id
router.patch("/donor/:id",async(req,res)=>{
try{
    const _id = req.params.id;
    const updateDonor = await Donor.findByIdAndUpdate(_id, req.body,{
        new:true
    });
    res.send(updateDonor);
    res.status(200);

}catch(e){
    res.send("Donor not found");
    res.status(404).send(e);
}
});


module.exports=router;