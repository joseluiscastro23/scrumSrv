const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const projects = require('../models/projects');
const resource = 'projects';

//Determines if the object is a record object
function isValidRecord(record) {
    let hasName = typeof record.name === 'string' && record.name.trim() !== '';
    return hasName;
}

//Gets all records
router.get(`/${resource}`, (req, res) => {

    projects.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {

    projects.getById(req.params.id).then(rows => {
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
    let project = req.body;
    if (isValidRecord(project)) {
        projects.create(project).then(rows => {
            res.json(rows);
        });
    } else {
        res.json({ error: 'Invalid record object.' });
    }
});

//Updates a record
router.put(`/${resource}/:id`, (req, res, next) => {
    let project = req.body;
    if (isValidRecord(project)) {
        projects.update(req.params.id, project).then(rows => {
            res.json(rows);
        });
    } else {
        res.status(400).json({
            error: 'Invalid record object.',
            object: project
        });
    }
});

//Deletes a record
router.delete(`/${resource}/:id`, tools.isValidId, (req, res) => {
    projects.delete(req.params.id).then(() => {
        res.json({
            result: true
        });
    });
});

module.exports = router;
