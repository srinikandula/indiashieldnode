var express = require('express');
const { verifyOTP, sendOTP } = require('../controllers/controller');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.route('/').post(verifyOTP);

module.exports = router;
