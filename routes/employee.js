
let express = require('express');
let router = express.Router();

const employee_controller = require('../controller/employee.controller');
  
router.post('/create/employee',employee_controller.create_employee)
router.put('/update/employee/:employeeId', employee_controller.update_employee);
router.delete('/delete/employee/:employeeId', employee_controller.delete_employee);
router.get('/getAll/employee/', employee_controller.findAll_employee);


module.exports = router;