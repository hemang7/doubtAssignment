const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})
const EmployeeModel = mongoose.model('Employee',EmployeeSchema);
module.exports = EmployeeModel;