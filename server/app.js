//require express
const express = require('express');

//require database connection
require("../server/db/conn");

//require models
const Donor = require("../server/models/Donor");
const Medicine = require("../server/models/Medicine");
const Patient = require("../server/models/Patient");
const Administrator = require("../server/models/Administrator");
const Donation = require("../server/models/Donation");
const Feedback = require("../server/models/Feedback");

//require routes
const donorRouter = require("./routes/Donor");
const medicineRouter = require("./routes/Medicine");
const patientRouter = require("./routes/Patient");
const administratorRouter = require("./routes/Administrator");
const donationRouter = require("./routes/Donation");
const feedbackRouter = require("./routes/Feedback");


//to avoid undefined data
const app=express();


//port number
const port = process.env.PORT || 8000;

//middlewares
app.use(express.json());

// we need to register our router
app.use(donorRouter);
app.use(medicineRouter);
app.use(patientRouter);
app.use(administratorRouter);
app.use(donationRouter);
app.use(feedbackRouter);
//listen port
app.listen(port,()=>{
    console.log(`Server is started at port no ${port}`);
});



