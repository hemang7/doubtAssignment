const EmployeeModel = require('../Model/employee.model')

exports.CreateEmployee =async (req,res,next) =>{
    try{
        const Data = await EmployeeModel.create(req.body)
        res.status(201).json(Data)
    }catch(err){
        next(err);
    } 
}

exports.GetEmployee = async(req,res,next) =>{
    try{
        const Data = await EmployeeModel.find();
        res.status(200).json(Data);
    }
    catch(err){
        next(err);
    }
}

exports.GetEmployeeByID = async(req,res,next) =>{
    try{
        const Data = await EmployeeModel.findById(req.params.id);
        res.status(200).json(Data);
    }
    catch(err){
        next(err);
    }
}

exports.UpdateEmployee = async(req,res,next) =>{
    try{
        const Data = await EmployeeModel.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:false});
        res.status(200).json(Data);
    }
    catch(err){
        next(err);
    }
}

exports.DeleteEmployee = async(req,res,next) =>{
    try{
        const Data = await EmployeeModel.findByIdAndDelete(req.params.id);
        res.status(200).json(Data);
    }
    catch(err){
        next(err);
    }
}