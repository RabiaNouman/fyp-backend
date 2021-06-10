//require express
const express = require('express');

//define models schema
const Donation = require('../models/Donation');
const Donor = require('../models/Donor');
const Medicine = require('../models/Medicine');

//define router
const router = express.Router();


    
//add new medicine
router.post("/donation/:id", async(req,res)=>{
    console.log(req.body);
    const  _id = req.params.id;
    const donorData = await Donor.findById(_id);
    if(donorData){
        const did=_id;
        const { medname,mg,quantity,expiryDate}=req.body;
    Donation.findOne({did,medname,mg},(err,donation)=>{
        if(err)
            res.status(500).json({message : {msgBody : err, msgError: true}});
        if(donation){
            const _id = donation.id;
            const quantity = donation.quantity;
            const addquan = parseInt(req.body.quantity);
            Donation.findByIdAndUpdate(_id, { quantity: quantity + addquan  },
                        function (err, donation) {
                        if (err){
                            res.status(500).json({message : {msgBody : err, msgError: true}});
                        }
                        else{
                            //res.send(donation);
                            Medicine.findOne({medname,mg},(err,medicine)=>{
                                if(err)
                                    res.status(500).json({message : {msgBody : err, msgError: true}});
                                if(medicine){
                                    const _id = medicine.id;
                                    const quantity = medicine.quantity;
                                    const addquan = parseInt(req.body.quantity);
                                    Medicine.findByIdAndUpdate(_id, { quantity: quantity+addquan  },
                                                function (err, medicine) {
                                                if (err){
                                                    res.status(500).json({message : {msgBody : err, msgError: true}});
                                                }
                                                else{
                                                    res.send(medicine);}});}
                                    //res.status(400).json({message : {msgBody : "Medicie is already present", msgError: true}});
                                else{
                                    const newMedicine = new Medicine({did,medname,mg,quantity,expiryDate});
                                    newMedicine.save(err=>{
                                        if(err)
                                            res.status(500).json({message : {msgBody : err, msgError: true}});
                                        else 
                                        res.send(newMedicine);
                                           // res.status(201).json({message : {msgBody : "Medicine successfully added", msgError: false}});
                                    });
                                }
                            }); 
                            }
                            });
                        }
        
        else{
            const newDonation = new Donation({did,medname,mg,quantity,expiryDate});
            newDonation.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : err, msgError: true}});
                else 
                    //res.send(newDonation);
                    Medicine.findOne({medname,mg},(err,medicine)=>{
                        if(err)
                            res.status(500).json({message : {msgBody : err, msgError: true}});
                        if(medicine){
                            const _id = medicine.id;
                            const quantity = medicine.quantity;
                            const addquan = req.body.quantity;
                            Medicine.findByIdAndUpdate(_id, { quantity: quantity+addquan  },
                                        function (err, medicine) {
                                        if (err){
                                            res.status(500).json({message : {msgBody : err, msgError: true}});
                                        }
                                        else{
                                            res.send(medicine);}});}
                            //res.status(400).json({message : {msgBody : "Medicie is already present", msgError: true}});
                        else{
                            quantity=parseInt(quantity);
                            const newMedicine = new Medicine({did,medname,mg,quantity,expiryDate});
                            newMedicine.save(err=>{
                                if(err)
                                    res.status(500).json({message : {msgBody : err, msgError: true}});
                                else 
                                res.send(newMedicine);
                                   // res.status(201).json({message : {msgBody : "Medicine successfully added", msgError: false}});
                            });
                        }
                    }); 
                    });
                }
                   // });
                    //res.status(201).json({message : {msgBody : "Medicine successfully donated", msgError: false}});
            });
        }
    
    else{
        res.status(500).json({message : {msgBody : "Donor not present", msgError: true}});
    }
    
});


//read the data of registered 
router.get("/donation",async(req,res)=>{
  try{
      const DonationData=await Donation.find();
      res.send(DonationData);
  }catch(e){
      res.send(e);
  }
})

// get individual medicine data using ids
router.get("/donation/:id",async(req,res)=>{
  console.log(req.params.id);
  try{
      const  did = req.params.id;
  
      const donationData = await Donation.find({did});
      if(!donationData){
          res.send("donation not found");
          return res.status(404).send();
      }
      else{
          res.send(donationData);
      }
  }catch(e){
      res.send("donation not found");
      res.status(500).send(e);
  }
   
})


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