const express = require('express');
const router = express.Router();

const materialController = require('../app/controllers/MaterialController');

// materialController.index

router.use('/', materialController.index);

module.exports = router;
