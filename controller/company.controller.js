
const Company =require('../models/company.model.js')
const mongoose = require('mongoose');

// Create and Save a new Note
exports.create_company = (req, res) => {
    let company = req.body;
    // Validate request
    if(!company) {
        return res.status(400).send({
            message: "company content can not be empty"
        });
    }
    

    // Create a company
    Company.create(company, function (error, post) {
        if (error) {
            res.status(400).send(error);
            return error;
        }
        res.json(post);
    });

};

// Retrieve and return all notes from the database.
exports.findAll_company = (req, res) => {
    let company = req.body;
   
    Company.find(company, function (error, post) {
            if (error) {
                res.status(400).send(error);
                return error;
            }
            res.json(post);
        });
    

};

// Update a note identified by the noteId in the request
exports.update_company = async (req, res) => {
    let data = await Company.update(
        {_id:mongoose.Types.ObjectId(req.params.companyId)},
        req.body
    )
    let newData = await Company.findById(mongoose.Types.ObjectId(req.params.companyId))
    console.log('new data: ',newData)
    res.json(newData)
};

// Delete a note with the specified noteId in the request
exports.delete_company = (req, res) => {
    Company.findByIdAndRemove(req.params.companyId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with given id " 
            });
        }
        res.send({message: "Company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with given id " 
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with given id " 
        });
    });

};