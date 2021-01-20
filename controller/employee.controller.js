const mongoose = require('mongoose');
const Employee = require('../models/employee.model.js')
const Company = require('../models/company.model')


// Create and Save a new employee
exports.create_employee = (req, res) => {
    let employee = req.body;
    // Validate request
    if (!employee) {
        return res.status(400).send({
            message: "employee content can not be empty"
        });
    }


    // Create a employee
    Employee.create(employee, function(error, post) {
        if (error) {
            res.status(400).send(error);
            return error;
        }
        res.json(post);
    });
};

// Retrieve and return all employees from the database.
exports.findAll_employee = async(req, res) => {
    let emoloyee_data = await Employee.aggregate([{
        $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyDetail"
        }
    }, ])
    res.json(emoloyee_data);
};

// exports.findAll_employee = async(req, res) => {
//     let emoloyee_data = await Company.aggregate([{
//         $lookup: {
//             from: "employees",
//             localField: "_id",
//             foreignField: "companyId",
//             as: "companyDetail"
//         }
//     }, ])
//     res.json(emoloyee_data);
// };

// Update a employee identified by the employeeId in the request
exports.update_employee = async(req, res) => {
    let data = await Employee.findByIdAndUpdate({ _id: req.params.employeeId },
        req.body
    )
    let newData = await Employee.findById(mongoose.Types.ObjectId(req.params.employeeId))
        // console.log('new data: ', newData)
    res.json(newData)
};

// Delete an employee with the specified employeeId in the request
exports.delete_employee = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "employee not found with given id "
                });
            }
            res.send({ message: "employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "employee not found with given id "
                });
            }
            return res.status(500).send({
                message: "Could not delete note with given id "
            });
        });

};