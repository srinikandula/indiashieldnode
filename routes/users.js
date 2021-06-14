var express = require('express');
const { verifyOTP, sendOTP, updateuser } = require('../controllers/controller');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.route('/').put(updateuser);

module.exports = router;
