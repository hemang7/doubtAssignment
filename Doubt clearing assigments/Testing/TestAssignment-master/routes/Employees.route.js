var express = require('express');
var router = express.Router()
var EmployeesController = require('../controller/Employee.controller')
router.post('/employee',EmployeesController.CreateEmployee)
router.get('/employees',EmployeesController.GetEmployee);
router.get('/employee/:id',EmployeesController.GetEmployeeByID);
router.put('/employee/:id',EmployeesController.UpdateEmployee);
router.delete('/employee/:id',EmployeesController.DeleteEmployee);
module.exports = router