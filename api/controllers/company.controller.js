const db = require("../models");
const Company = db.company;

// Create company
exports.create = (req, res) => {
    const company = {
        company_name: req.body.name,
        contactId: parseInt(req.params.contactId)
    };

    Company.create(company)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "An error occurred"
            });
        });
};

// Get all companies
exports.findAll = (req, res) => {

    Company.findAll({
        where: {
            contactId: parseInt(req.params.contactId)
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one company by id
exports.findOne = (req, res) => {
    Company.findOne({
        where: {
            contactId: req.params.contactId,
            id: req.params.company_id
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Update one company by id
exports.update = (req, res) => {
    const id = req.params.company_id;
    const contactId = req.params.contactId;

    Company.update(req.body, {
        where: { company_id: id, contactId: contactId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Company was updated successfully."
            });
        } else {
            res.status(400).send({
                message: "Cannot update company with id=${id}. Field may be empty"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating company with id=" + id
        });
    });
};

// Delete one company by id
exports.delete = (req, res) => {

    Company.destroy({
        where: { company_id: req.params.company_id, contactId: req.params.contactId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Company was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: "Cannot delete company. Record may not exist"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete company with id=" + id
        });
    });
};