//require express
const express = require('express');

//define models schema
const Donation = require('../models/Donation');
const Donor = require('../models/Donor');

//define router
const router = express.Router();

//add new medicine

    
//add new medicine
router.post("/donation/:id", async(req,res)=>{
    const  _id = req.params.id;
    const donorData = await Donor.findById(_id);
    if(donorData){
        const did=_id;
        const { medname,mg,quantity,expiryDate}=req.body;
    Donation.findOne({medname,mg},(err,donation)=>{
        if(err)
            res.status(500).json({message : {msgBody : err, msgError: true}});
        if(donation)
            res.status(400).json({message : {msgBody : "Medicine is already present", msgError: true}});
        else{
            const newDonation = new Donation({did,medname,mg,quantity,expiryDate});
            newDonation.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : err, msgError: true}});
                else 
                    res.send(newDonation);
                    //res.status(201).json({message : {msgBody : "Medicine successfully donated", msgError: false}});
            });
        }
    }); 
    }
    else{
        res.status(500).json({message : {msgBody : "Donor not present", msgError: true}});
    }
    
});


//read the data of registered medicine
router.get("/donation",async(req,res)=>{
    try{
        const DonationData=await Donation.find();
        res.send(DonationData);
    }catch(e){
        res.send(e);
    }
})

// get individual medicine data using id
router.get("/donation/:id",async(req,res)=>{
try{
    const  _id = req.params.id;

    const DonationData = await Donation.findById(_id);
    if(!DonationData){
        res.send("medicine not found");
        return res.status(404).send();
    }
    else{
        res.send(DonationData);
    }
}catch(e){
    res.send("medicine not found");
    res.status(500).send(e);
}
});

// delete medicine by its id
router.delete("/donation/:id",async(req,res)=>{
try{
    const deleteMedicine = await Donation.findByIdAndDelete(req.params.id);
    if(deleteMedicine){
        res.send("medicine deleted");
        return res.status(400).send();
    }else{
        res.send("medicine not exist");
    }

    
}catch(e){
    res.send("medicine not exists");
    res.status(500).send(e);
}
});

// update medicine by its id
router.patch("/donation/:id",async(req,res)=>{
try{
    
    const _id = req.params.id;

    const updateMedicine = await Donation.findByIdAndUpdate(_id, req.body,{
        new:true
    });

    res.send(updateMedicine);

}catch(e){
    res.send("medicine not found");
    res.status(404).send(e);
}
});


module.exports=router;