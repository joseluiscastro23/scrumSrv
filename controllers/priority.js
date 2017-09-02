module.exports = function (router, db) {
    router.get('/priorities', (req, res) => {
        res.json({ test: 'all' });
    });

    router.get('/priorities/:id', (req, res) => {
        res.json({ test: 'get by id.' });
    });

    router.post('/priorities', (req, res) => {
        res.json({ test: 'post' });
    });

    router.delete('/priorities/:id', (req, res) => {
        res.json({ test: 'delete' });
    });

    router.put('/priorities/:id', (req, res) => {
        res.json({ test: 'put' });
    })
};