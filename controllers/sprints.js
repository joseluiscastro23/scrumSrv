const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const sprints = require('../models/sprints');
const resource = 'sprints';

//Determines if the object is a record object
function isValidRecord(record) {

    //TODO Validations for accept sprint record.
    return true;
}

//Gets all records
router.get(`/${resource}`, (req, res) => {
    sprints.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
    sprints.getById(req.params.id).then(rows => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(400);
            next(new Error('Record not found.'));
        }
    }).catch((err) => {
        res.status(500).json({ err: err });
    });
});

//Adds a new record
router.post(`/${resource}`, (req, res, next) => {
    let priority = req.body;
    if (isValidRecord(priority)) {
        sprints.create(priority).then(rows => {
            res.json(rows);
        });
    } else {
        res.json({ error: 'Invalid record object.' });
    }
});

//Updates a record
router.put(`/${resource}/:id`, (req, res, next) => {
    let priority = req.body;
    if (isValidRecord(priority)) {
        sprints.update(req.params.id, priority).then(rows => {
            res.json(rows);
        });
    } else {
        res.status(400).json({
            error: 'Invalid record object.',
            object: priority
        });
    }
});

//Deletes a record
router.delete(`/${resource}/:id`, tools.isValidId, (req, res) => {
    sprints.delete(req.params.id).then(() => {
        res.json({
            result: true
        });
    });
});

module.exports = router;
