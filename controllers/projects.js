let tools = require('../tools/tools');

module.exports = function (router, db) {
    router.get('/projects', (req, res) => {
        let data = db.select('project_id as id', 'project_nm as name').from('tbl_project');
        data.then(function (rows) {
            res.json(rows);
        });
    });

    router.get('/projects/:id', tools.isValidId, (req, res) => {
        let data = db.select('project_id as id', 'project_nm as name').from('tbl_project').where('project_id', req.params['id']);
        data.then(function (rows) {
            res.json(rows);
        });
    });

    router.post('/projects', (req, res) => {
        res.json({ test: 'post' });
    });

    router.delete('/projects/:id', (req, res) => {
        res.json({ test: 'delete' });
    });

    router.put('/projects/:id', (req, res) => {
        res.json({ test: 'put' });
    });
};