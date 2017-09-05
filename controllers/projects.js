let tools = require('../tools/tools');
let table = 'tbl_project';
let allFields = ['project_id as id', 'project_nm as name'];
let id = 'project_id';
let resource = 'projects';

//Determines if the object is a record object
function isValidRecord(record) {
    let hasName = typeof record.name === 'string' && record.name.trim() !== '';
    return hasName;
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
        let project = req.body;
        if (isValidRecord(project)) {
            let data = db.insert([{ project_nm: project.name }], allFields).into(table);
            data.then(rows => {
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
            let data = db(table).where(id, req.params.id).update({ project_nm: project.name }, allFields);
            data.then(rows => {
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
        let data = db(table).where(id, req.params.id).del();
        data.then(() => {
            res.json({
                result: true
            });
        });
    });
};
