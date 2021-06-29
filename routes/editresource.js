const express = require('express');
const { editresource } = require('../controllers/controller');
const check = require('../middleware/check');


const router = express.Router();

router.put('/', check, editresource);


module.exports = router;