const express = require('express');
const { getresources } = require('../controllers/controller');


const router = express.Router();

router.get('/', getresources);


module.exports = router;