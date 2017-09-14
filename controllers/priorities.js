const tools = require('../tools/tools');
const priorities = require('../models/priorities');
const resource = 'priorities';

//Determines if the object is a record object
function isValidRecord(record) {
    let hasName = typeof record.name === 'string' && record.name.trim() !== '';
    let hasValue = typeof record.value === 'number' && record.value > 0;
    return hasName && hasValue;
}

module.exports = function (router) {

    //Gets all records
    router.get(`/${resource}`, (req, res) => {
        priorities.getAll().then(function (rows) {
            res.json(rows);
        });
    });

    //Gets a record by ID
    router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
        priorities.getById(req.params.id).then(rows => {
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
            priorities.create(priority).then(rows => {
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
            priorities.update(priority).then(rows => {
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
        priorities.delete(req.params.id).then(() => {
            res.json({
                result: true
            });
        });
    });
};
