const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const stories_state = require('../models/stories_state');
const resource = 'stories-state';

//Gets all records
router.get(`/${resource}`, (req, res) => {
    stories_state.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
    stories_state.getById(req.params.id).then(rows => {
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

module.exports = router;
