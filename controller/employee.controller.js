const mongoose = require('mongoose');
const Employee = require('../models/employee.model.js')
const User = require('../models/users.model')
const bcrypt = require('bcrypt');

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
    Employee.create(employee, function (error, post) {
        if (error) {
            res.status(400).send(error);
            return error;
        }
        res.json(post);
    });
};

// Retrieve and return all employees from the database.
exports.findAll_employee = async (req, res) => {
    let emoloyee_data = await Employee.aggregate([{
        $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyDetail"
        }
    },])
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
exports.update_employee = async (req, res) => {
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

exports.register = async (req, res) => {
    let password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    // Validate request
    // if (!user) {
    //     return res.status(400).send({
    //         message: "employee content can not be empty"
    //     });
    // }

    // Create a employee
    let encryptedPassword = await bcrypt.hash(password, salt)
    let users = {
        "email": req.body.email,
        "password": encryptedPassword
    }
    User.create(users, function (error, post) {
        if (error) {
            res.status(400).send(error);
            return error;
        }
        res.json(post);
    });
}

// exports.login = async (req, res, next) => {
//     let user = req.body
//     let email = req.params.email
//     let password = req.params.password

//     User.find(email)
//         .then(async (user) => {
//             if (!user[0]) {
//                 res.status(404).send({});
//             } 
//             else {
//                 const comparision = await bcrypt.compare(password, user[0].password);
//                 console.log("comparision::::",comparision)
//                 if (comparision) {
//                     console.log("success")
//                     res.send({
//                         "code": 200,
//                         "success": "login sucessfull"
//                     })
//                 }
//                 else {
//                     console.log("fail")
//                     res.send({

//                         "code": 204,
//                         "success": "Email and password does not match"
//                     })
//                 }
//             }
//         }
//         )
// }
exports.login = async (req, res, next) => {
    let user = req.body
    let email = req.body.email
    let password = req.body.password

    User.find(email,async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
              })
        }else{
            if(results.length >0){
                const comparision = await bcrypt.compare(password, user[0].password);
                if (comparision) {
                    console.log("success")
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    })
                }
                else {
                    console.log("fail")
                    res.send({

                        "code": 204,
                        "success": "Email and password does not match"
                    })
                }
            }
            else{
                res.send({
                  "code":206,
                  "success":"Email does not exits"
                    });
              }
            }
        })
    }