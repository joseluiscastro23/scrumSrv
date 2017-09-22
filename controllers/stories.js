const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const stories = require('../models/stories');
const resource = 'stories';

//Determines if the object is a record object
function isValidRecord(record) {
    
    //TODO Validations for accept story record.
    return true;
}

//Gets all records
router.get(`/${resource}`, (req, res) => {
    stories.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
    stories.getById(req.params.id).then(rows => {
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
    let story = req.body;
    if (isValidRecord(story)) {
        stories.create(story).then(rows => {
            res.json(rows);
        });
    } else {
        res.json({ error: 'Invalid record object.' });
    }
});

//Updates a record
router.put(`/${resource}/:id`, (req, res, next) => {
    let story = req.body;
    if (isValidRecord(story)) {
        stories.update(req.params.id, story).then(rows => {
            res.json(rows);
        });
    } else {
        res.status(400).json({
            error: 'Invalid record object.',
            object: story
        });
    }
});

//Deletes a record
router.delete(`/${resource}/:id`, tools.isValidId, (req, res) => {
    stories.delete(req.params.id).then(() => {
        res.json({
            result: true
        });
    });
});

module.exports = router;
