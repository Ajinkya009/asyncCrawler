'use strict';

const express = require('express');
const UrlController = require('../controllers/UrlController');


var router = express.Router();

router.get('/getAllData/', UrlController.getAllData);

module.exports = router;
