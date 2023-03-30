const express = require('express');
const router = express.Router();

const tableController = require('../app/controllers/TableController');

// tableController.index

router.use('/', tableController.index);

module.exports = router;
