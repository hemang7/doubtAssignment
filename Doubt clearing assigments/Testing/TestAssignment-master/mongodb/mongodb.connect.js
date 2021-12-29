const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect("mongodb://localhost:27017/examples?directConnection=true&serverSelectionTimeoutMS=2000")
    }
    catch(err){
        console.log(err);
    }
}

module.exports={connect}