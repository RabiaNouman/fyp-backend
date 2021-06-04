const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/project",{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology: true, 
    useFindAndModify:false
}).then(()=>{
    console.log(`Database is connected`);
}).catch(()=>{
    console.log(`no connection`);
})

