const express = require('express');
const router = express.Router();

router.use('/api', require('./priorities'));
router.use('/api', require('./projects'));
router.use('/api', require('./features'));

module.exports = router;
