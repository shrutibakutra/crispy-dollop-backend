const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const EmployeeSchema = mongoose.Schema({
    companyId: {type: mongoose.Schema.ObjectId, ref: 'Company'},
    firstName: String,
    lastName: String,
    company:String,
    email:String,
    phone:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);
