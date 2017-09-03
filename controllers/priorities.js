let tools = require('../tools/tools');
let table = 'tbl_priority';
let allFields = ['priority_id as id', 'priority_nm as name', 'priority_value as value'];
let id = 'priority_id';

//Determines if the object is a priority object
function isValidPriority(priority) {
    let hasName = typeof priority.name == 'string' && priority.name.trim() != '';
    let hasValue = typeof priority.value == 'number' && priority.value > 0;
    return hasName && hasValue;
}

module.exports = function (router, db) {

    //Gets al priorities
    router.get('/priorities', (req, res) => {
        let data = db.select(allFields).from(table);
        data.then(function (rows) {
            res.json(rows);
        });
    });

    //Gets a priority by ID
    router.get('/priorities/:id', tools.isValidId, (req, res, next) => {
        let data = db.select(allFields).from(table).where(id, req.params.id);
        data.then(rows => {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.status(400);
                next(new Error('Priority not found.'));
            }
        });
    });

    //Adds a new priority
    router.post('/priorities', (req, res, next) => {
        let priority = req.body;
        if (isValidPriority(priority)) {
            let data = db.insert([{ priority_nm: priority.name, priority_value: priority.value }], '*').into(table);
            data.then(rows => {
                res.json(rows);
            });
        } else {
            res.json({ error: 'Invalid priority object.' });
        }
    });

    //Updates a priority
    router.put('/priorities/:id', (req, res, next) => {
        let priority = req.body;
        if (isValidPriority(priority)) {
            let data = db(table).where(id, req.params.id).update({ priority_nm: priority.name, priority_value: priority.value }, allFields);
            data.then(rows => {
                res.json(rows);
            });
        } else {
            res.json({ error: 'Invalid priority object.' });
        }
    });

    //Deletes a priority
    router.delete('/priorities/:id', tools.isValidId, (req, res) => {
        let data = db(table).where(id, req.params.id).del();
        data.then(() => {
            res.json({
                result: true
            })
        });
    });
};