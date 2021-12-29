//Test suite
//must have a func cresteEmployee
//must called create
//return 201
//return json object
//handle errors
const EmployeeController = require('../../controller/Employee.controller');
const EmployeeModel = require('../../Model/employee.model');
const httpMocks = require('node-mocks-http')
EmployeeModel.create = jest.fn()
EmployeeModel.find = jest.fn();
EmployeeModel.findByIdAndUpdate = jest.fn();
EmployeeModel.findByIdAndDelete = jest.fn();
EmployeeModel.findById = jest.fn()
let req,res,next;

beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next=jest.fn();
})
describe("Test Employee.Controller.js",()=>{

    test("Test Create Medthod",()=>{
        expect(typeof EmployeeController.CreateEmployee).toBe("function");
    })

    test("Must Called Create Function",async()=>{
        await EmployeeController.CreateEmployee(req,res,next);
        expect(EmployeeModel.create).toBeCalled();
    })

    test("Must return 201",async()=>{
        await EmployeeController.CreateEmployee(req,res,next)
        expect(res.statusCode).toBe(201)
    })

    test("Return Json Object",async()=>{
        let EmployeeData = {name:"test",desigantion:"test",salary:100};
        req.body = EmployeeData;
        EmployeeModel.create.mockReturnValue(EmployeeData);
        await EmployeeController.CreateEmployee(req,res,next);
        expect(res._getJSONData()).toStrictEqual(EmployeeData);
    })

    test("Handle Errors",async()=>{
        let errorMessage = {message:"done property messing"};
        const rejectPromise = Promise.reject(errorMessage);
        EmployeeModel.create.mockReturnValue(rejectPromise);
        await EmployeeController.CreateEmployee(req,res,next);
        expect(next).toBeCalledWith(errorMessage);
    })

    //GETALL TEST
    test("Must Declear A Get Method",()=>{
        expect(typeof EmployeeController.GetEmployee).toBe("function")
    })

    test("Must Call find All Method",()=>{
        EmployeeController.GetEmployee(req,res,next);
        expect(EmployeeModel.find).toBeCalled();
    })

    test("Must Return 200 Response Code and Employee Json list",async()=>{
        let EmployeeData = {name:"test",desigantion:"test",salary:100};
        EmployeeModel.find.mockReturnValue([EmployeeData]);
        await EmployeeController.GetEmployee(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual([EmployeeData]);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Handel Errors For Employee get All",async()=>{
        let error = {errorMessage:"Something Went Wronge"};
        let rejectPromise = Promise.reject(error);
        EmployeeModel.find.mockReturnValue(rejectPromise);
        await EmployeeController.GetEmployee(req,res,next);
        expect(next).toBeCalledWith(error)
    })

    //GET BY ID TEST
    test("Must Declear A Get Method By ID",()=>{
        expect(typeof EmployeeController.GetEmployeeByID).toBe("function");
    })

    test("Must Call findById Method with ID",()=>{
        let Id = 1;
        req.params.id = Id;
        EmployeeController.GetEmployeeByID(req,res,next);
        expect(EmployeeModel.findById).toBeCalled();
        expect(EmployeeModel.findById).toBeCalledWith(Id);
    })

    test("Must Return 200 Response Code and Employee Json",async ()=>{
        let EmployeeData = {name:"test",desigantion:"test",salary:100};
        let Id = 1;
        req.body.id = Id;
        EmployeeModel.findById.mockReturnValue(EmployeeData);
        await EmployeeController.GetEmployeeByID(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(EmployeeData);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Handel Errors For GetEmployee By ID",async()=>{
        let error = {errorMessage:"Something Went Wronge"};
        let rejectPromise = Promise.reject(error);
        EmployeeModel.findById.mockReturnValue(rejectPromise);
        await EmployeeController.GetEmployeeByID(req,res,next);
        expect(next).toBeCalledWith(error)
    })

    //UPDATE TEST
    test("Must Declear A Update Method",()=>{
        expect(typeof EmployeeController.UpdateEmployee).toBe("function");
    })

    test("Must Call update Method",()=>{
        let Id = 1;
        req.params.id = Id;
        let EmployeeData = {name:"test",desigantion:"test",salary:100};
        req.body = EmployeeData;
        EmployeeController.UpdateEmployee(req,res,next);
        expect(EmployeeModel.findByIdAndUpdate).toBeCalled();
        expect(EmployeeModel.findByIdAndUpdate).toBeCalledWith(Id,EmployeeData,{new:true,useFindAndModify:false});
    })

    test("Must Return 200 Response Code and Employee Json list",async()=>{
        let EmployeeData = {name:"test",desigantion:"test",salary:100};
        let Id = 1;
        req.params.id = Id;
        req.body = EmployeeData;
        EmployeeModel.findByIdAndUpdate.mockReturnValue(EmployeeData);
        await EmployeeController.UpdateEmployee(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(EmployeeData);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Handel Errors For Employee upate",async ()=>{
        let error = {errorMessage:"Something Went Wronge"};
        let rejectPromise = Promise.reject(error);
        EmployeeModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
        await EmployeeController.UpdateEmployee(req,res,next);
        expect(next).toBeCalledWith(error)
    })

    //DELETE TEST
    test("Must Declear A detele Method",()=>{
        expect(typeof EmployeeController.DeleteEmployee).toBe("function");
    })

    test("Must Call findByIdAndDelete Method",()=>{
        let Id = 1;
        req.params.id = Id;
        EmployeeController.DeleteEmployee(req,res,next);
        expect(EmployeeModel.findByIdAndDelete).toBeCalled();
        expect(EmployeeModel.findByIdAndDelete).toBeCalledWith(Id);
    })

    test("Must Return 200 Response Code and Employee Json list",async ()=>{
        let message = {message:"Deleted Sucessfully"};
        let Id = 1;
        req.params.id = Id;
        EmployeeModel.findByIdAndDelete.mockReturnValue(message);
        await EmployeeController.DeleteEmployee(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(message);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("Handel Errors For Employee delete",async()=>{
        let error = {errorMessage:"Something Went Wronge"};
        let rejectPromise = Promise.reject(error);
        EmployeeModel.findByIdAndDelete.mockReturnValue(rejectPromise);
        await EmployeeController.DeleteEmployee(req,res,next);
        expect(next).toBeCalledWith(error)
    })
})