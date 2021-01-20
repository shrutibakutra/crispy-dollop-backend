
let express = require('express');
let router = express.Router();

const company_controller = require('../controller/company.controller');
  
router.post('/create/company',company_controller.create_company)
router.put('/update/company/:companyId', company_controller.update_company);
router.delete('/delete/company/:companyId', company_controller.delete_company);
router.get('/getAll/company/', company_controller.findAll_company);


module.exports = router;