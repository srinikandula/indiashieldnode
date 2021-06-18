const express = require('express');
const { getresourcesbylogin, verifyresource, addresource } = require('../controllers/controller');
const check = require('../middleware/check');


const router = express.Router();

router.get('/', check, getresourcesbylogin);
router.post('/', check, addresource);
router.put('/', check, verifyresource);


module.exports = router;