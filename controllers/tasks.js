const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const tasks = require('../models/tasks');
const resource = 'tasks';

//Determines if the object is a record object
function isValidRecord(record) {
    let hasName = typeof record.name === 'string' && record.name.trim() !== '';
    let hasValue = typeof record.value === 'number' && record.value > 0;
    return hasName && hasValue;
}

//Gets all records
router.get(`/${resource}`, (req, res) => {
    tasks.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
    tasks.getById(req.params.id).then(rows => {
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
    let task = req.body;
    if (isValidRecord(task)) {
        tasks.create(task).then(rows => {
            res.json(rows);
        });
    } else {
        res.json({ error: 'Invalid record object.' });
    }
});

//Updates a record
router.put(`/${resource}/:id`, (req, res, next) => {
    let task = req.body;
    if (isValidRecord(task)) {
        tasks.update(req.params.id, task).then(rows => {
            res.json(rows);
        });
    } else {
        res.status(400).json({
            error: 'Invalid record object.',
            object: task
        });
    }
});

//Deletes a record
router.delete(`/${resource}/:id`, tools.isValidId, (req, res) => {
    tasks.delete(req.params.id).then(() => {
        res.json({
            result: true
        });
    });
});

module.exports = router;
