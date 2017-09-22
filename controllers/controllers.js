const express = require('express');
const router = express.Router();

router.use('/api', require('./priorities'));
router.use('/api', require('./projects'));
router.use('/api', require('./features'));
router.use('/api', require('./sprints'));
router.use('/api', require('./stories'));

module.exports = router;
