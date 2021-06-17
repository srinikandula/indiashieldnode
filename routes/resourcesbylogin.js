const express = require('express');
const { getresourcesbylogin, verifyresource } = require('../controllers/controller');
const check = require('../middleware/check');


const router = express.Router();

router.get('/', check, getresourcesbylogin);
router.put('/', check, verifyresource);


module.exports = router;