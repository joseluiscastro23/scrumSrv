﻿const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const tasks_activity = require('../models/tasks_activity');
const resource = 'tasks-activity';

//Gets all records
router.get(`/${resource}`, (req, res) => {
    tasks_activity.getAll().then(function (rows) {
        res.json(rows);
    });
});

//Gets a record by ID
router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
    tasks_activity.getById(req.params.id).then(rows => {
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
