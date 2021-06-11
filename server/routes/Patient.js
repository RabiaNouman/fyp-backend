//require express
const express = require('express');

//define router
const router = express.Router();

//define models schema
const Patient = require("../models/Patient");
const Medicine=require("../models/Medicine");



//create new Patient
router.post("/patient", async(req,res)=>{
    const { patientname,disease,medname,mg,quantity,phoneNumber,gender,age,critical,income,CNIC,profession}=req.body;
    const status = 1;
    const newPatient = new Patient({patientname,disease,medname,mg,quantity,phoneNumber,gender,age,critical,income,CNIC,profession,status});
    newPatient.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : err, msgError: true}});
                else
                    res.send(newPatient._id);
                    //res.status(201).json({message : {msgBody : "request submitted", msgError: false}});
            });
        });


//read the data of registered patient
router.get("/patient",async(req,res)=>{
    try{
        const patientsData=await Patient.find();
        res.send(patientsData);
    }catch(e){
        res.send(e);
    }
})

// get individual patient data using id
router.get("/patient/:id",async(req,res)=>{
try{
    const  _id = req.params.id;

    const patientData = await Patient.findById(_id);
    if(!patientData){
        res.send("patient not found");
        return res.status(404).send();
    }
    else{
        res.send(patientData);
    }
}catch(e){
    res.send("patient not found");
    res.status(500).send(e);
}
});

// delete all requests
router.delete("/patient",async(req,res)=>{
    try{
        Patient.deletePatient();
        if(deletePatient){
            res.send("patient deleted");
            return res.status(400).send();
        }
        res.send(deletePatient);
        res.send("patient not exists");
        
    }catch(e){
        res.send("patient not exists");
        res.status(500).send(e);
    }
    });

// delete patient by its id
router.delete("/patient/:id",async(req,res)=>{
try{
    const deletePatient = await Patient.findByIdAndDelete(req.params.id);
    if(deletePatient){
        res.send("patient deleted");
        return res.status(400).send();
    }
    //res.send(deletePatient);
    res.send("patient not exists");
    
}catch(e){
    res.send("patient not exists");
    res.status(500).send(e);
}
});

// update patient by its id
router.patch("/patient/:id",async(req,res)=>{
try{
    const _id = req.params.id;
    const updatePatient = await Patient.findByIdAndUpdate(_id, req.body,{
        new:true
    });
    res.send(updatePatient);

}catch(e){
    res.send("patient not found");
    res.status(404).send(e);
}
});

//accept request
router.get("/accept/:id",async(req,res)=>{
    const _id = req.params.id;
    
    Patient.findOne({_id},(err,patient)=>{
                if(patient){
                    const _id = patient.id;
                    const status = patient.status;
                    Patient.findByIdAndUpdate(_id, { status: 2 },
                            function (err, patient) {
                            if (err){
                                res.status(500).json({message : {msgBody : err, msgError: true}});
                            }
                            else{
                                const medname=patient.medname;
                                const mg=patient.mg;
                                //res.send("accepted");
                                Medicine.findOne({medname,mg},(err,medicine)=>{
                                    if(err)
                                        res.status(500).json({message : {msgBody : err, msgError: true}});
                                    if(medicine){
                                        const _id = medicine.id;
                                        const quantity = medicine.quantity;
                                        const reqQuan = patient.quantity;
                                        Medicine.findByIdAndUpdate(_id, { quantity: quantity - reqQuan  },
                                                    function (err, medicine) {
                                                    if (err){
                                                        res.status(500).json({message : {msgBody : err, msgError: true}});
                                                    }
                                                    else{
                                                        res.status(200);}});}
                            });
                        }
                    });
                }
        
    });});


    //reject request
router.get("/reject/:id",async(req,res)=>{
    const _id = req.params.id;
    
    Patient.findOne({_id},(err,patient)=>{
                if(patient){
                    const _id = patient.id;
                    const status = patient.status;
                    Patient.findByIdAndUpdate(_id, { status: 3 },
                            function (err, patient) {
                            if (err){
                                res.status(500).json({message : {msgBody : err, msgError: true}});
                            }
                            else{
                                res.send("rejected");
                            }
                    });
                }
        
    });});





module.exports=router;