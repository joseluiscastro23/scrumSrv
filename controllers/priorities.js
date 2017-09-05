let tools = require('../tools/tools');
let table = 'tbl_priority';
let allFields = ['priority_id as id', 'priority_nm as name', 'priority_value as value'];
let id = 'priority_id';
let resource = 'priorities';

//Determines if the object is a record object
function isValidRecord(record) {
    let hasName = typeof record.name === 'string' && record.name.trim() !== '';
    let hasValue = typeof record.value === 'number' && record.value > 0;
    return hasName && hasValue;
}

module.exports = function (router, db) {

    //Gets all records
    router.get(`/${resource}`, (req, res) => {
        let data = db.select(allFields).from(table);
        data.then(function (rows) {
            res.json(rows);
        });
    });

    //Gets a record by ID
    router.get(`/${resource}/:id`, tools.isValidId, (req, res, next) => {
        let data = db.select(allFields).from(table).where(id, req.params.id);
        data.then(rows => {
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
            let data = db.insert([{ priority_nm: priority.name, priority_value: priority.value }], allFields).into(table);
            data.then(rows => {
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
            let data = db(table).where(id, req.params.id).update({ priority_nm: priority.name, priority_value: priority.value }, allFields);
            data.then(rows => {
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
        let data = db(table).where(id, req.params.id).del();
        data.then(() => {
            res.json({
                result: true
            });
        });
    });
};
