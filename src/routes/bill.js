const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/BillController');

// billController.index

router.use('/', billController.index);

module.exports = router;
