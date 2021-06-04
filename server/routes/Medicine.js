//require express
const express = require('express');

//define models schema
const Medicine = require('../models/Medicine');
const Donor = require('../models/Donor');

//define router
const router = express.Router();


//read the data of registered medicine
router.get("/medicine",async(req,res)=>{
    try{
        const medicineData=await Medicine.find();
        res.send(medicineData);
    }catch(e){
        res.send(e);
    }
})

// get individual medicine data using id
router.get("/medicine/:id",async(req,res)=>{
try{
    const  _id = req.params.id;

    const medicineData = await Medicine.findById(_id);
    if(!medicineData){
        res.send("medicine not found");
        return res.status(404).send();
    }
    else{
        res.send(medicineData);
    }
}catch(e){
    res.send("medicine not found");
    res.status(500).send(e);
}
});

// delete medicine by its id
router.delete("/medicine/:id",async(req,res)=>{
try{
    const deleteMedicine = await Medicine.findByIdAndDelete(req.params.id);
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
router.patch("/medicine/:id",async(req,res)=>{
try{
    
    const _id = req.params.id;

    const updateMedicine = await Medicine.findByIdAndUpdate(_id, req.body,{
        new:true
    });

    res.send(updateMedicine);

}catch(e){
    res.send("medicine not found");
    res.status(404).send(e);
}
});


module.exports=router;
